// Auto-generated unified quiz bank for "bitcoin" (75 questions)
(function () {
  const DATA = [
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Was bedeutet das UTXO-Modell (Unspent Transaction Output) in Bitcoin anschaulich im Alltag?",
    "a": [
      "Guthaben besteht aus unteilbaren Münzen mit Wechselgeld-Outputs",
      "Guthaben wird wie eine Excel-Tabelle mit Kontoständen verbucht",
      "Jeder Nutzer besitzt ein festes Bankkonto mit täglichem Limit",
      "Bitcoins existieren als fortlaufende Seriennummern auf Disketten"
    ],
    "explanation": "Wer 1 BTC besitzt, hat in Wahrheit einen UTXO im Wert von 1 BTC. Zahlt man 0,2 BTC, wird der ganze 1-BTC-Output zerstört und man erhält 0,8 BTC Wechselgeld-UTXO.",
    "exp": "Wer 1 BTC besitzt, hat in Wahrheit einen UTXO im Wert von 1 BTC. Zahlt man 0,2 BTC, wird der ganze 1-BTC-Output zerstört und man erhält 0,8 BTC Wechselgeld-UTXO."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Welche kryptografische Hashfunktion bildet das Herzstück des Bitcoin-Proof-of-Work und der Block-Verkettung?",
    "a": [
      "Doppeltes SHA-256",
      "MD5 mit 128-Bit-Hash",
      "RSA-4096 mit Primzahlen",
      "Scrypt mit Speichertiefe"
    ],
    "explanation": "Bitcoin wendet SHA-256 gleich zweimal hintereinander an (SHA-256(SHA-256(Daten))), um gegen Längen-Erweiterungs-Angriffe immun zu sein.",
    "exp": "Bitcoin wendet SHA-256 gleich zweimal hintereinander an (SHA-256(SHA-256(Daten))), um gegen Längen-Erweiterungs-Angriffe immun zu sein."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Wie viele Satoshis stecken rechnerisch in einem einzigen ganzen Bitcoin?",
    "a": [
      "100.000.000 Satoshis",
      "1.000.000 Satoshis",
      "1.000.000.000 Satoshis",
      "10.000 Satoshis"
    ],
    "explanation": "Jeder Bitcoin ist auf 8 Nachkommastellen teilbar – die kleinste Basiseinheit auf der Blockchain ist ein Satoshi (0,00000001 BTC).",
    "exp": "Jeder Bitcoin ist auf 8 Nachkommastellen teilbar – die kleinste Basiseinheit auf der Blockchain ist ein Satoshi (0,00000001 BTC)."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "Was ist der sogenannte „Mempool“ bei einem Bitcoin-Knotenpunkt (Full Node)?",
    "a": [
      "Der Warteraum im Speicher für unbestätigte Transaktionen",
      "Ein gesicherter Speicherbereich für gelöschte Wallet-Passwörter",
      "Die Liste aller Miner, die in den letzten 24 Stunden aktiv waren",
      "Ein permanentes Archiv aller jemals abgelehnten Spam-Zahlungen"
    ],
    "explanation": "Miner wählen aus dem Mempool bevorzugt Transaktionen mit den höchsten Gebühren pro vByte aus, um sie in den nächsten Block aufzunehmen.",
    "exp": "Miner wählen aus dem Mempool bevorzugt Transaktionen mit den höchsten Gebühren pro vByte aus, um sie in den nächsten Block aufzunehmen."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "Was löste das Segregated Witness (SegWit)-Upgrade im Jahr 2017 technisch im Bitcoin-Block aus?",
    "a": [
      "Signaturdaten wurden abgetrennt und Blockkapazität stieg",
      "Die maximale Blockgröße wurde fest auf 32 Megabyte angehoben",
      "Transaktionen ohne Angabe einer Ausweisnummer wurden verboten",
      "Das Proof-of-Work-Verfahren wurde durch Proof-of-Stake ersetzt"
    ],
    "explanation": "SegWit trennte Signaturen ab, führte das Konzept von Block-Weight (4 Millionen Weight Units) ein und schuf das Fundament für das Lightning Network.",
    "exp": "SegWit trennte Signaturen ab, führte das Konzept von Block-Weight (4 Millionen Weight Units) ein und schuf das Fundament für das Lightning Network."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "pro",
    "q": "Welche Signaturmethode führte das Taproot-Upgrade 2021 ein, die komplexe Multisig-Transaktionen wie einfache Zahlungen aussehen lässt?",
    "a": [
      "Schnorr-Signaturen und MAST für mehr Privatsphäre",
      "Eine Erhöhung der maximalen Bitcoin-Geldmenge auf 42 Millionen",
      "Die verpflichtende Verknüpfung jeder Adresse mit einer E-Mail",
      "Ein Verbot von dezentralem Mining auf heimischen Computern"
    ],
    "explanation": "Schnorr-Signaturen ermöglichen MuSig2: Mehrere Parteien erzeugen gemeinsam eine einzige, ununterscheidbare Standardsignatur – das spart Platz und stärkt Privatsphäre.",
    "exp": "Schnorr-Signaturen ermöglichen MuSig2: Mehrere Parteien erzeugen gemeinsam eine einzige, ununterscheidbare Standardsignatur – das spart Platz und stärkt Privatsphäre."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "Was bedeutet das Feature „RBF“ (Replace-by-Fee) bei einer im Mempool hängenden Bitcoin-Transaktion?",
    "a": [
      "Man kann eine unbestätigte Transaktion mit höherer Gebühr ersetzen, um sie zu beschleunigen",
      "Der Absender kann eine versehentlich gesendete Zahlung innerhalb von 24 Stunden stornieren",
      "Miner können fehlerhafte Transaktionen automatisch löschen und die Gebühr einbehalten",
      "Die Transaktionsgebühr wird bei steigenden Kursen automatisch verdoppelt und gutgeschrieben"
    ],
    "explanation": "Bietet man mehr Gebühr für dieselben Inputs, ersetzen Full Nodes die alte Transaktion im Mempool und Miner bestätigen sie schnell.",
    "exp": "Bietet man mehr Gebühr für dieselben Inputs, ersetzen Full Nodes die alte Transaktion im Mempool und Miner bestätigen sie schnell."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "pro",
    "q": "Warum ist die Skriptsprache „Bitcoin Script“ absichtlich nicht Turing-vollständig (keine freien Schleifen)?",
    "a": [
      "Um Endlosschleifen und Denial-of-Service-Angriffe auf validierende Nodes auszuschließen",
      "Weil Satoshi Nakamoto keine Zeit mehr hatte, Schleifen in C++ zu implementieren",
      "Weil Quantencomputer Turing-vollständige Skripte in Sekundenschnelle knacken könnten",
      "Um das Ausführen von mathematischen Divisionen auf der Blockchain gesetzlich zu verbieten"
    ],
    "explanation": "Hätte Bitcoin freie Schleifen (wie Solidity in Ethereum), könnte ein Angreifer eine Endlosschleife senden, die alle weltweiten Nodes einfrieren lässt.",
    "exp": "Hätte Bitcoin freie Schleifen (wie Solidity in Ethereum), könnte ein Angreifer eine Endlosschleife senden, die alle weltweiten Nodes einfrieren lässt."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Wozu dient der „Merkle Tree“ (Hash-Baum) in einem Bitcoin-Block-Header?",
    "a": [
      "Er fasst tausende Transaktionen in einem einzigen kompakten 32-Byte-Root-Hash zusammen",
      "Er speichert die IP-Adressen aller weltweiten Mining-Pools in einer verschlüsselten Liste",
      "Er berechnet die voraussichtlichen Stromkosten der Miner für die nächste Difficulty-Periode",
      "Er verteilt die Block-Belohnung automatisch auf alle angeschlossenen Lightning-Nodes"
    ],
    "explanation": "Dank der Merkle-Root kann ein Smartphone (SPV-Client) mit wenigen Hashes mathematisch beweisen, dass eine Transaktion im Block enthalten ist.",
    "exp": "Dank der Merkle-Root kann ein Smartphone (SPV-Client) mit wenigen Hashes mathematisch beweisen, dass eine Transaktion im Block enthalten ist."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "An welchem Präfix erkennt man eine moderne native SegWit-Adresse (Bech32)?",
    "a": [
      "bc1q...",
      "1BvBM...",
      "3J98t...",
      "bc1p..."
    ],
    "explanation": "bc1q-Adressen sind komplett kleingeschrieben, haben integrierte Fehlerkorrektur (BCH-Code) und sparen gegenüber Legacy-Adressen (Präfix 1) massiv Transaktionsgebühren.",
    "exp": "bc1q-Adressen sind komplett kleingeschrieben, haben integrierte Fehlerkorrektur (BCH-Code) und sparen gegenüber Legacy-Adressen (Präfix 1) massiv Transaktionsgebühren."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "pro",
    "q": "Was ist das Verfahren „CPFP“ (Child Pays for Parent) bei unbestätigten Transaktionen?",
    "a": [
      "Eine 32-Bit-Zahl, die Miner zur Erfüllung des Hash-Ziels variieren",
      "Die geheime PIN zur Entsperrung einer Hardware-Wallet",
      "Ein spezielles Verschlüsselungsverfahren für Passphrasen",
      "Die IP-Adresse des ersten Mining-Pools im Netzwerk"
    ],
    "explanation": "Miner wollen die lukrative Folge-Transaktion (Child) kassieren – das geht aber nur, wenn sie zuvor die feststeckende Eltern-Transaktion (Parent) minen.",
    "exp": "Miner wollen die lukrative Folge-Transaktion (Child) kassieren – das geht aber nur, wenn sie zuvor die feststeckende Eltern-Transaktion (Parent) minen."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Welche elliptische Kurve verwendet Bitcoin zur Generierung öffentlicher Schlüssel aus privaten Schlüsseln?",
    "a": [
      "secp256k1 (Koblitz-Kurve)",
      "ed25519 (Edwards-Kurve)",
      "RSA-4096 (Primzahl-Faktorisierung)",
      "NIST P-256 (NSA-Standardkurve)"
    ],
    "explanation": "Satoshi wählte die Koblitz-Kurve secp256k1 – viele Kryptografen vermuten, weil sie im Gegensatz zu NIST-Kurven keine verdächtigen, von der NSA gewählten Konstanten enthält.",
    "exp": "Satoshi wählte die Koblitz-Kurve secp256k1 – viele Kryptografen vermuten, weil sie im Gegensatz zu NIST-Kurven keine verdächtigen, von der NSA gewählten Konstanten enthält."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "Was bedeutet „Transaction Malleability“ (Transaktions-Verformbarkeit), die durch SegWit behoben wurde?",
    "a": [
      "Signaturen konnten leicht modifiziert werden, wodurch sich die TXID änderte",
      "Hacker konnten den Betrag einer unbestätigten Transaktion nachträglich verdoppeln",
      "Die Blockchain konnte durch zu große Blöcke in zwei getrennte Stränge zerfallen",
      "Miner konnten Transaktionen ohne Wissen des Absenders an neue Adressen umleiten"
    ],
    "explanation": "Malleability verhinderte verlässliche Ketten unbestätigter Transaktionen – erst durch die Behebung konnte das Lightning Network sicher realisiert werden.",
    "exp": "Malleability verhinderte verlässliche Ketten unbestätigter Transaktionen – erst durch die Behebung konnte das Lightning Network sicher realisiert werden."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "pro",
    "q": "Wie viele Byte umfasst der reine Block-Header eines Bitcoin-Blocks exakt?",
    "a": [
      "Exakt 80 Bytes (Versionsnummer, Hashes, Zeitstempel, Target, Nonce)",
      "Genau 1 Megabyte wie das ursprüngliche Blockgrößen-Limit",
      "Rund 4 Kilobyte wie der RAM-Speicher der Apollo-11-Mondlandefähre",
      "Exakt 256 Bits wie ein kryptografischer SHA-256-Hashwert"
    ],
    "explanation": "Version (4B) + Hash Vorblock (32B) + Merkle Root (32B) + Timestamp (4B) + Bits/Difficulty (4B) + Nonce (4B) = exakt 80 Bytes.",
    "exp": "Version (4B) + Hash Vorblock (32B) + Merkle Root (32B) + Timestamp (4B) + Bits/Difficulty (4B) + Nonce (4B) = exakt 80 Bytes."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Was passiert, wenn du versehentlich Bitcoin an eine gültige Adresse sendest, deren privaten Schlüssel niemand auf der Welt besitzt?",
    "a": [
      "Die Bitcoins sind für immer unwiderruflich verloren und von niemandem bewegbar",
      "Sie werden nach 100 Blöcken automatisch an die ursprüngliche Wallet zurückgebucht",
      "Die Miner teilen die verlorenen Bitcoins als zusätzliche Gebühr unter sich auf",
      "Der Schöpfer Satoshi Nakamoto besitzt einen Master-Key zur Rettung verlorener Münzen"
    ],
    "explanation": "Auf der Blockchain gibt es keinen Kundenservice: Ohne den passenden privaten Schlüssel kann niemand die mathematische Signatur erzeugen.",
    "exp": "Auf der Blockchain gibt es keinen Kundenservice: Ohne den passenden privaten Schlüssel kann niemand die mathematische Signatur erzeugen."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "Welches Präfix besitzen modernste Taproot-Adressen auf der Bitcoin-Blockchain?",
    "a": [
      "bc1p... (BIP341)",
      "bc1q... (BIP173)",
      "1A1zP... (Legacy)",
      "342ft... (P2SH)"
    ],
    "explanation": "bc1p steht für SegWit Version 1 (Taproot) – diese Adressen nutzen 32-Byte Schnorr-Outputs und bieten modernste Privatsphäre und Skalierbarkeit.",
    "exp": "bc1p steht für SegWit Version 1 (Taproot) – diese Adressen nutzen 32-Byte Schnorr-Outputs und bieten modernste Privatsphäre und Skalierbarkeit."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "pro",
    "q": "Was ermöglicht der Script-Opcode „OP_CHECKLOCKTIMEVERIFY“ (CLTV, BIP65)?",
    "a": [
      "Einen Output bis zu einer bestimmten Blockhöhe oder Zeit unbeweglich einzufrieren",
      "Den privaten Schlüssel nach drei Fehlversuchen auf der Hardware-Wallet zu löschen",
      "Die Transaktionsgebühr automatisch an den aktuellen Bitcoin-Kurs anzupassen",
      "Eine Zahlung erst dann freizugeben, wenn drei von fünf Parteien gleichzeitig unterschreiben"
    ],
    "explanation": "CLTV macht es möglich, Auszahlungen mathematisch zu sperren – essenziell für Zeitschlösser, Escrow-Verträge und Zahlungskanäle.",
    "exp": "CLTV macht es möglich, Auszahlungen mathematisch zu sperren – essenziell für Zeitschlösser, Escrow-Verträge und Zahlungskanäle."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Was ist der fundamentale Unterschied zwischen einer „Full Node“ und einem reinen „Miner“?",
    "a": [
      "Full Nodes prüfen und erzwingen alle Konsensregeln; Miner erzeugen neue Block-Kandidaten",
      "Miner verwalten die Guthaben der Wallets; Full Nodes berechnen die Hashrate des Netzwerks",
      "Full Nodes erhalten die Block-Belohnung; Miner arbeiten ehrenamtlich für das Netzwerk",
      "Miner entscheiden per Abstimmung über Software-Updates; Full Nodes führen diese nur aus"
    ],
    "explanation": "Nicht die Miner bestimmen die Spielregeln von Bitcoin, sondern die zehntausenden unabhängigen Full Nodes weltweit – ungültige Blöcke werden sofort verworfen.",
    "exp": "Nicht die Miner bestimmen die Spielregeln von Bitcoin, sondern die zehntausenden unabhängigen Full Nodes weltweit – ungültige Blöcke werden sofort verworfen."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "Warum beträgt die Ziel-Blockzeit bei Bitcoin im Mittel genau 10 Minuten?",
    "a": [
      "Um globalen Nodes ausreichend Zeit zur fehlerfreien Block-Propagierung zu geben",
      "Weil menschliche Banküberweisungen im Durchschnitt ebenfalls zehn Minuten dauern",
      "Weil die ASIC-Mining-Hardware nach zehn Minuten Rechenzeit abkühlen muss",
      "Weil Satoshi Nakamoto diesen Wert zufällig per Würfelentscheid festgelegt hat"
    ],
    "explanation": "Wäre die Blockzeit nur 5 Sekunden, würden ständig konkurrierende Blöcke gleichzeitig gefunden – das würde große Mining-Konzerne unfair bevorteilen.",
    "exp": "Wäre die Blockzeit nur 5 Sekunden, würden ständig konkurrierende Blöcke gleichzeitig gefunden – das würde große Mining-Konzerne unfair bevorteilen."
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "Wie viele Bitcoins wird es jemals im mathematisch festgelegten Maximum geben?",
    "a": [
      "Exakt knapp 21 Millionen Bitcoins (genau 20.999.999,9769 BTC)",
      "Unbegrenzt viele Münzen mit einer festen jährlichen Inflationsrate von zwei Prozent",
      "Exakt 100 Millionen Bitcoins analog zu den 100 Millionen Satoshi pro Coin",
      "Genau 18,5 Millionen Bitcoins, von denen bereits alle geschürft wurden"
    ],
    "explanation": "Durch die Halbierung der Blockbelohnung alle 210.000 Blöcke summiert sich die geometrische Reihe exakt auf 21 Millionen BTC.",
    "exp": "Durch die Halbierung der Blockbelohnung alle 210.000 Blöcke summiert sich die geometrische Reihe exakt auf 21 Millionen BTC."
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "In welchem Intervall findet das legendäre Bitcoin-Halving statt?",
    "a": [
      "Alle 210.000 Blöcke (im Schnitt ungefähr alle vier Jahre)",
      "Pünktlich am ersten Tag eines jeden Schaltjahres um Mitternacht",
      "Immer dann, wenn sich die weltweite Rechenleistung verdoppelt hat",
      "Alle 100.000 Blöcke nach einem gemeinsamen Beschluss der Kernentwickler"
    ],
    "explanation": "Das Halving ist nicht an einen Kalender gebunden, sondern an die Blockhöhe: Bei 210.000, 420.000, 630.000, 840.000 Blöcken usw. halbiert sich die Belohnung.",
    "exp": "Das Halving ist nicht an einen Kalender gebunden, sondern an die Blockhöhe: Bei 210.000, 420.000, 630.000, 840.000 Blöcken usw. halbiert sich die Belohnung."
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "Was sucht ein Bitcoin-Miner bei Proof-of-Work eigentlich ganz genau?",
    "a": [
      "Eine Nonce, sodass der SHA-256-Hash des Headers kleiner als das Target ist",
      "Ein mathematisches Primzahl-Muster mit mehr als eintausend Dezimalstellen",
      "Die exakten GPS-Koordinaten des nächsten am Netzwerk angeschlossenen Großrechners",
      "Ein ungelöstes Schachproblem aus einer weltweiten historischen Datenbank"
    ],
    "explanation": "Mining ist wie eine gigantische globale Lotterie: Wer Billionen Zahlen durchprobiert, findet irgendwann einen Hash mit genügend führenden Nullen.",
    "exp": "Mining ist wie eine gigantische globale Lotterie: Wer Billionen Zahlen durchprobiert, findet irgendwann einen Hash mit genügend führenden Nullen."
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Wie oft passt das Bitcoin-Netzwerk die Mining-Schwierigkeit (Difficulty Adjustment) automatisch an?",
    "a": [
      "Alle 2.016 Blöcke (ungefähr alle zwei Wochen im Netzwerk)",
      "Nach jedem einzelnen gefundenen Block in Echtzeit",
      "Einmal pro Kalenderjahr am Jahrestag des Genesis-Blocks",
      "Nur bei extremen Kursschwankungen von mehr als dreißig Prozent"
    ],
    "explanation": "Dauerten die letzten 2.016 Blöcke weniger als zwei Wochen, steigt die Difficulty; dauerten sie länger, sinkt sie – so bleibt der Takt bei ~10 Minuten.",
    "exp": "Dauerten die letzten 2.016 Blöcke weniger als zwei Wochen, steigt die Difficulty; dauerten sie länger, sinkt sie – so bleibt der Takt bei ~10 Minuten."
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Was passiert mit der Sicherheit von Bitcoin, wenn 80 Prozent aller weltweiten Miner schlagartig ihren Strom abschalten?",
    "a": [
      "Blöcke kommen langsamer; nach max. 2.016 Blöcken passt sich die Difficulty an",
      "Das gesamte Netzwerk bricht zusammen und alle Guthaben werden unwiderruflich gelöscht",
      "Die Transaktionsgebühren fallen sofort auf null, da kein Wettbewerb mehr herrscht",
      "Die verbliebenen Nodes müssen manuell per Hard Fork eine neue Blockchain starten"
    ],
    "explanation": "Genau das geschah im Mai 2021 beim chinesischen Mining-Verbot: Über 50 % der Hashrate fielen aus – das Netzwerk lief unterbrechungsfrei weiter.",
    "exp": "Genau das geschah im Mai 2021 beim chinesischen Mining-Verbot: Über 50 % der Hashrate fielen aus – das Netzwerk lief unterbrechungsfrei weiter."
  },
  {
    "cat": "mining_konsens",
    "diff": "pro",
    "q": "Warum ist der Begriff „51%-Angriff“ oft missverstanden und was KANN ein Angreifer mit 51% Hashrate NICHT tun?",
    "a": [
      "Er kann keine fremden Coins stehlen, keine Keys knacken und keine Regeln ändern",
      "Er kann beliebige neue Bitcoins aus dem Nichts erschaffen und an sich überweisen",
      "Er kann die Kontostände aller Nutzer weltweit auf null setzen und sperren",
      "Er kann die mathematische Obergrenze von 21 Millionen Münzen beliebig anheben"
    ],
    "explanation": "Jede Full Node prüft Signaturen und Regeln selbstständig. Ein 51%-Miner kann lediglich eigene Transaktionen reorganisieren (Double Spend) oder Transaktionen zensieren.",
    "exp": "Jede Full Node prüft Signaturen und Regeln selbstständig. Ein 51%-Miner kann lediglich eigene Transaktionen reorganisieren (Double Spend) oder Transaktionen zensieren."
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Woraus setzt sich die Gesamt-Einnahme eines Miners pro gefundenem Block zusammen?",
    "a": [
      "Fester Block-Reward plus Gebühren der Transaktionen",
      "Ausschließlich die freiwilligen Trinkgelder der Nutzer",
      "Eine feste monatliche Vergütung der Bitcoin Foundation",
      "Der Zinsgewinn aus dem Halten geschürfter Bitcoins"
    ],
    "explanation": "Wenn in Zukunft die Block-Subvention gegen Null geht, finanzieren allein die Transaktionsgebühren die Sicherheit des Mining-Netzwerks.",
    "exp": "Wenn in Zukunft die Block-Subvention gegen Null geht, finanzieren allein die Transaktionsgebühren die Sicherheit des Mining-Netzwerks."
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "Was ist ein „ASIC“ im modernen Bitcoin-Mining?",
    "a": [
      "Spezialisierter Mikrochip ausschließlich für SHA-256-Berechnungen",
      "Eine leistungsstarke Grafikkarte für aufwendige 3D-Spiele",
      "Ein Quantenprozessor zur Entschlüsselung von Signaturen",
      "Ein optischer Sensor zur Messung der Serverraumtemperatur"
    ],
    "explanation": "ASIC steht für Application-Specific Integrated Circuit – normale CPUs und GPUs sind im Bitcoin-Mining seit 2013 völlig chancenlos.",
    "exp": "ASIC steht für Application-Specific Integrated Circuit – normale CPUs und GPUs sind im Bitcoin-Mining seit 2013 völlig chancenlos."
  },
  {
    "cat": "mining_konsens",
    "diff": "pro",
    "q": "Was beschreibt das Phänomen des „Methane Flaring“ beim modernen nachhaltigen Bitcoin-Mining?",
    "a": [
      "Nutzung von abgefackeltem Erdöl-Begleitgas zur Stromerzeugung vor Ort",
      "Das Verbrennen von Altreifen in Kraftwerken nahe großen Mining-Farmen",
      "Der Einsatz von Biogasanlagen zur Kühlung von Serverräumen",
      "Die Gewinnung von Strom aus geothermalen Meeresströmungen"
    ],
    "explanation": "Begleitgas, das sonst nutzlos in die Atmosphäre abgefackelt oder entweicht würde, treibt mobile Mining-Container an und reduziert Treibhausgasemissionen.",
    "exp": "Begleitgas, das sonst nutzlos in die Atmosphäre abgefackelt oder entweicht würde, treibt mobile Mining-Container an und reduziert Treibhausgasemissionen."
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "Wie hoch war die anfängliche Block-Subvention (Reward) im Jahr 2009 beim Start von Bitcoin?",
    "a": [
      "50 BTC pro Block",
      "25 BTC pro Block",
      "100 BTC pro Block",
      "12,5 BTC pro Block"
    ],
    "explanation": "Von 2009 bis 2012 gab es 50 BTC pro Block, dann 25 BTC, dann 12,5 BTC, dann 6,25 BTC und seit April 2024 sind es noch 3,125 BTC.",
    "exp": "Von 2009 bis 2012 gab es 50 BTC pro Block, dann 25 BTC, dann 12,5 BTC, dann 6,25 BTC und seit April 2024 sind es noch 3,125 BTC."
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Was ist die erste Transaktion in jedem Bitcoin-Block, in der die neuen Coins erschaffen werden?",
    "a": [
      "Coinbase-Transaktion",
      "Genesis-Block-Transaktion",
      "Root-Transaktion",
      "Mining-Transaktion"
    ],
    "explanation": "Die Coinbase-Transaktion hat keine Inputs – hier generiert der Finder des Blocks die Block-Subvention plus alle Gebühren auf seine eigene Adresse.",
    "exp": "Die Coinbase-Transaktion hat keine Inputs – hier generiert der Finder des Blocks die Block-Subvention plus alle Gebühren auf seine eigene Adresse."
  },
  {
    "cat": "mining_konsens",
    "diff": "pro",
    "q": "Welchen dramatischen Vorteil bringt das neue Mining-Pool-Protokoll „Stratum V2“ für die Dezentralisierung?",
    "a": [
      "Miner können eigene Blöcke selbst bauen statt Vorgaben des Pools zu nutzen",
      "Die Stromkosten für das Mining halbieren sich durch neue Software",
      "Blöcke werden in weniger als fünf Sekunden weltweit bestätigt",
      "Transaktionen können ohne die Zahlung von Gebühren abgewickelt werden"
    ],
    "explanation": "Bisher bestimmen Pool-Betreiber, welche Transaktionen gemint werden – Stratum V2 gibt diese Macht zurück an die tausenden einzelnen Miner.",
    "exp": "Bisher bestimmen Pool-Betreiber, welche Transaktionen gemint werden – Stratum V2 gibt diese Macht zurück an die tausenden einzelnen Miner."
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "In welchem Jahr wird voraussichtlich der allerletzte Satoshi gemint werden?",
    "a": [
      "Um das Jahr 2140",
      "Bereits im Jahr 2032",
      "Im Jahr 2050",
      "Erst im Jahr 2250"
    ],
    "explanation": "Wegen der 32 Halvings wird der letzte Bruchteil eines Bitcoins ca. 2140 geschöpft – danach speisen sich Miner-Einnahmen zu 100 % aus Transaktionsgebühren.",
    "exp": "Wegen der 32 Halvings wird der letzte Bruchteil eines Bitcoins ca. 2140 geschöpft – danach speisen sich Miner-Einnahmen zu 100 % aus Transaktionsgebühren."
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Was bedeutet der Begriff „Hashrate“ im Bitcoin-Netzwerk?",
    "a": [
      "Geschätzte Anzahl der SHA-256-Rechenoperationen aller Miner pro Sekunde",
      "Die durchschnittliche Geschwindigkeit von Internetleitungen der Nodes",
      "Die Anzahl neu erstellter Bitcoin-Adressen innerhalb einer Stunde",
      "Die Speicherkapazität aller angeschlossenen Festplatten weltweit"
    ],
    "explanation": "Die Hashrate liegt heute bei über 600 Exahashes pro Sekunde – das sind 600 Trillionen Berechnungen jede einzelne Sekunde weltweit.",
    "exp": "Die Hashrate liegt heute bei über 600 Exahashes pro Sekunde – das sind 600 Trillionen Berechnungen jede einzelne Sekunde weltweit."
  },
  {
    "cat": "mining_konsens",
    "diff": "pro",
    "q": "Warum führt eine Halbierung der Hashrate nicht zu einer Halbierung der Bitcoinerzeugung auf Dauer?",
    "a": [
      "Die Difficulty senkt die Rechenhürde automatisch an",
      "Zentralbanken schalten zusätzliche Mining-Rechner zur Rettung hinzu",
      "Die Blockgröße wird automatisch verdoppelt, um Zeit zu sparen",
      "Das Netzwerk friert alle Transaktionen bis zur Kurserholung ein"
    ],
    "explanation": "Das mathematische Regelwerk passt sich stets an: Egal wie viel oder wenig Rechenleistung existiert, das Angebot an neuen BTC bleibt exakt nach Plan.",
    "exp": "Das mathematische Regelwerk passt sich stets an: Egal wie viel oder wenig Rechenleistung existiert, das Angebot an neuen BTC bleibt exakt nach Plan."
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Was ist ein „Orphan Block“ (verwaister Block) in der Bitcoin-Blockchain?",
    "a": [
      "Ein gültiger Block, der sich in der Kette letztlich nicht durchsetzte",
      "Ein Block, der von Minern ohne jede Transaktion erzeugt wurde",
      "Ein Block mit fehlerhafter Prüfsumme im Block-Header",
      "Ein Block, dessen Finder seine Belohnung nicht abgeholt hat"
    ],
    "explanation": "Finden zwei Miner gleichzeitig einen Block, spaltet sich die Kette kurz – sobald der nächste Block gefunden wird, gewinnt die längere Kette und der andere wird verworfen.",
    "exp": "Finden zwei Miner gleichzeitig einen Block, spaltet sich die Kette kurz – sobald der nächste Block gefunden wird, gewinnt die längere Kette und der andere wird verworfen."
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "Warum wird Bitcoin-Mining oft als „Käufer der letzten Instanz“ für erneuerbare Energien bezeichnet?",
    "a": [
      "Miner nehmen ortsunabhängig überschüssigen Strom ab, der sonst verpufft",
      "Miner erhalten staatliche Zuschüsse für den Betrieb von Wasserkraft",
      "Miner kaufen alte Kohlekraftwerke auf und legen sie endgültig still",
      "Miner verpflichten sich vertraglich zur Abnahme von teurem Spitzenstrom"
    ],
    "explanation": "Wind- und Wasserkraftwerke an entlegenen Orten können Strom nicht immer transportieren – Bitcoin-Miner wandeln diese sonst verlorene Energie in ökonomischen Wert um.",
    "exp": "Wind- und Wasserkraftwerke an entlegenen Orten können Strom nicht immer transportieren – Bitcoin-Miner wandeln diese sonst verlorene Energie in ökonomischen Wert um."
  },
  {
    "cat": "mining_konsens",
    "diff": "pro",
    "q": "Was passiert, wenn ein böswilliger Miner versucht, sich in der Coinbase-Transaktion 10 statt 3,125 Bitcoins auszuzahlen?",
    "a": [
      "Unabhängige Full Nodes verwerfen den Block sofort als ungültig",
      "Der Miner erhält eine Verwarnung durch das Bitcoin-Entwicklerteam",
      "Das Guthaben des Miners wird im Netzwerk dauerhaft beschlagnahmt",
      "Der fehlerhafte Block wird von anderen Minern automatisch repariert"
    ],
    "explanation": "Konsensregeln sind absolut kompromisslos: Selbst wenn 99 % der Miner einen falschen Block unterstützen würden, wirft ihn jede Node sofort in den Papierkorb.",
    "exp": "Konsensregeln sind absolut kompromisslos: Selbst wenn 99 % der Miner einen falschen Block unterstützen würden, wirft ihn jede Node sofort in den Papierkorb."
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Warum verbraucht das Bitcoin-Mining physikalisch überhaupt so viel Strom?",
    "a": [
      "Thermodynamische Arbeit verankert Sicherheit fest in der Realität",
      "Der hohe Stromverbrauch dient der Erwärmung von Rechenzentren",
      "Das Netzwerk kühlt die Server durch kontrollierten Energiefluss",
      "Stromverbrauch verhindert das Auftreten von Software-Bugs im Code"
    ],
    "explanation": "PoW verbindet Information mit Thermodynamik: Wer die Vergangenheit umschreiben will, müsste mehr Energie aufwenden als das gesamte ehrliche Netzwerk zusammen.",
    "exp": "PoW verbindet Information mit Thermodynamik: Wer die Vergangenheit umschreiben will, müsste mehr Energie aufwenden als das gesamte ehrliche Netzwerk zusammen."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Was ist das Lightning Network im Verhältnis zur Bitcoin-Haupt-Blockchain?",
    "a": [
      "Dezentrales Layer-2-Netzwerk für sekundenschnelle Off-Chain-Zahlungen",
      "Eine separate neue Blockchain mit eigenem spekulativem Token",
      "Ein zentralisierter Bezahldienst ähnlich PayPal für Bitcoins",
      "Ein Cloud-Dienst zur sicheren Verwahrung von Hardware-Wallets"
    ],
    "explanation": "Im Lightning Network können Millionen Transaktionen pro Sekunde abgewickelt werden, während die Basisschicht nur zum Öffnen und Schließen von Kanälen dient.",
    "exp": "Im Lightning Network können Millionen Transaktionen pro Sekunde abgewickelt werden, während die Basisschicht nur zum Öffnen und Schließen von Kanälen dient."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Was stellen die berühmten 12 oder 24 Wörter einer Seed-Phrase (BIP-39) dar?",
    "a": [
      "Lesbare Codierung des Master-Private-Keys für alle Wallet-Adressen",
      "Ein Zufallstext zur Verschlüsselung von E-Mail-Nachrichten",
      "Eine Liste von Passwörtern für verschiedene Krypto-Börsen",
      "Ein Verzeichnis der meistgenutzten Adressen im Adressbuch"
    ],
    "explanation": "Aus diesen 12 oder 24 Wörtern aus der standardisierten BIP-39-Wortliste (2.048 Wörter) lassen sich mathematisch unendlich viele Adressen und Schlüssel ableiten.",
    "exp": "Aus diesen 12 oder 24 Wörtern aus der standardisierten BIP-39-Wortliste (2.048 Wörter) lassen sich mathematisch unendlich viele Adressen und Schlüssel ableiten."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Was ist das kryptografische Kernkonstrukt, das Zahlungen über mehrere Stationen im Lightning Network sicher macht?",
    "a": [
      "HTLC (Hash Time Locked Contract)",
      "ECDSA (Elliptic Curve Digital Signature)",
      "MAST (Merkelized Alternative Script Trees)",
      "SPV (Simplified Payment Verification)"
    ],
    "explanation": "Ein HTLC garantiert: Entweder wird das Geheimnis (Preimage) rechtzeitig vorgelegt und das Geld fließt, oder beide Parteien erhalten ihr Guthaben automatisch zurück.",
    "exp": "Ein HTLC garantiert: Entweder wird das Geheimnis (Preimage) rechtzeitig vorgelegt und das Geld fließt, oder beide Parteien erhalten ihr Guthaben automatisch zurück."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Was bewirkt die optionale „Passphrase“ (oft als 25. Wort bezeichnet) bei einem BIP-39-Backup?",
    "a": [
      "Generiert eine komplett eigenständige Wallet zum Schutz vor Erpressung",
      "Erhöht die Überweisungsgeschwindigkeit im Netzwerk spürbar",
      "Befreit Transaktionen von den regulären Netzwerkgebühren",
      "Verdoppelt den Wert der gehaltenen Bitcoins bei Kursanstiegen"
    ],
    "explanation": "Jede unterschiedliche Passphrase öffnet eine völlig neue Kette von Adressen – ein Angreifer kann nicht feststellen, ob noch eine weitere geheime Wallet existiert.",
    "exp": "Jede unterschiedliche Passphrase öffnet eine völlig neue Kette von Adressen – ein Angreifer kann nicht feststellen, ob noch eine weitere geheime Wallet existiert."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "pro",
    "q": "Was ist die Aufgabe eines „Watchtowers“ im Lightning Network?",
    "a": [
      "Überwacht die Blockchain auf alte Zustände und bestraft Betrug",
      "Verbindet Lightning-Knoten mit dem Mobilfunknetz bei Stromausfall",
      "Berechnet die Gebühren für künftige On-Chain-Transaktionen voraus",
      "Verwahrt private Schlüssel auf externen Sicherheitsservern"
    ],
    "explanation": "Versucht ein Partner einen alten Kanalstand auf der Kette zu veröffentlichen, greift der Watchtower mit der Revocation-Transaktion ein und straft ihn rigoros ab.",
    "exp": "Versucht ein Partner einen alten Kanalstand auf der Kette zu veröffentlichen, greift der Watchtower mit der Revocation-Transaktion ein und straft ihn rigoros ab."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Was bedeutet das Motto: „Not your keys, not your coins“ in der Bitcoin-Community?",
    "a": [
      "Ohne eigene Schlüssel besitzt man nur ein Versprechen",
      "Münzen müssen zwingend auf physischen USB-Sticks gelagert werden",
      "Private Schlüssel dürfen nur auf Papier mit Tinte notiert werden",
      "Ohne amtlichen Ausweis verliert man das Eigentum an Bitcoins"
    ],
    "explanation": "Zusammenbrüche wie Mt. Gox oder FTX bewiesen: Nur wer seine Schlüssel (Non-Custodial) selbst verwahrt, ist vor Veruntreuung und Pleiten geschützt.",
    "exp": "Zusammenbrüche wie Mt. Gox oder FTX bewiesen: Nur wer seine Schlüssel (Non-Custodial) selbst verwahrt, ist vor Veruntreuung und Pleiten geschützt."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Was ist eine „Multisig-Wallet“ (z. B. 2-von-3) und welchen Sicherheitsgewinn bringt sie?",
    "a": [
      "Mindestens 2 von 3 separaten Schlüsseln müssen signieren",
      "Zwei Personen müssen den Überweisungsbetrag gleichzeitig bestätigen",
      "Eine Transaktion erfordert drei getrennte Bestätigungen der Bank",
      "Schlüssel werden alle zwei Monate automatisch neu generiert"
    ],
    "explanation": "Geht ein Schlüssel verloren oder wird gestohlen, bleibt das Geld sicher – Multisig ist der Goldstandard für Firmen und große private Vermögen.",
    "exp": "Geht ein Schlüssel verloren oder wird gestohlen, bleibt das Geld sicher – Multisig ist der Goldstandard für Firmen und große private Vermögen."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "pro",
    "q": "Was ist der Vorteil von „PSBT“ (Partially Signed Bitcoin Transactions, BIP174)?",
    "a": [
      "Transaktionen können offline auf Air-Gapped-Geräten signiert werden",
      "Transaktionen sind vollkommen anonym und hinterlassen keine Spuren",
      "Überweisungen werden ohne jede Berechnung von Gebühren ausgeführt",
      "Zahlungen können innerhalb von 24 Stunden widerrufen werden"
    ],
    "explanation": "PSBT trennt das Vorbereiten, Koordinieren und Signieren – die Hardware-Wallet berührt niemals das Internet und signiert sicher per QR-Code oder SD-Karte.",
    "exp": "PSBT trennt das Vorbereiten, Koordinieren und Signieren – die Hardware-Wallet berührt niemals das Internet und signiert sicher per QR-Code oder SD-Karte."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Was zeichnet eine echte „Hardware-Wallet“ (wie BitBox02, Trezor oder Coldcard) im Vergleich zu einer Handy-App aus?",
    "a": [
      "Der private Schlüssel verlässt den Sicherheitschip niemals",
      "Sie benötigt eine ständige WLAN-Verbindung zum Abgleich",
      "Sie funktioniert vollkommen ohne Eingabe einer PIN-Nummer",
      "Sie besteht aus feuerfestem Titan und wiegt über ein Kilogramm"
    ],
    "explanation": "Selbst wenn der verbundene Computer voller Viren und Trojaner ist, kann der Angreifer den privaten Schlüssel nicht auslesen.",
    "exp": "Selbst wenn der verbundene Computer voller Viren und Trojaner ist, kann der Angreifer den privaten Schlüssel nicht auslesen."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Was beschreibt das neue Lightning-Spezifikationsprotokoll „BOLT-12“ (Offers)?",
    "a": [
      "Wiederverwendbare statische Zahlungsanfragen und Abonnements",
      "Die Verdoppelung der Kanalkapazität ohne On-Chain-Transaktion",
      "Das Versenden von Zahlungen ohne jegliche Internetverbindung",
      "Die Verschlüsselung von IP-Adressen aller beteiligten Knoten"
    ],
    "explanation": "Klassische BOLT-11-Rechnungen waren Einweg-Invoices – BOLT-12 ermöglicht Spenden-QR-Codes, die dauerhaft gültig sind, und automatische Rechnungsstellung.",
    "exp": "Klassische BOLT-11-Rechnungen waren Einweg-Invoices – BOLT-12 ermöglicht Spenden-QR-Codes, die dauerhaft gültig sind, und automatische Rechnungsstellung."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "pro",
    "q": "Was ist das Problem des „Inbound Liquidity“ beim Betreiben einer eigenen neuen Lightning-Routing-Node?",
    "a": [
      "Man kann erst empfangen, wenn andere Kanäle zu einem öffnen",
      "Die Geldbörse synchronisiert erst nach Zahlung einer Gebühr",
      "Das Mobiltelefon muss beim Empfang im Flugmodus bleiben",
      "Empfangene Zahlungen müssen innerhalb einer Stunde bestätigt werden"
    ],
    "explanation": "Um empfangen zu können, müssen Satoshis auf der Gegenseite des Kanals liegen. Fehlt Gegenstellen-Guthaben, können Zahlungen nicht zu einem geroutet werden.",
    "exp": "Um empfangen zu können, müssen Satoshis auf der Gegenseite des Kanals liegen. Fehlt Gegenstellen-Guthaben, können Zahlungen nicht zu einem geroutet werden."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Was bedeutet der Begriff „Cold Storage“ bei der Aufbewahrung von Kryptowerten?",
    "a": [
      "Private Schlüssel werden auf Medien ohne Internetverbindung verwahrt",
      "Die Lagerung von Festplatten in klimatisierten Kühlräumen",
      "Das Einfrieren von Wallet-Guthaben bei drohenden Kursabstürzen",
      "Die Aufbewahrung von Bitcoins auf Schweizer Bankkonten"
    ],
    "explanation": "Hardware-Wallets, Paper-Wallets oder Metallplatten, die keinen Internetkontakt haben, sind vor Online-Hacking absolut sicher.",
    "exp": "Hardware-Wallets, Paper-Wallets oder Metallplatten, die keinen Internetkontakt haben, sind vor Online-Hacking absolut sicher."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Warum stanzen erfahrene Bitcoiner ihre 12 oder 24 Seed-Wörter oft in Edelstahl- oder Titanplatten?",
    "a": [
      "Schutz des Backups gegen Feuer, Wasser, Säure und Zerstörung",
      "Weil Stahlplatten im Dunkeln besser lesbar sind als Papier",
      "Damit Metalldetektoren die Wörter am Flughafen aufspüren",
      "Weil Papier nach zehn Jahren automatisch unlesbar wird"
    ],
    "explanation": "Papier verbrennt bei 230 °C und löst sich in Wasser auf – Edelstahl widersteht über 1.400 °C Hitze bei einem Wohnungsbrand mühelos.",
    "exp": "Papier verbrennt bei 230 °C und löst sich in Wasser auf – Edelstahl widersteht über 1.400 °C Hitze bei einem Wohnungsbrand mühelos."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "pro",
    "q": "Was ist der Unterschied zwischen einer „Federated Sidechain“ (wie Liquid) und dem Lightning Network?",
    "a": [
      "Liquid ist eine Sidechain mit Funktionären, Lightning nutzt echtes BTC",
      "Liquid funktioniert nur mit US-Dollar, Lightning mit Euro",
      "Lightning speichert alle Daten auf einer zentralen Datenbank",
      "Liquid erfordert keinerlei Transaktionsgebühren für Zahlungen"
    ],
    "explanation": "Auf Sidechains werden Bitcoins eingesperrt (Peg-in) und als Stellvertreter-Token bewegt – Lightning bewegt echte native UTXOs in Zahlungskanälen.",
    "exp": "Auf Sidechains werden Bitcoins eingesperrt (Peg-in) und als Stellvertreter-Token bewegt – Lightning bewegt echte native UTXOs in Zahlungskanälen."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Wie viele Transaktionen pro Sekunde (TPS) schafft die Bitcoin-Basisschicht (Layer 1) theoretisch maximal?",
    "a": [
      "Rund 7 bis 10 Transaktionen pro Sekunde",
      "Über 50.000 Transaktionen pro Sekunde",
      "Exakt eine Transaktion pro Sekunde",
      "Knapp 2.000 Transaktionen pro Sekunde"
    ],
    "explanation": "Wegen der Blockgröße von ~1-2 MB und 10 Minuten Blockzeit ist Layer 1 bewusst als unveränderliches, globales Abrechnungsnetzwerk (Settlement Layer) konzipiert.",
    "exp": "Wegen der Blockgröße von ~1-2 MB und 10 Minuten Blockzeit ist Layer 1 bewusst als unveränderliches, globales Abrechnungsnetzwerk (Settlement Layer) konzipiert."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Was geschieht beim „Closing“ (Schließen) eines Lightning-Zahlungskanals?",
    "a": [
      "Finaler Stand wird in einer On-Chain-Transaktion fixiert",
      "Sämtliche Gelder im Kanal werden an die Miner als Gebühr gezahlt",
      "Der Kanalpartner wird vom Lightning-Netzwerk dauerhaft gebannt",
      "Die Wallet löscht alle privaten Schlüssel zur Sicherheit"
    ],
    "explanation": "Tausende Zahlungen liefen blitzschnell off-chain ab – nur Start (Open) und Ende (Close) hinterlassen jeweils exakt eine Spur auf der Bitcoin-Blockchain.",
    "exp": "Tausende Zahlungen liefen blitzschnell off-chain ab – nur Start (Open) und Ende (Close) hinterlassen jeweils exakt eine Spur auf der Bitcoin-Blockchain."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "pro",
    "q": "Was ist das Prinzip des „Onion Routings“ bei Lightning-Zahlungen?",
    "a": [
      "Jeder Knoten kennt nur direkten Vorgänger und Nachfolger",
      "Transaktionen riechen nach Knoblauch und Zwiebeln im Code",
      "Zahlungen werden in sieben verschlüsselte Schichten verpackt",
      "Knotenbetreiber müssen für jedes Routing Gebühren in bar zahlen"
    ],
    "explanation": "Wie bei Tor ist das Zahlungspaket mehrfach verschlüsselt: Jeder Knoten schält nur seine eigene Schicht ab und leitet das Paket weiter – maximale Privatsphäre.",
    "exp": "Wie bei Tor ist das Zahlungspaket mehrfach verschlüsselt: Jeder Knoten schält nur seine eigene Schicht ab und leitet das Paket weiter – maximale Privatsphäre."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Was passiert, wenn du deine Hardware-Wallet verlierst oder sie ins Wasser fällt?",
    "a": [
      "Neues Gerät kaufen und Wallet mit den 12 oder 24 Wörtern wiederherstellen",
      "Sämtliche Bitcoins sind unwiederbringlich für immer verloren",
      "Man meldet den Verlust bei der Polizei zur Kontosperrung",
      "Der Hersteller schickt per Post einen Generalschlüssel zu"
    ],
    "explanation": "Bitcoins liegen niemals auf der Hardware-Wallet selbst, sondern auf der weltweiten Blockchain. Das Gerät speichert nur den Schlüssel zur Autorisierung.",
    "exp": "Bitcoins liegen niemals auf der Hardware-Wallet selbst, sondern auf der weltweiten Blockchain. Das Gerät speichert nur den Schlüssel zur Autorisierung."
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Was versteht man unter dem Begriff „Dust Limit“ im Bitcoin-Protokoll?",
    "a": [
      "Schwellenwert für Beträge, deren Ausgabe mehr Gebühren als Wert kostet",
      "Die maximale Staubschicht auf Lüftern von Mining-Rechnern",
      "Ein Filter für Spam-Transaktionen mit zu vielen Adressen",
      "Die Grenze für freiwillige Trinkgelder an Knotenbetreiber"
    ],
    "explanation": "Um zu verhindern, dass die UTXO-Datenbank aller Nodes mit unwirtschaftlichem Müll zugemüllt wird, lehnen Nodes Transaktionen unter dem Dust Limit (~546 Satoshis) ab.",
    "exp": "Um zu verhindern, dass die UTXO-Datenbank aller Nodes mit unwirtschaftlichem Müll zugemüllt wird, lehnen Nodes Transaktionen unter dem Dust Limit (~546 Satoshis) ab."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Welche historische Schlagzeile bettete Satoshi Nakamoto am 3. Januar 2009 in den Genesis-Block von Bitcoin ein?",
    "a": [
      "The Times: Kanzler vor zweiter Bankenrettung",
      "Wall Street Journal: Lehman Brothers meldet Konkurs an",
      "Financial Times: Goldpreis erreicht neues Allzeithoch",
      "New York Times: Weltwirtschaft rutscht in schwere Rezession"
    ],
    "explanation": "Satoshi bewies damit nicht nur das exakte Startdatum, sondern hinterließ einen dauerhaften Protest gegen das unbegrenzte Gelddrucken und Bankenrettungen.",
    "exp": "Satoshi bewies damit nicht nur das exakte Startdatum, sondern hinterließ einen dauerhaften Protest gegen das unbegrenzte Gelddrucken und Bankenrettungen."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Was kaufte der Programmierer Laszlo Hanyecz am 22. Mai 2010 für 10.000 Bitcoins (der berühmte Bitcoin Pizza Day)?",
    "a": [
      "Zwei Pizzen von Papa John’s über ein Forenmitglied",
      "Einen gebrauchten Laptop für die Softwareentwicklung",
      "Ein T-Shirt mit dem aufgedruckten Bitcoin-Logo",
      "Zehn Kilo Kaffeebohnen aus kolumbianischem Anbau"
    ],
    "explanation": "Es war die allererste dokumentierte kommerzielle Warentransaktion mit Bitcoin – damals waren 10.000 BTC rund 41 US-Dollar wert.",
    "exp": "Es war die allererste dokumentierte kommerzielle Warentransaktion mit Bitcoin – damals waren 10.000 BTC rund 41 US-Dollar wert."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Wie werden Gewinne aus dem Verkauf von privat gehaltenem Bitcoin in Deutschland steuerlich nach § 23 EStG behandelt?",
    "a": [
      "Nach mindestens einem Jahr Haltedauer zu 100 % steuerfrei",
      "Gewinne unterliegen stets der pauschalen Abgeltungsteuer",
      "Kursgewinne sind in Deutschland grundsätzlich steuerfrei",
      "Man muss 50 Prozent aller Erträge an das Finanzamt abführen"
    ],
    "explanation": "In Deutschland gilt Bitcoin steuerlich als privates Wirtschaftsgut (wie Gold oder Kunst) – wer mindestens 365 Tage hodlt, zahlt keinen einzigen Cent Steuer.",
    "exp": "In Deutschland gilt Bitcoin steuerlich als privates Wirtschaftsgut (wie Gold oder Kunst) – wer mindestens 365 Tage hodlt, zahlt keinen einzigen Cent Steuer."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "mid",
    "q": "Welcher renommierte Krypto-Pionier erhielt im Januar 2009 die allererste Bitcoin-Transaktion (10 BTC) von Satoshi Nakamoto persönlich?",
    "a": [
      "Hal Finney",
      "Nick Szabo",
      "Wei Dai",
      "Gavin Andresen"
    ],
    "explanation": "Hal Finney twitterte legendär am 11. Januar 2009 „Running bitcoin“ und half Satoshi beim Testen und Debuggen des ersten Quellcodes.",
    "exp": "Hal Finney twitterte legendär am 11. Januar 2009 „Running bitcoin“ und half Satoshi beim Testen und Debuggen des ersten Quellcodes."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "mid",
    "q": "Worum ging es im dramatischen „Blocksize War“ zwischen 2015 und 2017 in der Bitcoin-Community?",
    "a": [
      "Große Blöcke für Firmen gegen kleine Blöcke für Dezentralität",
      "Miner forderten die Abschaffung des 21-Millionen-Limits",
      "Börsenbetreiber wollten anonyme Wallets komplett verbieten",
      "Entwickler stritten über die Programmiersprache von Bitcoin"
    ],
    "explanation": "Wären Blöcke gigantisch groß, könnten nur noch Großrechenzentren Nodes betreiben – Bitcoin hätte seine zensurresistente Dezentralisierung verloren.",
    "exp": "Wären Blöcke gigantisch groß, könnten nur noch Großrechenzentren Nodes betreiben – Bitcoin hätte seine zensurresistente Dezentralisierung verloren."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "pro",
    "q": "Was besagt der ökonomische „Cantillon-Effekt“ und warum löst Bitcoin dieses Problem?",
    "a": [
      "Erstempfänger von neuem Geld profitieren auf Kosten der Letztempfänger",
      "Die Preise für Konsumgüter steigen schneller als Immobilienwerte",
      "Sparguthaben auf Bankkonten vermehren sich durch Zinseszinsen",
      "Zentralbanken schütten Gewinne gleichmäßig an alle Bürger aus"
    ],
    "explanation": "Richard Cantillon erkannte 1755: Fiat-Geldumverteilung bereichert die Elite nah an der Druckerpresse. Bei Bitcoin kann niemand neues Geld bevorzugt aus dem Nichts schöpfen.",
    "exp": "Richard Cantillon erkannte 1755: Fiat-Geldumverteilung bereichert die Elite nah an der Druckerpresse. Bei Bitcoin kann niemand neues Geld bevorzugt aus dem Nichts schöpfen."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Welches Land führte im September 2021 als weltweit erster souveräner Staat Bitcoin als offizielles gesetzliches Zahlungsmittel ein?",
    "a": [
      "El Salvador",
      "Schweiz",
      "Singapur",
      "Argentinien"
    ],
    "explanation": "Präsident Nayib Bukele verabschiedete das Bitcoin-Gesetz und stattete Bürger mit der Chivo-Wallet und 30 Dollar Startguthaben aus.",
    "exp": "Präsident Nayib Bukele verabschiedete das Bitcoin-Gesetz und stattete Bürger mit der Chivo-Wallet und 30 Dollar Startguthaben aus."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "mid",
    "q": "Welches bahnbrechende Konzept erfand Adam Back 1997, das Satoshi Nakamoto direkt in Bitcoin als PoW übernahm?",
    "a": [
      "Hashcash zur Bekämpfung von E-Mail-Spam",
      "B-Money für dezentrale Verträge im Netz",
      "Bit Gold als Vorläufer digitaler Währungen",
      "Digicash für anonyme Zahlungen im Web"
    ],
    "explanation": "Hashcash verlangte vom E-Mail-Absender den Nachweis einer kleinen Rechenleistung – Satoshi zitierte Backs Paper direkt im Bitcoin-Whitepaper.",
    "exp": "Hashcash verlangte vom E-Mail-Absender den Nachweis einer kleinen Rechenleistung – Satoshi zitierte Backs Paper direkt im Bitcoin-Whitepaper."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "pro",
    "q": "Welcher Meilenstein der Finanzgeschichte ereignete sich im Januar 2024 an den US-Börsen?",
    "a": [
      "Genehmigung von elf Bitcoin-Spot-ETFs durch die US-Börsenaufsicht",
      "Die Einführung von Bitcoin als Weltreservewährung durch die UN",
      "Der vollständige Verzicht auf den US-Dollar im Welthandel",
      "Die Einstufung von Bitcoin als offizielle Währung in der EU"
    ],
    "explanation": "Der BlackRock iShares Bitcoin Trust (IBIT) wurde zum am schnellsten wachsenden ETF der gesamten Wall-Street-Geschichte.",
    "exp": "Der BlackRock iShares Bitcoin Trust (IBIT) wurde zum am schnellsten wachsenden ETF der gesamten Wall-Street-Geschichte."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Wann verfasste Satoshi Nakamoto seine letzte bekannte Nachricht im Bitcointalk-Forum, bevor er für immer verschwand?",
    "a": [
      "Im Dezember 2010",
      "Im Januar 2009 zu Jahresbeginn",
      "Im August 2014",
      "Im Mai 2017"
    ],
    "explanation": "Am 12. Dezember 2010 postete Satoshi über Software-Verbesserungen gegen DoS-Angriffe. Im April 2011 schrieb er Mike Hearn: „I’ve moved on to other things.“",
    "exp": "Am 12. Dezember 2010 postete Satoshi über Software-Verbesserungen gegen DoS-Angriffe. Im April 2011 schrieb er Mike Hearn: „I’ve moved on to other things.“"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "mid",
    "q": "Welche berüchtigte Darknet-Plattform wurde 2013 vom FBI geschlossen und brachte Bitcoin erstmals breite Medienpräsenz?",
    "a": [
      "Silk Road",
      "AlphaBay",
      "Hansa Market",
      "DarkMarket"
    ],
    "explanation": "Silk Road bewies einerseits die Funktionsfähigkeit zensurresistenter Zahlungen, prägte aber jahrelang das falsche Vorurteil, Bitcoin sei rein für Kriminelle.",
    "exp": "Silk Road bewies einerseits die Funktionsfähigkeit zensurresistenter Zahlungen, prägte aber jahrelang das falsche Vorurteil, Bitcoin sei rein für Kriminelle."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "pro",
    "q": "Was war der Auslöser für den dramatischen Zusammenbruch der Krypto-Börse Mt. Gox im Februar 2014?",
    "a": [
      "Jahrelanger unbemerkter Diebstahl von 850.000 Bitcoins",
      "Ein verheerender Brand im Hauptserverraum in Tokio",
      "Die Beschlagnahmung aller Konten durch die japanische Justiz",
      "Ein plötzlicher Programmierfehler in der Handelssoftware"
    ],
    "explanation": "Mt. Gox wickelte damals über 70 Prozent des weltweiten Bitcoin-Handels ab – die Pleite löste einen mehrjährigen Bärenmarkt aus.",
    "exp": "Mt. Gox wickelte damals über 70 Prozent des weltweiten Bitcoin-Handels ab – die Pleite löste einen mehrjährigen Bärenmarkt aus."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Was bedeutet der Begriff „Stock-to-Flow-Verhältnis“ bei einem knappen Gut wie Gold oder Bitcoin?",
    "a": [
      "Verhältnis des vorhandenen Bestands zur jährlichen Neuproduktion",
      "Die tägliche Handelsmenge im Vergleich zum Gesamtvolumen",
      "Der Anteil von Minern an den weltweiten Transaktionen",
      "Die Relation zwischen Marktkapitalisierung und Rechenleistung"
    ],
    "explanation": "Je höher das Stock-to-Flow-Verhältnis, desto härter das Geld – seit dem Halving 2024 hat Bitcoin ein höheres Stock-to-Flow-Verhältnis als Gold.",
    "exp": "Je höher das Stock-to-Flow-Verhältnis, desto härter das Geld – seit dem Halving 2024 hat Bitcoin ein höheres Stock-to-Flow-Verhältnis als Gold."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "mid",
    "q": "Welche Bewegung von Programmierern in den 1990ern forderte starke Kryptografie zum Schutz der Privatsphäre („Cypherpunks write code“)?",
    "a": [
      "Die Cypherpunks",
      "Die Silicon Valley Pioneers",
      "Die Open Source Alliance",
      "Die Free Software Foundation"
    ],
    "explanation": "Aus ihrer Mailingliste, auf der auch Hal Finney, Nick Szabo und Adam Back aktiv waren, entsprang 2008 das Bitcoin-Whitepaper.",
    "exp": "Aus ihrer Mailingliste, auf der auch Hal Finney, Nick Szabo und Adam Back aktiv waren, entsprang 2008 das Bitcoin-Whitepaper."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "pro",
    "q": "Was geschah bei der berüchtigten Hard Fork von „Bitcoin Cash“ (BCH) am 1. August 2017?",
    "a": [
      "Abspaltung mit Erhalt derselben Menge an Bitcoin Cash",
      "Sämtliche Bitcoin-Bestände wurden auf null zurückgesetzt",
      "Die Gebühren im Netzwerk stiegen um das Zehnfache an",
      "Mining wurde für vier Wochen weltweit unterbrochen"
    ],
    "explanation": "Weil Bitcoin Cash die Historie kopierte, besaß jeder Wallet-Inhaber plötzlich beide Coins – der Markt entschied sich jedoch eindeutig für das Original (BTC).",
    "exp": "Weil Bitcoin Cash die Historie kopierte, besaß jeder Wallet-Inhaber plötzlich beide Coins – der Markt entschied sich jedoch eindeutig für das Original (BTC)."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Unter welchem Pseudonym veröffentlichte der unbekannte Schöpfer von Bitcoin am 31. Oktober 2008 das Whitepaper?",
    "a": [
      "Satoshi Nakamoto",
      "Dorian Prentice Nakamoto",
      "Craig Wright",
      "Nick Szabo"
    ],
    "explanation": "Bis heute ist die wahre Identität von Satoshi Nakamoto eines der größten und faszinierendsten Geheimnisse der modernen Menschheit.",
    "exp": "Bis heute ist die wahre Identität von Satoshi Nakamoto eines der größten und faszinierendsten Geheimnisse der modernen Menschheit."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "mid",
    "q": "Welches US-amerikanische Software-Unternehmen kaufte unter Michael Saylor ab 2020 massiv Bitcoin als primäre Treasury-Reserve?",
    "a": [
      "MicroStrategy",
      "Tesla Motors",
      "Block Inc.",
      "Coinbase Global"
    ],
    "explanation": "MicroStrategy wandelte seine gesamten Cash-Bestände in Bitcoin um, emittierte Wandelanleihen und besitzt heute über 1 % aller existierenden Bitcoins.",
    "exp": "MicroStrategy wandelte seine gesamten Cash-Bestände in Bitcoin um, emittierte Wandelanleihen und besitzt heute über 1 % aller existierenden Bitcoins."
  },
  {
    "cat": "historie_oekonomie",
    "diff": "pro",
    "q": "Wie hoch ist die Freigrenze für private Veräußerungsgeschäfte nach § 23 EStG in Deutschland (Stand ab Steuerjahr 2024)?",
    "a": [
      "1.000 Euro Freigrenze pro Kalenderjahr",
      "801 Euro Sparerpauschbetrag pro Person",
      "10.000 Euro Freibetrag für Spekulationsgeschäfte",
      "Kryptogewinne sind in Deutschland unbegrenzt steuerfrei"
    ],
    "explanation": "Achtung: Es ist eine Freigrenze, kein Freibetrag! Wer 999 € Gewinn macht, zahlt 0 €; wer 1.001 € Gewinn innerhalb der Jahresfrist macht, versteuert die vollen 1.001 €.",
    "exp": "Achtung: Es ist eine Freigrenze, kein Freibetrag! Wer 999 € Gewinn macht, zahlt 0 €; wer 1.001 € Gewinn innerhalb der Jahresfrist macht, versteuert die vollen 1.001 €."
  }
];

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DATA;
  }
  if (typeof window !== 'undefined') {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS['bitcoin'] = DATA;
    if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === 'function') {
      window.ArcadeQuizEngine.registerBank('bitcoin', DATA);
    }
  }
})();
