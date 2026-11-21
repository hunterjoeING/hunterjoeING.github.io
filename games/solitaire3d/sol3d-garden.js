// Calming, sensory Garden Tips & Garden Moments module (68 entries, seasonal queue, 180s crossfade)

const STORAGE_KEY = 'sol3d_garden_visible';
const ROTATE_INTERVAL_MS = 180000; // 3 minutes

const SEASON_META = {
  fruehling: { icon: '🌱', label: 'Frühling im Garten' },
  sommer: { icon: '🌿', label: 'Sommer im Garten' },
  herbst: { icon: '🍂', label: 'Herbst im Garten' },
  winter: { icon: '❄️', label: 'Winter im Garten' },
  ganzjaehrig: { icon: '🍃', label: 'Gartenmoment' }
};

export const GARDEN_TIPS = [
  // FRÜHLING (12)
  {
    season: 'fruehling',
    text: 'Wenn im März die ersten Krokusse durchs feuchte Laub spitzen, lohnt sich ein Moment am Fenster: An sonnigen Vormittagen brummen dort schon die ersten dicken Hummeln.'
  },
  {
    season: 'fruehling',
    text: 'Ein flaches Brett oder ein alter Dachziegel an einem ruhigen Beetrand wird im Frühling oft schnell zum geschützten Morgenplatz für kleine Eidechsen und Laufkäfer.'
  },
  {
    season: 'fruehling',
    text: 'Schnittlauch und Minze treiben im Frühling ganz von allein wieder aus – ein paar frische Spitzen direkt beim Vorbeigehen gezupft duften nach dem ganzen Sommer, der noch kommt.'
  },
  {
    season: 'fruehling',
    text: 'Wer Löwenzahn und Gänseblümchen auf einem Stück Wiese einfach ein paar Tage länger blühen lässt, schenkt den ersten Wildbienen ein leuchtend gelbes Frühstück.'
  },
  {
    season: 'fruehling',
    text: 'Nach einem warmen Frühlingsregen riecht frisch umgegrabene Erde ein bisschen nach Neubeginn – genau dann lockern sich auch alte Unkrautwurzeln fast ohne Kraft.'
  },
  {
    season: 'fruehling',
    text: 'Ein paar Zweige Waldmeister unter einem schattigen Strauch breiten sich mit der Zeit wie ein weicher, hellgrüner Teppich aus und duften abends besonders fein.'
  },
  {
    season: 'fruehling',
    text: 'Bärlauch mag kühle, halbschattige Plätze unter alten Laubsträuchern – einmal angewachsen, kündigt sein sanfter Knoblauchduft jedes Jahr verlässlich den Frühling an.'
  },
  {
    season: 'fruehling',
    text: 'Statt jedes kleine Moospolster aus dem Rasen zu kratzen: Amseln zupfen im Frühjahr liebend gern weiches Moos heraus, um ihre Nester warm auszupolstern.'
  },
  {
    season: 'fruehling',
    text: 'Frühblüher-Zwiebeln wie Schneeglöckchen oder Traubenhyazinthen wirken am schönsten in kleinen, lockeren Gruppen, als hätte der Wind sie zufällig verstreut.'
  },
  {
    season: 'fruehling',
    text: 'Ein Bündel trockener, hohler Brombeer- oder Holunderstängel aufrecht an einen sonnigen Zaunpfahl gebunden wird schnell zu einer beliebten kleinen Wildbienen-Herberge.'
  },
  {
    season: 'fruehling',
    text: 'Wenn Apfel- und Kirschbäume im April in voller Blüte stehen, rieseln abends beim leisesten Windzug weiße Blütenblätter wie warmer Schnee über den Gartenweg.'
  },
  {
    season: 'fruehling',
    text: 'Junges Laub an Buchen und Birken hat nur für wenige Wochen dieses zarte, durchscheinende Hellgrün, durch das die Morgensonne besonders weich fällt.'
  },

  // SOMMER (12)
  {
    season: 'sommer',
    text: 'Lavendel direkt am Rand eines Gartenwegs pflanzen – jedes Mal im Vorbeigehen streift man ihn kurz und hat sofort diesen ruhigen Sommerduft in der Nase.'
  },
  {
    season: 'sommer',
    text: 'Eine flache Schale mit Wasser und zwei flachen Steinen darin wird im Sommer schnell zum beliebtesten kleinen Trinkplatz für Vögel und durstige Bienen.'
  },
  {
    season: 'sommer',
    text: 'Gegossen wird im Sommer am schönsten ganz früh am Morgen oder spät am Abend: Dann verdunstet kaum etwas, und der kühle Erdgeruch steigt leise auf.'
  },
  {
    season: 'sommer',
    text: 'Nachtkerzen und Ziertabak öffnen ihre Blüten erst gegen Abend – wer in der Dämmerung draußen sitzt, sieht plötzlich helle Blüten leuchten und hört Nachtfalter schwirren.'
  },
  {
    season: 'sommer',
    text: 'Unter einem größeren Strauch oder Baum darf der Rasen im Hochsommer gern etwas länger bleiben: Dort hält sich die Feuchtigkeit länger, und Igel finden kühlen Schatten.'
  },
  {
    season: 'sommer',
    text: 'Rosmarin und Thymian zwischen sonnigen Wegplatten speichern die Tageswärme und geben ihren würzigen Duft noch lange nach Sonnenuntergang ab.'
  },
  {
    season: 'sommer',
    text: 'Reife Johannisbeeren oder Himbeeren schmecken direkt vom Strauch am besten, wenn sie von der Nachmittagssonne noch ein bisschen warm sind.'
  },
  {
    season: 'sommer',
    text: 'Eine kleine Ecke mit wilder Möhre, Margeriten und Schafgarbe wiegt sich schon bei leichtem Sommerwind wie ein ruhiges kleines Meer.'
  },
  {
    season: 'sommer',
    text: 'Ringelblumen säen sich zwischen Gemüse- oder Staudenbeeten gern selbst wieder aus und leuchten vom Juni bis tief in den Herbst wie kleine warme Sonnen.'
  },
  {
    season: 'sommer',
    text: 'Nach einem warmen Sommergewitter hängen überall winzige Tropfen an den Grashalmen, und der ganze Garten atmet plötzlich frischer und ruhiger.'
  },
  {
    season: 'sommer',
    text: 'Eine Bank im Halbschatten unter Holunder oder Haselnuss kühlt an heißen Tagen besser als jeder Sonnenschirm und raschelt leise im Wind.'
  },
  {
    season: 'sommer',
    text: 'Kapuzinerkresse klettert mühelos über alte Zäune oder Balkonkästen, und ihre pfeffrigen Blüten bringen sofort Farbe in jeden Sommersalat.'
  },

  // HERBST (12)
  {
    season: 'herbst',
    text: 'Wenn im Spätherbst verblühte Stauden stehen bleiben, glitzern morgens Raureif und feine Spinnweben darin – und Meisen finden den ganzen Winter über kleine Samen.'
  },
  {
    season: 'herbst',
    text: 'Zusammengeharktes Laub unter Hecken und Sträuchern geschoben wird zur kostenlosen, warmen Decke für den Boden – und zum ruhigen Winterquartier für Igel.'
  },
  {
    season: 'herbst',
    text: 'Im goldenen Oktoberlicht wirken Ziergräser wie Lampenputzer- oder Chinaschilf besonders sanft, wenn ihre federigen Rispen in der tiefen Sonne aufleuchten.'
  },
  {
    season: 'herbst',
    text: 'Ein paar späte Herbstastern und Fetthenne schenken Schmetterlingen und Hummeln noch bis in den November hinein einen letzten warmen Nektarplatz.'
  },
  {
    season: 'herbst',
    text: 'Ein paar liegen gelassene Äpfel unter dem Baum freuen im Spätherbst Amseln und Wacholderdrosseln, die dort geduldig nach süßen Bissen suchen.'
  },
  {
    season: 'herbst',
    text: 'Der Herbst ist die entspannteste Pflanzzeit des Jahres: Die Erde ist noch sommerwarm, der Regen gießt fast von allein, und neue Wurzeln wachsen ganz in Ruhe.'
  },
  {
    season: 'herbst',
    text: 'Wer im Herbst eine Handvoll Tulpen- oder Narzissenzwiebeln in die Erde steckt, legt sich eigentlich nur eine stille kleine Vorfreude für das nächste Frühjahr bereit.'
  },
  {
    season: 'herbst',
    text: 'Felsenbirne, Wilde Weinrebe und Japanischer Ahorn färben sich im Herbst so tiefrot und bernsteinfarben, als hätte jemand eine warme Laterne in den Garten gestellt.'
  },
  {
    season: 'herbst',
    text: 'Dünne Zweige und abgeblühte Sonnenblumenköpfe müssen gar nicht sofort in die Tonne – Stieglitze turnen oft wochenlang kopfüber daran herum.'
  },
  {
    season: 'herbst',
    text: 'Morgendlicher Nebel über dem feuchten Rasen macht selbst einen kleinen Stadtgarten für eine halbe Stunde ganz still und weit.'
  },
  {
    season: 'herbst',
    text: 'Ein Tontopf mit Moos, Heidekraut und ein paar kleinen Zieräpfeln auf der Fensterbank holt die ruhigen Herbstfarben bis vor das Wohnzimmerfenster.'
  },
  {
    season: 'herbst',
    text: 'Wenn das raschelnde Laub unter den Schuhen knistert, fühlt sich schon ein kurzer Gang durch den Garten an wie ein kleiner Waldspaziergang.'
  },

  // WINTER (12)
  {
    season: 'winter',
    text: 'Auch im tiefen Winter lohnt ein Blick in den stillen Garten: Rotkehlchen hüpfen oft ganz nah heran, sobald man nur kurz auf der Terrasse steht.'
  },
  {
    season: 'winter',
    text: 'Christrosen und Winterjasmin blühen genau dann, wenn alles andere ruht – ein einziger heller Tupfer unter kahlen Zweigen verändert gleich die ganze Stimmung.'
  },
  {
    season: 'winter',
    text: 'Eine dünne Schneeschicht auf den Beeten schützt Stauden und Zwiebeln wie eine leichte Daunendecke vor klirrendem Kahlfrost.'
  },
  {
    season: 'winter',
    text: 'Immergrüne Gräser, Buchs oder Efeu geben dem Wintergarten ruhige Struktur, besonders wenn morgens feiner Raureif jede Kontur nachzeichnet.'
  },
  {
    season: 'winter',
    text: 'Im Winter schläft der Garten nur unter der Oberfläche: Während draußen Ruhe herrscht, darf man selbst ganz ohne schlechtes Gewissen drinnen Tee trinken.'
  },
  {
    season: 'winter',
    text: 'Ein einfacher Holzstapel an einer geschützten Hauswand sieht nicht nur gemütlich aus, sondern bietet Marienkäfern und Zaunkönigen sicheren Schutz.'
  },
  {
    season: 'winter',
    text: 'Zaubernuss und Duftschneeball öffnen mitten im Januar ihre zarten Blüten und verströmen an milden Tagen einen überraschend süßen Duft.'
  },
  {
    season: 'winter',
    text: 'Samenstände von Mohn, Karden oder Kugeldisteln wirken im Frost wie feine kleine Skulpturen, die man gar nicht abräumen möchte.'
  },
  {
    season: 'winter',
    text: 'Ein Schälchen mit lauwarmem Wasser an frostigen Vormittagen hilft den Gartenvögeln oft genauso sehr wie ein gut gefülltes Futterhäuschen.'
  },
  {
    season: 'winter',
    text: 'Die dunklen Winterabende sind perfekt, um ganz entspannt in alten Notizen oder Saatgut-Tütchen zu blättern und ohne Eile vom nächsten Sommer zu träumen.'
  },
  {
    season: 'winter',
    text: 'Wenn die tiefstehende Wintersonne durch kahle Obstbaumkronen scheint, werfen die Äste lange, ruhige Muster auf den Gartenweg.'
  },
  {
    season: 'winter',
    text: 'Ein kleiner Topf mit Thymian oder Rosmarin an einem kühlen, hellen Fenster begleitet ruhig durch die kalten Monate und duftet beim Vorbeigehen.'
  },

  // GANZJÄHRIG (20)
  {
    season: 'ganzjaehrig',
    text: 'Ein Garten muss nie perfekt sein: Genau in der kleinen wilden Ecke, in der man einfach mal nichts tut, summt und lebt es am meisten.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Manchmal ist die schönste Gartenarbeit, sich für zehn Minuten mit einer warmen Tasse einfach nur hinzusetzen und dem Licht in den Blättern zuzusehen.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Regenwasser in einer offenen Tonne riecht weich und erdig – und viele Pflanzen mögen dieses sanfte, kalkfreie Wasser sichtbar lieber als Leitungswasser.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Eine kleine Schicht Laub oder Rasenschnitt als Mulch hält den Boden unter Sträuchern locker, feucht und lebendig, ganz ohne viel Umgraben.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Kräuter wie Zitronenmelisse, Salbei oder Minze lassen sich beim Vorbeilaufen kurz zwischen den Fingern reiben – ein winziger Urlaubsmoment mitten im Alltag.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Ein paar größere Natursteine am Beetrand speichern tagsüber Wärme und bilden über Jahre sanfte, moosige Übergänge zwischen Weg und Pflanze.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Pflanzen wachsen in ihrem eigenen Tempo: Wer ihnen Raum lässt statt jeden Zentimeter zu verplanen, wird oft mit überraschenden Kombinationen belohnt.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Ein schmaler geschwungener Pfad aus Rindenmulch oder Trittsteinen lässt selbst einen kleinen Garten sofort geheimnisvoller und ruhiger wirken.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Vögel fühlen sich in Gärten besonders wohl, wenn es verschiedene Höhen gibt – niedrige Bodendecker, dichte Sträucher und einzelne ruhige Aussichtszweige.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Kompost braucht keine Wissenschaft: Laub, Küchenreste und etwas Geduld verwandeln sich ganz von selbst in dunkle, nach Waldboden duftende Erde.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Selbst ein einziger großer Kübel mit Ziergras, Kräutern und einer saisonalen Blüte auf Balkon oder Terrasse bringt ein spürbares Stück Draußen vor die Tür.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Dichte Hecken aus heimischen Sträuchern wie Weißdorn, Liguster oder Kornelkirsche rascheln im Wind und schützen das ganze Jahr über kleine Singvögel.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Wenn man abends das Gartenlicht dimmt oder ganz auslässt, finden Nachtfalter, Fledermäuse und Glühwürmchen wieder sicher ihren Weg durchs Dunkel.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Alte Tontöpfe bekommen mit den Jahren eine feine Patina aus Moos und Kalk – gerade diese Spuren von Wind und Regen machen sie so wohnlich.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Ein paar Minuten barfuß über kühles, weiches Gras zu gehen erdet den Kopf schneller als jeder lange Spaziergang.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Wer Samenkapseln von Akelei, Mohn oder Stockrosen sammelt und mit Freunden teilt, verschenkt ein Stück Garten, das noch Jahre später weiterblüht.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Schattenplätze im Garten sind kein Problem, sondern ein Geschenk: Farne, Funkien und Wald-Storchschnabel leuchten dort besonders tief und sattgrün.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Ein Garten verändert sich mit jedem Jahr leise weiter – vieles, was heute noch klein aussieht, wächst ganz ohne Eile in seine schönste Form hinein.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Der Duft nach feuchtem Holz, nassem Moos und frischen Blättern nach einem kurzen Schauer gehört zu den ruhigsten Momenten, die ein Garten schenken kann.'
  },
  {
    season: 'ganzjaehrig',
    text: 'Auch ein kleiner wilder Streifen entlang der Mauer reicht oft schon aus, damit Eidechsen, Wildbienen und Schmetterlinge ihren festen Platz finden.'
  }
];

export function detectSeason(date = new Date()) {
  const m = date.getMonth();
  if (m >= 2 && m <= 4) return 'fruehling';
  if (m >= 5 && m <= 7) return 'sommer';
  if (m >= 8 && m <= 10) return 'herbst';
  return 'winter';
}

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export class GardenTipsWidget {
  constructor({ cardEl, seasonEl, textEl, nextBtnEl, toggleBtnEl }) {
    this.cardEl = cardEl;
    this.seasonEl = seasonEl;
    this.textEl = textEl;
    this.nextBtnEl = nextBtnEl;
    this.toggleBtnEl = toggleBtnEl;

    this.visible = this._loadVisible();
    this.queue = [];
    this.currentTip = null;
    this.timerId = null;
    this.fadeTimerId = null;

    this._buildQueue();
    this._bindEvents();
    this.syncVisibility(false);
    this._showTip(this._popNext(), false);
    this._resetTimer();
  }

  _loadVisible() {
    try {
      const val = localStorage.getItem(STORAGE_KEY);
      return val === null ? true : val === '1';
    } catch (_) {
      return true;
    }
  }

  _saveVisible() {
    try {
      localStorage.setItem(STORAGE_KEY, this.visible ? '1' : '0');
    } catch (_) {}
  }

  _buildQueue() {
    const season = detectSeason();
    const preferred = GARDEN_TIPS.filter((t) => t.season === season || t.season === 'ganzjaehrig');
    const rest = GARDEN_TIPS.filter((t) => t.season !== season && t.season !== 'ganzjaehrig');
    let nextQueue = [...shuffle(preferred), ...shuffle(rest)];
    if (this.currentTip && nextQueue.length > 1 && nextQueue[0].text === this.currentTip.text) {
      const first = nextQueue.shift();
      nextQueue.push(first);
    }
    this.queue = nextQueue;
  }

  _popNext() {
    if (this.queue.length === 0) {
      this._buildQueue();
    }
    return this.queue.shift();
  }

  _showTip(tip, animate = true) {
    if (!tip) return;
    this.currentTip = tip;
    const meta = SEASON_META[tip.season] || SEASON_META.ganzjaehrig;

    if (!animate) {
      this.seasonEl.textContent = `${meta.icon} ${meta.label}`;
      this.textEl.textContent = tip.text;
      this.textEl.classList.remove('fading');
      this.seasonEl.classList.remove('fading');
      return;
    }

    clearTimeout(this.fadeTimerId);
    this.textEl.classList.add('fading');
    this.seasonEl.classList.add('fading');
    this.fadeTimerId = setTimeout(() => {
      this.seasonEl.textContent = `${meta.icon} ${meta.label}`;
      this.textEl.textContent = tip.text;
      this.textEl.classList.remove('fading');
      this.seasonEl.classList.remove('fading');
    }, 380);
  }

  _resetTimer() {
    clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      if (!this.visible) return;
      this.next(false);
    }, ROTATE_INTERVAL_MS);
  }

  next(resetTimer = true) {
    this._showTip(this._popNext(), true);
    if (resetTimer) {
      this._resetTimer();
    }
  }

  toggle() {
    this.visible = !this.visible;
    this._saveVisible();
    this.syncVisibility(true);
    if (this.visible) {
      this._resetTimer();
    }
    return this.visible;
  }

  syncVisibility(playFeedback = false) {
    if (this.cardEl) {
      this.cardEl.classList.toggle('hidden-garden', !this.visible);
      this.cardEl.setAttribute('aria-hidden', this.visible ? 'false' : 'true');
    }
    if (this.toggleBtnEl) {
      this.toggleBtnEl.classList.toggle('active', this.visible);
      this.toggleBtnEl.setAttribute('aria-pressed', this.visible ? 'true' : 'false');
      this.toggleBtnEl.title = this.visible
        ? 'Gartentipp-Kachel ausblenden'
        : 'Gartentipp-Kachel einblenden';
    }
    if (playFeedback && window.ArcadeAudio) {
      window.ArcadeAudio.click();
    }
  }

  _bindEvents() {
    if (this.nextBtnEl) {
      this.nextBtnEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next(true);
      });
    }
    if (this.toggleBtnEl) {
      this.toggleBtnEl.addEventListener('click', () => {
        this.toggle();
      });
    }
  }

  destroy() {
    clearInterval(this.timerId);
    clearTimeout(this.fadeTimerId);
  }
}
