#!/usr/bin/env node
/**
 * scripts/audit_quizzes.mjs
 * 
 * Automatisches Qualitäts- und Integritäts-Prüfskript für HunterJoe Arcade Quiz-Pools.
 * Prüft alle Quiz-Dateien im Repository auf Einhaltung der Verfassungs- und Qualitätsregeln:
 * 1. Frageanzahl (Soll: exakt 75; Foto-Quizzes 16/24) & statisches Daten-Array (keine Generatoren)
 * 2. Struktur-Integrität (4 eindeutige Optionen, gültiger Index/Antwort, kein leerer Fragetext)
 * 3. Anti-Spoiler-Check (Longest-Correct-Rate <= 40%, Längen-Ausreißer > 30% über Falschantworten-Schnitt)
 * 4. Dubletten-Check (exakt & Jaccard > 70% intern + Cross-Pool-Check für Sport-/Team-Specials)
 * 5. Fun-Fact-Check (min. 40 Zeichen, keine Duplikate, keine leeren Erklärungen)
 * 6. Sprach-Check (Regex auf Gender-Schreibweisen: *in, :in, _in, /-in)
 * 7. Runden- (12 Fragen), Bestenlisten- & Admin-Anbindungs-Check
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

// ==========================================
// 1. Hilfsfunktionen zur Textverarbeitung & Metriken
// ==========================================

function tokenize(text) {
  return new Set(
    String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9äöüß]/gi, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2)
  );
}

function jaccardSimilarity(setA, setB) {
  if (!setA.size || !setB.size) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

const GENDER_REGEX = /(\b\w+[\*:\_]\s*in(nen)?\b|\b\w+\/-(in|innen)\b|\w+\*innen|\w+:innen|\w+_innen|\w+\*in|\w+:in|\w+_in|\w+\/-in|\w+\/-innen)/i;

// ==========================================
// 2. Automatisches & rekursives Auffinden aller Quiz-Dateien
// ==========================================

function findFilesRecursive(dir, pattern) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '.git' && entry.name !== 'node_modules') {
        results = results.concat(findFilesRecursive(fullPath, pattern));
      }
    } else if (entry.isFile() && pattern.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

function loadQuizBank(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  let registeredId = null;
  let questions = null;

  // Sandbox für registerBank
  const mockEngine = {
    registerBank: (id, arr) => {
      registeredId = id;
      questions = arr;
    }
  };

  try {
    // Sichere Extraktion über Function-Wrapper
    const runner = new Function(
      'window',
      'ArcadeQuizEngine',
      `
      let questionsRef = null;
      window.ArcadeQuizEngine = ArcadeQuizEngine;
      window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
      ${code}
      `
    );
    runner({ ArcadeQuizEngine: mockEngine, ARCADE_QUIZ_BANKS: {} }, mockEngine);
  } catch (err) {
    // Fallback: reguläre Text-basierte Extraktion falls nötig
    return { error: `Eval fehlgeschlagen: ${err.message}`, filePath, code };
  }

  return {
    filePath,
    code,
    bankId: registeredId || path.basename(filePath, '.js').replace(/^bank-/, ''),
    questions: Array.isArray(questions) ? questions : []
  };
}

// ==========================================
// 3. Vollständigkeits-Prüfung bekannter Quizzes
// ==========================================

const REQUIRED_NEW_QUIZZES = [
  { label: 'Nageldesign', bankFile: 'bank-naildesign.js', gameFolder: 'quiz-naildesign' },
  { label: 'Torten & Patisserie', bankFile: 'bank-torten.js', gameFolder: 'quiz-torten' },
  { label: 'Formel 1', bankFile: 'bank-f1.js', gameFolder: 'quiz-f1' },
  { label: 'Fußball: Bundesliga', bankFile: 'bank-fussball-bundesliga.js', gameFolder: 'quiz-fussball' },
  { label: 'Fußball: WM & EM', bankFile: 'bank-fussball-wm-em.js', gameFolder: 'quiz-fussball' },
  { label: 'Fußball: International', bankFile: 'bank-fussball-international.js', gameFolder: 'quiz-fussball' },
  { label: 'Fußball: Regeln & Kurioses', bankFile: 'bank-fussball-regeln.js', gameFolder: 'quiz-fussball' },
  { label: 'Fußball: SV Werder Bremen Special', bankFile: 'bank-fussball-werder.js', gameFolder: 'quiz-fussball' },
  { label: 'American Football: Regeln & Taktik', bankFile: 'bank-american-football-regeln.js', gameFolder: 'quiz-american-football' },
  { label: 'American Football: Super Bowl & Historie', bankFile: 'bank-american-football-superbowl.js', gameFolder: 'quiz-american-football' },
  { label: 'American Football: Teams & Stadien', bankFile: 'bank-american-football-teams.js', gameFolder: 'quiz-american-football' },
  { label: 'American Football: Legenden & Rekorde', bankFile: 'bank-american-football-legenden.js', gameFolder: 'quiz-american-football' },
  { label: 'American Football: Green Bay Packers Special', bankFile: 'bank-american-football-packers.js', gameFolder: 'quiz-american-football' }
];

const PHOTO_QUIZZES = new Set(['cpus', 'gpus', 'phones', 'pilze-aachen', 'swiss-trains']);

// ==========================================
// 4. Haupt-Prüflogik pro Pool
// ==========================================

function auditPool(poolObj) {
  const { bankId, filePath, code, questions } = poolObj;
  const isPhoto = PHOTO_QUIZZES.has(bankId);
  const expectedCount = isPhoto ? (['pilze-aachen', 'swiss-trains'].includes(bankId) ? 24 : 16) : 75;

  const findings = {
    bankId,
    filePath: path.relative(REPO_ROOT, filePath),
    totalQuestions: questions.length,
    expectedCount,
    isPhoto,
    countValid: questions.length === expectedCount,
    isStatic: true,
    structureErrors: [],
    longestCorrectCount: 0,
    longestCorrectRate: 0,
    outliersCount: 0,
    outliersList: [], // Top-Ausreißer
    exactDuplicates: [],
    highSimilarity: [],
    shortFacts: [],
    missingFacts: [],
    duplicateFacts: [],
    genderIssues: [],
    status: 'OK',
    reasons: []
  };

  // 1. Prüfen auf prozedurale Generatoren / Schleifen im Code
  const loopOrGeneratorPattern = /\b(for\s*\(|while\s*\(|Math\.random\s*\(|function\s+generate|function\s+createQuestion|eval\s*\()/;
  if (loopOrGeneratorPattern.test(code)) {
    findings.isStatic = false;
    findings.reasons.push('Nicht statisch (Schleife oder Generator-Code gefunden)');
  }

  // 2. Frageanzahl
  if (!findings.countValid) {
    findings.reasons.push(`Unerwartete Fragenanzahl: ${questions.length} (Soll: ${expectedCount})`);
  }

  const seenExactQuestions = new Map();
  const seenFacts = new Map();

  questions.forEach((q, idx) => {
    // Struktur-Integrität
    const qText = String(q.q || '').trim();
    if (!qText) {
      findings.structureErrors.push(`Frage #${idx}: Leerer Fragetext.`);
    }

    if (!Array.isArray(q.a) || q.a.length !== 4) {
      findings.structureErrors.push(`Frage #${idx}: Hat ${q.a?.length ?? 0} statt genau 4 Optionen.`);
    } else {
      const trimmedOptions = q.a.map(opt => String(opt || '').trim());
      if (trimmedOptions.some(opt => !opt)) {
        findings.structureErrors.push(`Frage #${idx}: Mindestens eine leere Antwortoption.`);
      }
      const uniqueOpts = new Set(trimmedOptions);
      if (uniqueOpts.size !== 4) {
        findings.structureErrors.push(`Frage #${idx}: Enthält doppelte Antwortoptionen.`);
      }

      // Korrekte Antwort (Standard: Index 0 oder q.correct)
      const correctIdx = (typeof q.correct === 'number' && q.correct >= 0 && q.correct <= 3) ? q.correct : 0;
      const correctText = trimmedOptions[correctIdx] || '';
      const wrongTexts = trimmedOptions.filter((_, i) => i !== correctIdx);

      const correctLen = correctText.length;
      const wrongLens = wrongTexts.map(w => w.length);
      const maxWrongLen = Math.max(...wrongLens);
      const avgWrongLen = wrongLens.reduce((a, b) => a + b, 0) / (wrongLens.length || 1);

      // Longest-Rate (richtige Antwort absolut am längsten)
      if (correctLen > maxWrongLen) {
        findings.longestCorrectCount++;
      }

      // Längen-Ausreißer (> 30 % länger als Durchschnitt der 3 falschen Optionen)
      if (avgWrongLen > 0 && correctLen > 1.30 * avgWrongLen) {
        findings.outliersCount++;
        const ratio = (correctLen / avgWrongLen).toFixed(2);
        findings.outliersList.push({
          idx,
          q: qText.length > 60 ? qText.slice(0, 57) + '...' : qText,
          correctLen,
          avgWrongLen: avgWrongLen.toFixed(1),
          ratio: `${ratio}x`,
          correctText: correctText.length > 50 ? correctText.slice(0, 47) + '...' : correctText
        });
      }
    }

    // Exakte Duplikate Fragetext
    const lowerQ = qText.toLowerCase();
    if (seenExactQuestions.has(lowerQ)) {
      findings.exactDuplicates.push({
        idx,
        prevIdx: seenExactQuestions.get(lowerQ),
        text: qText
      });
    } else {
      seenExactQuestions.set(lowerQ, idx);
    }

    // Fun-Fact-Check
    const fact = String(q.explanation || q.exp || '').trim();
    if (!fact) {
      findings.missingFacts.push(idx);
    } else if (fact.length < 40) {
      findings.shortFacts.push({ idx, len: fact.length, fact });
    } else {
      const lowerFact = fact.toLowerCase();
      if (seenFacts.has(lowerFact)) {
        findings.duplicateFacts.push({
          idx,
          prevIdx: seenFacts.get(lowerFact),
          fact: fact.slice(0, 40) + '...'
        });
      } else {
        seenFacts.set(lowerFact, idx);
      }
    }

    // Sprach-Check (Gender-Schreibweisen)
    const allTexts = [qText, ...(Array.isArray(q.a) ? q.a : []), q.explanation || '', q.exp || ''];
    allTexts.forEach(t => {
      const m = String(t).match(GENDER_REGEX);
      if (m) {
        findings.genderIssues.push({ idx, match: m[0], snippet: t.slice(0, 70) });
      }
    });
  });

  // Jaccard-Ähnlichkeit (> 70 %) innerhalb des Pools
  for (let i = 0; i < questions.length; i++) {
    const tokI = tokenize(questions[i].q);
    for (let j = i + 1; j < questions.length; j++) {
      const tokJ = tokenize(questions[j].q);
      const sim = jaccardSimilarity(tokI, tokJ);
      if (sim > 0.70) {
        findings.highSimilarity.push({
          idxA: i,
          idxB: j,
          sim: `${(sim * 100).toFixed(0)}%`,
          textA: questions[i].q,
          textB: questions[j].q
        });
      }
    }
  }

  // Metriken berechnen
  findings.longestCorrectRate = questions.length > 0
    ? ((findings.longestCorrectCount / questions.length) * 100)
    : 0;

  // Status-Ermittlung
  if (findings.structureErrors.length > 0) {
    findings.reasons.push(`${findings.structureErrors.length} Struktur-Fehler`);
  }
  if (!findings.isStatic) {
    findings.reasons.push('Nicht statisch');
  }
  if (findings.longestCorrectRate > 40.0) {
    findings.reasons.push(`Longest-Rate zu hoch (${findings.longestCorrectRate.toFixed(1)}% > 40%)`);
  }
  if (findings.exactDuplicates.length > 0) {
    findings.reasons.push(`${findings.exactDuplicates.length} exakte Dublette(n)`);
  }
  if (findings.highSimilarity.length > 0) {
    findings.reasons.push(`${findings.highSimilarity.length} auffällig ähnliche Frage(n)`);
  }
  if (findings.missingFacts.length > 0 || findings.shortFacts.length > 0 || findings.duplicateFacts.length > 0) {
    findings.reasons.push(`Fun-Fact-Mängel (fehlend: ${findings.missingFacts.length}, kurz: ${findings.shortFacts.length}, doppelt: ${findings.duplicateFacts.length})`);
  }
  if (findings.genderIssues.length > 0) {
    findings.reasons.push(`${findings.genderIssues.length} Gender-Schreibweise(n)`);
  }

  // Sortiere Ausreißer nach Ratio absteigend (für die Top 3-5)
  findings.outliersList.sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));

  if (findings.reasons.length > 0) {
    findings.status = 'Prüfen';
  }

  return findings;
}

// ==========================================
// 5. Cross-Pool Dubletten-Prüfung
// ==========================================

function auditCrossPools(poolsMap, groups) {
  const crossIssues = [];

  for (const group of groups) {
    const { name, poolKeys } = group;
    for (let i = 0; i < poolKeys.length; i++) {
      for (let j = i + 1; j < poolKeys.length; j++) {
        const keyA = poolKeys[i];
        const keyB = poolKeys[j];
        const pA = poolsMap[keyA];
        const pB = poolsMap[keyB];
        if (!pA || !pB) continue;

        pA.questions.forEach((qA, idxA) => {
          const rawA = String(qA.q || '').trim().toLowerCase();
          const tokA = tokenize(qA.q);

          pB.questions.forEach((qB, idxB) => {
            const rawB = String(qB.q || '').trim().toLowerCase();
            if (rawA === rawB) {
              crossIssues.push({
                group: name,
                type: 'EXAKT',
                poolA: keyA,
                idxA,
                poolB: keyB,
                idxB,
                text: qA.q
              });
            } else {
              const sim = jaccardSimilarity(tokA, tokenize(qB.q));
              if (sim > 0.70) {
                crossIssues.push({
                  group: name,
                  type: `Ähnlich (${(sim * 100).toFixed(0)}%)`,
                  poolA: keyA,
                  idxA,
                  poolB: keyB,
                  idxB,
                  textA: qA.q,
                  textB: qB.q
                });
              }
            }
          });
        });
      }
    }
  }

  return crossIssues;
}

// ==========================================
// 6. Runden-, Bestenlisten- & Admin-Check
// ==========================================

function auditEngineAndIntegration(allPoolKeys) {
  const issues = [];
  const enginePath = path.join(REPO_ROOT, 'shared', 'quiz-engine.js');
  const arcadePath = path.join(REPO_ROOT, 'shared', 'arcade.js');
  const workerPath = path.join(REPO_ROOT, 'cloudflare-worker', 'worker.js');
  const hubPath = path.join(REPO_ROOT, 'index.html');
  const hiddenAdminPath = path.join(REPO_ROOT, 'shared', 'hidden-admin.js');

  // 1. quiz-engine.js: ROUND_SIZE Check
  if (fs.existsSync(enginePath)) {
    const engineCode = fs.readFileSync(enginePath, 'utf8');
    const mRound = engineCode.match(/const\s+ROUND_SIZE\s*=\s*(\d+)/);
    if (!mRound) {
      issues.push('shared/quiz-engine.js: Konstante ROUND_SIZE nicht gefunden.');
    } else if (parseInt(mRound[1], 10) !== 12) {
      issues.push(`shared/quiz-engine.js: ROUND_SIZE ist ${mRound[1]} statt 12.`);
    }
  } else {
    issues.push('shared/quiz-engine.js existiert nicht!');
  }

  // 2. arcade.js GAME_CATALOG Check
  let arcadeCode = '';
  if (fs.existsSync(arcadePath)) {
    arcadeCode = fs.readFileSync(arcadePath, 'utf8');
  } else {
    issues.push('shared/arcade.js existiert nicht!');
  }

  // 3. cloudflare-worker/worker.js GAMES_META Check
  let workerCode = '';
  if (fs.existsSync(workerPath)) {
    workerCode = fs.readFileSync(workerPath, 'utf8');
  } else {
    issues.push('cloudflare-worker/worker.js existiert nicht!');
  }

  // 4. index.html Check
  let hubCode = '';
  if (fs.existsSync(hubPath)) {
    hubCode = fs.readFileSync(hubPath, 'utf8');
  }

  // 5. Check jedes Quiz-Verzeichnisses in games/
  const gamesQuizDirs = fs.readdirSync(path.join(REPO_ROOT, 'games'), { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.startsWith('quiz'))
    .map(d => d.name);

  const gameReports = [];

  for (const gDir of gamesQuizDirs) {
    const indexPath = path.join(REPO_ROOT, 'games', gDir, 'index.html');
    if (!fs.existsSync(indexPath)) continue;
    const html = fs.readFileSync(indexPath, 'utf8');

    const loadsBoard = html.includes('quiz-board.js');
    const loadsEngine = html.includes('quiz-engine.js');
    const hasDrawDeck = html.includes('ArcadeQuizEngine.drawDeck');
    const hasAdmin = html.includes('openAdminModal') || html.includes('hidden-admin') || html.includes('admin');

    gameReports.push({
      dir: gDir,
      loadsBoard,
      loadsEngine,
      hasDrawDeck,
      hasAdmin
    });
  }

  return { issues, gameReports };
}

// ==========================================
// 7. Ausführung & Berichterstellung
// ==========================================

export async function runAudit() {
  console.log('\n========================================================================================');
  console.log('               HUNTERJOE ARCADE – AUTOMATISCHER QUIZ-POOL AUDIT');
  console.log('========================================================================================\n');

  // Alle bank-*.js Dateien finden
  const bankFiles = findFilesRecursive(path.join(REPO_ROOT, 'shared', 'quiz-data'), /^bank-.*\.js$/).sort();

  if (bankFiles.length === 0) {
    console.error('❌ Keine Quiz-Banken unter shared/quiz-data/ gefunden!');
    process.exit(1);
  }

  // Vollständigkeits-Check bekannter neuer Quizzes
  console.log('🔍 1. VOLLSTÄNDIGKEITS-CHECK DER NEUEN & MEHRTEILIGEN QUIZZES');
  console.log('----------------------------------------------------------------------------------------');
  let missingRequired = 0;
  for (const req of REQUIRED_NEW_QUIZZES) {
    const bankFound = bankFiles.some(f => path.basename(f) === req.bankFile);
    const gameFound = fs.existsSync(path.join(REPO_ROOT, 'games', req.gameFolder, 'index.html'));
    if (!bankFound || !gameFound) {
      console.log(`❌ FEHLT: ${req.label} (Bank: ${bankFound ? 'OK' : 'FEHLT'}, Spiel: ${gameFound ? 'OK' : 'FEHLT'})`);
      missingRequired++;
    } else {
      console.log(`✅ Gefunden: ${req.label.padEnd(46)} (shared/quiz-data/${req.bankFile})`);
    }
  }

  if (missingRequired > 0) {
    console.log(`\n⚠️ WARNUNG: ${missingRequired} erwartete Quiz-Komponenten wurden nicht erfasst!\n`);
  } else {
    console.log('\n✨ Alle geforderten neuen Quizzes und Unterkategorien sind lückenlos im Repo vorhanden.\n');
  }

  // Alle Pools laden und prüfen
  const poolsMap = {};
  const auditResults = [];

  for (const f of bankFiles) {
    const loaded = loadQuizBank(f);
    if (loaded.error) {
      console.error(`❌ Fehler beim Laden von ${f}: ${loaded.error}`);
      continue;
    }
    poolsMap[loaded.bankId] = loaded;
    const res = auditPool(loaded);
    auditResults.push(res);
  }

  // Cross-Pool-Check (Fußball & American Football)
  const crossGroupFootball = {
    name: 'Fußball (5 Pools)',
    poolKeys: [
      'fussball_bundesliga',
      'fussball_wm_em',
      'fussball_international',
      'fussball_regeln',
      'fussball_werder'
    ]
  };

  const crossGroupAf = {
    name: 'American Football (5 Pools)',
    poolKeys: [
      'american_football_regeln',
      'american_football_superbowl',
      'american_football_teams',
      'american_football_legenden',
      'american_football_packers'
    ]
  };

  const crossIssues = auditCrossPools(poolsMap, [crossGroupFootball, crossGroupAf]);

  // Runden- und Integrations-Check
  const integrationRes = auditEngineAndIntegration(Object.keys(poolsMap));

  // ==========================================
  // TABELLE DER QUIZ-POOLS
  // ==========================================
  console.log('📊 2. ÜBERSICHTSTABELLE ALLER GEPRÜFTEN QUIZ-POOLS');
  console.log('-----------------------------------------------------------------------------------------------------------------------------');
  console.log(
    'Quiz / Pool'.padEnd(30) + ' | ' +
    'Fragen'.padStart(6) + ' | ' +
    'Statisch?'.padEnd(9) + ' | ' +
    'Longest-%'.padStart(9) + ' | ' +
    'Ausreißer'.padStart(9) + ' | ' +
    'Dubletten'.padStart(9) + ' | ' +
    'Kurze Facts'.padStart(11) + ' | ' +
    'Status'
  );
  console.log('-----------------------------------------------------------------------------------------------------------------------------');

  let totalQuestionsCount = 0;
  let okCount = 0;
  let checkCount = 0;

  for (const r of auditResults) {
    totalQuestionsCount += r.totalQuestions;
    if (r.status === 'OK') okCount++; else checkCount++;

    const longestStr = `${r.longestCorrectRate.toFixed(1)}%`;
    const dupsTotal = r.exactDuplicates.length + r.highSimilarity.length;
    const shortFactsTotal = r.shortFacts.length + r.missingFacts.length;

    console.log(
      r.bankId.padEnd(30) + ' | ' +
      String(r.totalQuestions).padStart(6) + ' | ' +
      (r.isStatic ? 'Ja' : 'NEIN').padEnd(9) + ' | ' +
      longestStr.padStart(9) + ' | ' +
      String(r.outliersCount).padStart(9) + ' | ' +
      String(dupsTotal).padStart(9) + ' | ' +
      String(shortFactsTotal).padStart(11) + ' | ' +
      (r.status === 'OK' ? '✅ OK' : '⚠️ Prüfen')
    );
  }

  console.log('-----------------------------------------------------------------------------------------------------------------------------');
  console.log(`GESAMT: ${auditResults.length} Pools geprüft | ${totalQuestionsCount} Fragen insgesamt | ${okCount} OK | ${checkCount} mit Prüf-Befund\n`);

  // ==========================================
  // DETAIL-LISTE FÜR PROBLEM- / PRÜFFÄLLE
  // ==========================================
  console.log('🔍 3. DETAIL-LISTE DER PRÜF-BEFUNDE (NUR BEI STATUS "PRÜFEN")');
  console.log('----------------------------------------------------------------------------------------');

  const problemPools = auditResults.filter(r => r.status === 'Prüfen');

  if (problemPools.length === 0) {
    console.log('✨ Keine Beanstandungen – alle Pools erfüllen alle Kriterien mit Bravour!');
  } else {
    for (const p of problemPools) {
      console.log(`\n📌 Pool: [${p.bankId}] (${p.filePath}) – Status: ⚠️ Prüfen`);
      console.log(`   Gründe: ${p.reasons.join(' · ')}`);

      if (p.structureErrors.length > 0) {
        console.log(`   🔴 Struktur-Fehler:`);
        p.structureErrors.forEach(err => console.log(`      - ${err}`));
      }

      if (p.exactDuplicates.length > 0) {
        console.log(`   🔴 Exakte Duplikate:`);
        p.exactDuplicates.forEach(d => console.log(`      - #${d.idx} identisch mit #${d.prevIdx}: "${d.text}"`));
      }

      if (p.highSimilarity.length > 0) {
        console.log(`   🟠 Ähnliche Fragen (Jaccard > 70%):`);
        p.highSimilarity.forEach(s => {
          console.log(`      - #${s.idxA} & #${s.idxB} (${s.sim}):\n        A: "${s.textA}"\n        B: "${s.textB}"`);
        });
      }

      if (p.shortFacts.length > 0) {
        console.log(`   🟠 Kurze Fun-Facts (< 40 Zeichen):`);
        p.shortFacts.slice(0, 5).forEach(f => console.log(`      - #${f.idx} (${f.len} Zeichen): "${f.fact}"`));
        if (p.shortFacts.length > 5) console.log(`      ... (+ ${p.shortFacts.length - 5} weitere)`);
      }

      if (p.missingFacts.length > 0) {
        console.log(`   🔴 Fehlende Fun-Facts bei Fragen-Indizes: ${p.missingFacts.join(', ')}`);
      }

      if (p.duplicateFacts.length > 0) {
        console.log(`   🟠 Doppelte Fun-Facts:`);
        p.duplicateFacts.forEach(d => console.log(`      - #${d.idx} doppelt mit #${d.prevIdx}: "${d.fact}"`));
      }

      if (p.genderIssues.length > 0) {
        console.log(`   🟠 Gender-Schreibweisen:`);
        p.genderIssues.forEach(g => console.log(`      - #${g.idx} Match: "${g.match}" in "${g.snippet}"`));
      }

      // 3-5 extremste Längen-Ausreißer anzeigen
      if (p.outliersList.length > 0) {
        const topOutliers = p.outliersList.slice(0, 5);
        console.log(`   📏 Top ${topOutliers.length} Längen-Ausreißer (Richtige Antwort vs. Falschantworten-Schnitt):`);
        topOutliers.forEach(o => {
          console.log(`      - #${o.idx} (${o.ratio} länger | ${o.correctLen} Z. vs. ${o.avgWrongLen} Z.): "${o.q}"`);
          console.log(`        Antwort: "${o.correctText}"`);
        });
        if (p.outliersList.length > 5) {
          console.log(`      ... und ${p.outliersList.length - 5} weitere Ausreißer im Pool.`);
        }
      }
    }
  }

  // Cross-Pool-Ergebnisse
  console.log('\n\n🏟️ 4. CROSS-POOL DUBLETTEN-CHECK (FUSSBALL & AMERICAN FOOTBALL)');
  console.log('----------------------------------------------------------------------------------------');
  if (crossIssues.length === 0) {
    console.log('✅ Keine Überschneidungen oder Cross-Dubletten zwischen allgemeinen Kategorien und Specials gefunden!');
  } else {
    console.log(`⚠️ ${crossIssues.length} Überschneidung(en) gefunden:`);
    crossIssues.forEach(c => {
      console.log(`   - [${c.group}] ${c.type}: [${c.poolA} #${c.idxA}] vs [${c.poolB} #${c.idxB}]`);
      if (c.text) console.log(`     Text: "${c.text}"`);
      if (c.textA) {
        console.log(`     Text A: "${c.textA}"`);
        console.log(`     Text B: "${c.textB}"`);
      }
    });
  }

  // Runden- & System-Integrität
  console.log('\n\n⚙️ 5. RUNDEN- (12 FRAGEN), BESTENLISTEN- & ADMIN-CHECK');
  console.log('----------------------------------------------------------------------------------------');
  if (integrationRes.issues.length === 0) {
    console.log('✅ Engine ROUND_SIZE = 12 Fragen pro Runde ist zentral konfiguriert.');
  } else {
    integrationRes.issues.forEach(iss => console.log(`❌ ${iss}`));
  }

  const subcatGames = ['quiz-fussball', 'quiz-american-football', 'quiz-f1', 'quiz-apple'];
  console.log('\nSubkategorie-Quizzes mit Admin-Modal & Bestenlisten-Anbindung:');
  for (const rep of integrationRes.gameReports.filter(g => subcatGames.includes(g.dir))) {
    console.log(`   - ${rep.dir.padEnd(25)}: Bestenliste: ${rep.loadsBoard ? '✅ Direkt geladen' : 'ℹ️ Via Engine'} | Admin: ${rep.hasAdmin ? '✅ Vorhanden' : '❌ Fehlt'}`);
  }

  console.log('\n========================================================================================');
  console.log('                                AUDIT ABGESCHLOSSEN');
  console.log('========================================================================================\n');
}

// Direkte Ausführung wenn CLI-Aufruf
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  runAudit().catch(err => {
    console.error('Unerwarteter Fehler im Audit-Skript:', err);
    process.exit(1);
  });
}
