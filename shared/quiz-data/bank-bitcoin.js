// Auto-generated unified quiz bank for "bitcoin" (75 questions)
(function () {
  const DATA = [
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Was bedeutet das UTXO-Modell (Unspent Transaction Output) in Bitcoin anschaulich im Alltag?",
    "a": [
      "Bitcoin funktioniert wie Bargeld-Münzen, die immer als Ganzes ausgegeben werden, wobei Wechselgeld zurückfließt",
      "Bitcoin speichert Guthaben wie eine Excel-Tabelle mit einfachen Kontoständen",
      "Jeder Nutzer besitzt ein festes Bankkonto mit täglicher Überweisungsbegrenzung",
      "Bitcoins existieren als fortlaufend nummerierte Seriennummern auf Festplatten"
    ],
    "explanation": "Wer 1 BTC besitzt, hat in Wahrheit einen UTXO im Wert von 1 BTC. Zahlt man 0,2 BTC, wird der ganze 1-BTC-Output zerstört und man erhält 0,8 BTC Wechselgeld-UTXO.",
    "exp": "Wer 1 BTC besitzt, hat in Wahrheit einen UTXO im Wert von 1 BTC. Zahlt man 0,2 BTC, wird der ganze 1-BTC-Output zerstört und man erhält 0,8 BTC Wechselgeld-UTXO."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Welche kryptografische Hashfunktion bildet das Herzstück des Bitcoin-Proof-of-Work und der Block-Verkettung?",
    "a": [
      "Doppeltes SHA-256 (SHA-256d)",
      "MD5 mit 128-Bit-Prüfsumme",
      "RSA-4096 mit Primzahlfaktoren",
      "Scrypt mit variabler Speichertiefe"
    ],
    "explanation": "Bitcoin wendet SHA-256 gleich zweimal hintereinander an (SHA-256(SHA-256(Daten))), um gegen Längen-Erweiterungs-Angriffe immun zu sein.",
    "exp": "Bitcoin wendet SHA-256 gleich zweimal hintereinander an (SHA-256(SHA-256(Daten))), um gegen Längen-Erweiterungs-Angriffe immun zu sein."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Wie viele Satoshis stecken rechnerisch in einem einzigen ganzen Bitcoin?",
    "a": [
      "100.000.000 Satoshis (100 Millionen)",
      "1.000.000 Satoshis (1 Million)",
      "1.000.000.000 Satoshis (1 Milliarde)",
      "10.000 Satoshis (10 Tausend)"
    ],
    "explanation": "Jeder Bitcoin ist auf 8 Nachkommastellen teilbar – die kleinste Basiseinheit auf der Blockchain ist ein Satoshi (0,00000001 BTC).",
    "exp": "Jeder Bitcoin ist auf 8 Nachkommastellen teilbar – die kleinste Basiseinheit auf der Blockchain ist ein Satoshi (0,00000001 BTC)."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "Was ist der sogenannte „Mempool“ bei einem Bitcoin-Knotenpunkt (Full Node)?",
    "a": [
      "Der Warteraum im Arbeitsspeicher für gültige, aber noch unbestätigte Transaktionen",
      "Ein gesicherter Speicherbereich für gelöschte Wallet-Passwörter",
      "Die Liste aller Miner, die in den letzten 24 Stunden einen Block gefunden haben",
      "Ein permanentes Archiv aller jemals abgelehnten Spam-Überweisungen"
    ],
    "explanation": "Miner wählen aus dem Mempool bevorzugt Transaktionen mit den höchsten Gebühren pro vByte aus, um sie in den nächsten Block aufzunehmen.",
    "exp": "Der Warteraum im Arbeitsspeicher für gültige, aber noch unbestätigte Transaktionen"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "Was löste das Segregated Witness (SegWit)-Upgrade im Jahr 2017 technisch im Bitcoin-Block aus?",
    "a": [
      "Die Signaturdaten (Witness) wurden vom Transaktionsrumpf getrennt, was Malleability behob und die Blockkapazität effektiv erhöhte",
      "Die maximale Blockgröße wurde fest auf 32 Megabyte angehoben",
      "Es verbot Minern, Transaktionen ohne Angabe einer Ausweisnummer zu verarbeiten",
      "Es ersetzte das Proof-of-Work-Verfahren vollständig durch Proof-of-Stake"
    ],
    "explanation": "SegWit trennte Signaturen ab, führte das Konzept von Block-Weight (4 Millionen Weight Units) ein und schuf das Fundament für das Lightning Network.",
    "exp": "Die Signaturdaten (Witness) wurden vom Transaktionsrumpf getrennt, was Malleability behob und die Blockkapazität effektiv erhöhte"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "pro",
    "q": "Welche Signaturmethode führte das Taproot-Upgrade 2021 ein, die komplexe Multisig-Transaktionen wie einfache Zahlungen aussehen lässt?",
    "a": [
      "Schnorr-Signaturen mit linearer Schlüssel- und Signatur-Aggregation",
      "Ring-Signaturen mit permanent verschleierten Beträgen",
      "Zero-Knowledge-SNARKs mit vertrauenswürdigem Setup",
      "Lamport-Einmalsignaturen auf Basis von Quantengattern"
    ],
    "explanation": "Schnorr-Signaturen ermöglichen MuSig2: Mehrere Parteien erzeugen gemeinsam eine einzige, ununterscheidbare Standardsignatur – das spart Platz und stärkt Privatsphäre.",
    "exp": "Schnorr-Signaturen mit linearer Schlüssel- und Signatur-Aggregation"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "Was bedeutet das Feature „RBF“ (Replace-by-Fee) bei einer im Mempool hängenden Bitcoin-Transaktion?",
    "a": [
      "Man kann eine unbestätigte Überweisung durch dieselbe mit höherer Gebühr ersetzen, um sie zu beschleunigen",
      "Die Transaktionsgebühr wird nach zwei Stunden automatisch von der Miner-Belohnung abgezogen",
      "Miner erstatten zu viel gezahlte Gebühren an die Ausgangsadresse zurück",
      "Das Netzwerk storniert eine versehentlich an die falsche Adresse gesendete Zahlung"
    ],
    "explanation": "Bietet man mehr Gebühr für dieselben Inputs, ersetzen Full Nodes die alte Transaktion im Mempool und Miner bestätigen sie schnell.",
    "exp": "Man kann eine unbestätigte Überweisung durch dieselbe mit höherer Gebühr ersetzen, um sie zu beschleunigen"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "pro",
    "q": "Warum ist die Skriptsprache „Bitcoin Script“ absichtlich nicht Turing-vollständig (keine freien Schleifen)?",
    "a": [
      "Um Endlosschleifen und Denial-of-Service-Angriffe auf validierende Nodes prinzipiell auszuschließen",
      "Weil Satoshi Nakamoto damals keine Programmiererfahrung mit modernen Compilern hatte",
      "Damit alle Transaktionen auf einfachen programmierbaren Taschenrechnern signiert werden können",
      "Um die Ausführung von mathematischen Divisionen im Smart-Contract-Code zu erzwingen"
    ],
    "explanation": "Hätte Bitcoin freie Schleifen (wie Solidity in Ethereum), könnte ein Angreifer eine Endlosschleife senden, die alle weltweiten Nodes einfrieren lässt.",
    "exp": "Um Endlosschleifen und Denial-of-Service-Angriffe auf validierende Nodes prinzipiell auszuschließen"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Wozu dient der „Merkle Tree“ (Hash-Baum) in einem Bitcoin-Block-Header?",
    "a": [
      "Er fasst tausende Transaktionen in einem einzigen kompakten 32-Byte-Root-Hash zusammen",
      "Er speichert die Namen aller beteiligten Miner in alphabetischer Reihenfolge",
      "Er verschlüsselt die Wallet-Adressen für Außenstehende unkenntlich",
      "Er zählt die verbleibenden Tage bis zum nächsten Halving-Ereignis"
    ],
    "explanation": "Dank der Merkle-Root kann ein Smartphone (SPV-Client) mit wenigen Hashes mathematisch beweisen, dass eine Transaktion im Block enthalten ist.",
    "exp": "Er fasst tausende Transaktionen in einem einzigen kompakten 32-Byte-Root-Hash zusammen"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "An welchem Präfix erkennt man eine moderne native SegWit-Adresse (Bech32)?",
    "a": [
      "bc1q...",
      "1...",
      "3...",
      "0x..."
    ],
    "explanation": "bc1q-Adressen sind komplett kleingeschrieben, haben integrierte Fehlerkorrektur (BCH-Code) und sparen gegenüber Legacy-Adressen (Präfix 1) massiv Transaktionsgebühren.",
    "exp": "bc1q..."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "pro",
    "q": "Was ist das Verfahren „CPFP“ (Child Pays for Parent) bei unbestätigten Transaktionen?",
    "a": [
      "Der Empfänger erzeugt eine Folgetransaktion mit hoher Gebühr, sodass Miner beide Blöcke im Paket verarbeiten",
      "Die Bank des Senders bürgt für eventuelle Gebührenausfälle des Empfängers",
      "Ein Mining-Pool spendiert Minustransaktionen für wohltätige Zwecke",
      "Zwei Wallets teilen sich die Transaktionskosten automatisch zu gleichen Teilen"
    ],
    "explanation": "Miner wollen die lukrative Folge-Transaktion (Child) kassieren – das geht aber nur, wenn sie zuvor die feststeckende Eltern-Transaktion (Parent) minen.",
    "exp": "Der Empfänger erzeugt eine Folgetransaktion mit hoher Gebühr, sodass Miner beide Blöcke im Paket verarbeiten"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Welche elliptische Kurve verwendet Bitcoin zur Generierung öffentlicher Schlüssel aus privaten Schlüsseln?",
    "a": [
      "secp256k1",
      "Curve25519",
      "NIST P-256",
      "Ed448-Goldilocks"
    ],
    "explanation": "Satoshi wählte die Koblitz-Kurve secp256k1 – viele Kryptografen vermuten, weil sie im Gegensatz zu NIST-Kurven keine verdächtigen, von der NSA gewählten Konstanten enthält.",
    "exp": "secp256k1"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "Was bedeutet „Transaction Malleability“ (Transaktions-Verformbarkeit), die durch SegWit behoben wurde?",
    "a": [
      "Man konnte die Signatur leicht verändern, wodurch sich die TXID änderte, ohne die Gültigkeit der Zahlung zu zerstören",
      "Angreifer konnten den überwiesenen Bitcoin-Betrag nachträglich im Block verdoppeln",
      "Miner konnten den Ziel-Empfänger durch eine Adress-Spiegelung manipulieren",
      "Transaktionen verloren nach 14 Tagen automatisch ihre kryptografische Bindung"
    ],
    "explanation": "Malleability verhinderte verlässliche Ketten unbestätigter Transaktionen – erst durch die Behebung konnte das Lightning Network sicher realisiert werden.",
    "exp": "Man konnte die Signatur leicht verändern, wodurch sich die TXID änderte, ohne die Gültigkeit der Zahlung zu zerstören"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "pro",
    "q": "Wie viele Byte umfasst der reine Block-Header eines Bitcoin-Blocks exakt?",
    "a": [
      "80 Bytes",
      "32 Bytes",
      "1024 Bytes",
      "256 Bytes"
    ],
    "explanation": "Version (4B) + Hash Vorblock (32B) + Merkle Root (32B) + Timestamp (4B) + Bits/Difficulty (4B) + Nonce (4B) = exakt 80 Bytes.",
    "exp": "80 Bytes"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Was passiert, wenn du versehentlich Bitcoin an eine gültige Adresse sendest, deren privaten Schlüssel niemand auf der Welt besitzt?",
    "a": [
      "Die Bitcoins sind für immer unwiderruflich verloren und können von niemandem bewegt werden",
      "Das Bitcoin-Netzwerk bucht die Coins nach 30 Tagen automatisch auf das Absenderkonto zurück",
      "Die Miner teilen die verwaisten Coins im nächsten Halving unter sich auf",
      "Der Gründer Satoshi Nakamoto schaltet die Coins über einen Master-Key wieder frei"
    ],
    "explanation": "Auf der Blockchain gibt es keinen Kundenservice: Ohne den passenden privaten Schlüssel kann niemand die mathematische Signatur erzeugen.",
    "exp": "Die Bitcoins sind für immer unwiderruflich verloren und können von niemandem bewegt werden"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "Welches Präfix besitzen modernste Taproot-Adressen auf der Bitcoin-Blockchain?",
    "a": [
      "bc1p...",
      "bc1q...",
      "1BTC...",
      "tap1..."
    ],
    "explanation": "bc1p steht für SegWit Version 1 (Taproot) – diese Adressen nutzen 32-Byte Schnorr-Outputs und bieten modernste Privatsphäre und Skalierbarkeit.",
    "exp": "bc1p..."
  },
  {
    "cat": "protokoll_krypto",
    "diff": "pro",
    "q": "Was ermöglicht der Script-Opcode „OP_CHECKLOCKTIMEVERIFY“ (CLTV, BIP65)?",
    "a": [
      "Einen Output bis zu einem bestimmten Block- oder Zeitstempel absolut unbeweglich einzufrieren",
      "Das automatische Verdoppeln von Miner-Gebühren bei hoher Netzwerkauslastung",
      "Die periodische Löschung alter Transaktionsdaten aus der Blockchain",
      "Eine staatliche Notabschaltung bei Feststellung von verdächtigen Überweisungen"
    ],
    "explanation": "CLTV macht es möglich, Auszahlungen mathematisch zu sperren – essenziell für Zeitschlösser, Escrow-Verträge und Zahlungskanäle.",
    "exp": "Einen Output bis zu einem bestimmten Block- oder Zeitstempel absolut unbeweglich einzufrieren"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "easy",
    "q": "Was ist der fundamentale Unterschied zwischen einer „Full Node“ und einem reinen „Miner“?",
    "a": [
      "Full Nodes prüfen und erzwingen alle Konsensregeln unabhängig; Miner erzeugen nur neue Block-Kandidaten",
      "Full Nodes erhalten den Block-Reward, während Miner für Transaktionen Gebühren zahlen",
      "Miner validieren die Blockchain, während Full Nodes nur als Grafik-Benutzeroberfläche dienen",
      "Full Nodes benötigen riesige ASIC-Fabriken, während Miner auf jedem Smartphone laufen"
    ],
    "explanation": "Nicht die Miner bestimmen die Spielregeln von Bitcoin, sondern die zehntausenden unabhängigen Full Nodes weltweit – ungültige Blöcke werden sofort verworfen.",
    "exp": "Full Nodes prüfen und erzwingen alle Konsensregeln unabhängig; Miner erzeugen nur neue Block-Kandidaten"
  },
  {
    "cat": "protokoll_krypto",
    "diff": "mid",
    "q": "Warum beträgt die Ziel-Blockzeit bei Bitcoin im Mittel genau 10 Minuten?",
    "a": [
      "Um globalen Nodes ausreichend Zeit zur fehlerfreien Block-Propagierung zu geben und Chain-Spaltungen zu minimieren",
      "Weil der damalige Internet-Browser von Satoshi Nakamoto 10 Minuten für Seitenaufrufe brauchte",
      "Damit Banküberweisungen im direkten Geschwindigkeitsvergleich immer langsamer sind",
      "Weil die SHA-256-Verschlüsselung physikalisch mindestens 600 Sekunden Rechenzeit pro Durchlauf erzwingt"
    ],
    "explanation": "Wäre die Blockzeit nur 5 Sekunden, würden ständig konkurrierende Blöcke gleichzeitig gefunden – das würde große Mining-Konzerne unfair bevorteilen.",
    "exp": "Um globalen Nodes ausreichend Zeit zur fehlerfreien Block-Propagierung zu geben und Chain-Spaltungen zu minimieren"
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "Wie viele Bitcoins wird es jemals im mathematisch festgelegten Maximum geben?",
    "a": [
      "Exakt knapp 21 Millionen Bitcoins (genau 20.999.999,9769 BTC)",
      "Unbegrenzt viele, da die Menge an das jährliche Weltwirtschaftswachstum gekoppelt ist",
      "Exakt 100 Millionen Bitcoins, verteilt auf alle Staaten der Erde",
      "Exakt 21 Milliarden Bitcoins zur Vermeidung von Kommastellen"
    ],
    "explanation": "Durch die Halbierung der Blockbelohnung alle 210.000 Blöcke summiert sich die geometrische Reihe exakt auf 21 Millionen BTC.",
    "exp": "Exakt knapp 21 Millionen Bitcoins (genau 20.999.999,9769 BTC)"
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "In welchem Intervall findet das legendäre Bitcoin-Halving statt?",
    "a": [
      "Alle 210.000 Blöcke (ca. alle 4 Jahre)",
      "Pünktlich zum 1. Januar jedes Schaltjahres",
      "Sobald die Hashrate der Miner um 50 Prozent einbricht",
      "Alle 1.000 Tage um exakt Mitternacht koordinierter Weltzeit"
    ],
    "explanation": "Das Halving ist nicht an einen Kalender gebunden, sondern an die Blockhöhe: Bei 210.000, 420.000, 630.000, 840.000 Blöcken usw. halbiert sich die Belohnung.",
    "exp": "Alle 210.000 Blöcke (ca. alle 4 Jahre)"
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "Was sucht ein Bitcoin-Miner bei Proof-of-Work eigentlich ganz genau?",
    "a": [
      "Eine Nonce (Zahl), sodass der Hash des Block-Headers kleiner als das vorgegebene Target ist",
      "Die privaten Schlüssel von verlassenen Wallets aus den Anfangsjahren",
      "Komplexe Primzahlenreihen zur Entschlüsselung von Bankensystemen",
      "Eine Lösung für das klassische Problem des Handlungsreisenden"
    ],
    "explanation": "Mining ist wie eine gigantische globale Lotterie: Wer Billionen Zahlen durchprobiert, findet irgendwann einen Hash mit genügend führenden Nullen.",
    "exp": "Eine Nonce (Zahl), sodass der Hash des Block-Headers kleiner als das vorgegebene Target ist"
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Wie oft passt das Bitcoin-Netzwerk die Mining-Schwierigkeit (Difficulty Adjustment) automatisch an?",
    "a": [
      "Alle 2.016 Blöcke (ungefähr alle zwei Wochen)",
      "Nach jedem einzelnen neu geminten Block in Echtzeit",
      "Einmal pro Monat durch manuelle Abstimmung der Entwickler",
      "Einmal jährlich am Jahrestag des Genesis-Blocks"
    ],
    "explanation": "Dauerten die letzten 2.016 Blöcke weniger als zwei Wochen, steigt die Difficulty; dauerten sie länger, sinkt sie – so bleibt der Takt bei ~10 Minuten.",
    "exp": "Alle 2.016 Blöcke (ungefähr alle zwei Wochen)"
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Was passiert mit der Sicherheit von Bitcoin, wenn 80 Prozent aller weltweiten Miner schlagartig ihren Strom abschalten?",
    "a": [
      "Blöcke kommen zunächst langsamer; nach maximal 2.016 Blöcken passt sich die Difficulty an und der 10-Minuten-Takt läuft wie gewohnt weiter",
      "Das Netzwerk stoppt sofort und muss von den Entwicklern per Hand neu gestartet werden",
      "Alle unbestätigten Transaktionen werden sofort gelöscht und Guthaben eingefroren",
      "Die Blockchain spaltet sich automatisch in fünf getrennte regionale Währungen"
    ],
    "explanation": "Genau das geschah im Mai 2021 beim chinesischen Mining-Verbot: Über 50 % der Hashrate fielen aus – das Netzwerk lief unterbrechungsfrei weiter.",
    "exp": "Blöcke kommen zunächst langsamer; nach maximal 2.016 Blöcken passt sich die Difficulty an und der 10-Minuten-Takt läuft wie gewohnt weiter"
  },
  {
    "cat": "mining_konsens",
    "diff": "pro",
    "q": "Warum ist der Begriff „51%-Angriff“ oft missverstanden und was KANN ein Angreifer mit 51% Hashrate NICHT tun?",
    "a": [
      "Er kann niemals fremde Bitcoins stehlen, private Schlüssel knacken oder Konsensregeln (wie das 21M-Limit) ändern",
      "Er kann keine eigenen Transaktionen in der Vergangenheit ungeschehen machen",
      "Er kann nicht verhindern, dass andere Miner überhaupt noch Blöcke finden",
      "Er kann die Netzwerkgebühren nicht für mehr als 24 Stunden erhöhen"
    ],
    "explanation": "Jede Full Node prüft Signaturen und Regeln selbstständig. Ein 51%-Miner kann lediglich eigene Transaktionen reorganisieren (Double Spend) oder Transaktionen zensieren.",
    "exp": "Er kann niemals fremde Bitcoins stehlen, private Schlüssel knacken oder Konsensregeln (wie das 21M-Limit) ändern"
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Woraus setzt sich die Gesamt-Einnahme eines Miners pro gefundenem Block zusammen?",
    "a": [
      "Aus dem festen Block-Reward (Subvention) plus allen Transaktionsgebühren der enthaltenen Zahlungen",
      "Ausschließlich aus Zinszahlungen der Federal Reserve Bank",
      "Aus dem Verkauf der berechneten SHA-256-Hashes an Cloud-Unternehmen",
      "Aus festen monatlichen Mitgliedsbeiträgen der Full-Node-Betreiber"
    ],
    "explanation": "Wenn in Zukunft die Block-Subvention gegen Null geht, finanzieren allein die Transaktionsgebühren die Sicherheit des Mining-Netzwerks.",
    "exp": "Aus dem festen Block-Reward (Subvention) plus allen Transaktionsgebühren der enthaltenen Zahlungen"
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "Was ist ein „ASIC“ im modernen Bitcoin-Mining?",
    "a": [
      "Ein anwendungsspezifischer Mikrochip, der ausschließlich SHA-256-Hashes extrem effizient berechnen kann",
      "Ein internationaler Verband aller großen Krypto-Mining-Gesellschaften",
      "Ein Kühlsystem auf Basis von tiefgekühltem Flüssigstickstoff",
      "Ein Notstromaggregat auf Basis von recyceltem Altspeiseöl"
    ],
    "explanation": "ASIC steht für Application-Specific Integrated Circuit – normale CPUs und GPUs sind im Bitcoin-Mining seit 2013 völlig chancenlos.",
    "exp": "Ein anwendungsspezifischer Mikrochip, der ausschließlich SHA-256-Hashes extrem effizient berechnen kann"
  },
  {
    "cat": "mining_konsens",
    "diff": "pro",
    "q": "Was beschreibt das Phänomen des „Methane Flaring“ beim modernen nachhaltigen Bitcoin-Mining?",
    "a": [
      "Miner nutzen abgefackeltes oder ungenutztes Erdöl-Begleitgas direkt an Bohrlöchern zur Stromerzeugung vor Ort",
      "Miner erzeugen Methangas durch die Erhitzung ihrer ASIC-Kühlflüssigkeiten",
      "Ein Angriffsvektor, der Serverlüfter durch Zuleitung von Gasgemischen sabotiert",
      "Die staatliche Pflicht zur Verbrennung von Altrechnern in Biogasanlagen"
    ],
    "explanation": "Begleitgas, das sonst nutzlos in die Atmosphäre abgefackelt oder entweicht würde, treibt mobile Mining-Container an und reduziert Treibhausgasemissionen.",
    "exp": "Miner nutzen abgefackeltes oder ungenutztes Erdöl-Begleitgas direkt an Bohrlöchern zur Stromerzeugung vor Ort"
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "Wie hoch war die anfängliche Block-Subvention (Reward) im Jahr 2009 beim Start von Bitcoin?",
    "a": [
      "50 BTC pro Block",
      "100 BTC pro Block",
      "21 BTC pro Block",
      "10 BTC pro Block"
    ],
    "explanation": "Von 2009 bis 2012 gab es 50 BTC pro Block, dann 25 BTC, dann 12,5 BTC, dann 6,25 BTC und seit April 2024 sind es noch 3,125 BTC.",
    "exp": "50 BTC pro Block"
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Was ist die erste Transaktion in jedem Bitcoin-Block, in der die neuen Coins erschaffen werden?",
    "a": [
      "Coinbase-Transaktion",
      "Genesis-Transfer",
      "Reward-Distribution",
      "Master-Mint"
    ],
    "explanation": "Die Coinbase-Transaktion hat keine Inputs – hier generiert der Finder des Blocks die Block-Subvention plus alle Gebühren auf seine eigene Adresse.",
    "exp": "Coinbase-Transaktion"
  },
  {
    "cat": "mining_konsens",
    "diff": "pro",
    "q": "Welchen dramatischen Vorteil bringt das neue Mining-Pool-Protokoll „Stratum V2“ für die Dezentralisierung?",
    "a": [
      "Einzelne Miner können ihre eigenen Transaktionsblöcke selbst zusammenstellen, statt dies dem Pool-Betreiber zu überlassen",
      "Es verdoppelt die Rechenleistung älterer Antminer-Geräte per Software-Übertaktung",
      "Es erlaubt das Minen ohne jegliche Internetverbindung über Ultrakurzwellen-Funk",
      "Es überweist die Mining-Erlöse direkt auf ein privates Bankkonto in Euro"
    ],
    "explanation": "Bisher bestimmen Pool-Betreiber, welche Transaktionen gemint werden – Stratum V2 gibt diese Macht zurück an die tausenden einzelnen Miner.",
    "exp": "Einzelne Miner können ihre eigenen Transaktionsblöcke selbst zusammenstellen, statt dies dem Pool-Betreiber zu überlassen"
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "In welchem Jahr wird voraussichtlich der allerletzte Satoshi gemint werden?",
    "a": [
      "Um das Jahr 2140",
      "Bereits im Jahr 2032",
      "Um das Jahr 2088",
      "Genau im Jahr 3000"
    ],
    "explanation": "Wegen der 32 Halvings wird der letzte Bruchteil eines Bitcoins ca. 2140 geschöpft – danach speisen sich Miner-Einnahmen zu 100 % aus Transaktionsgebühren.",
    "exp": "Um das Jahr 2140"
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Was bedeutet der Begriff „Hashrate“ im Bitcoin-Netzwerk?",
    "a": [
      "Die geschätzte Anzahl der SHA-256-Rechenoperationen, die alle Miner weltweit pro Sekunde ausführen",
      "Die durchschnittliche Dauer für die Verifizierung eines Personalausweises an Krypto-Börsen",
      "Der prozentuale Anteil an verloren gegangenen Bitcoins seit dem Genesis-Block",
      "Die Übertragungsgeschwindigkeit von Transaktionsdaten im Glasfasernetz"
    ],
    "explanation": "Die Hashrate liegt heute bei über 600 Exahashes pro Sekunde – das sind 600 Trillionen Berechnungen jede einzelne Sekunde weltweit.",
    "exp": "Die geschätzte Anzahl der SHA-256-Rechenoperationen, die alle Miner weltweit pro Sekunde ausführen"
  },
  {
    "cat": "mining_konsens",
    "diff": "pro",
    "q": "Warum führt eine Halbierung der Hashrate nicht zu einer Halbierung der Bitcoinerzeugung auf Dauer?",
    "a": [
      "Weil die automatische Difficulty Adjustment die Rechenhürde senkt, sodass Blöcke wieder verlässlich alle 10 Minuten entstehen",
      "Weil die verbleibenden Miner gesetzlich verpflichtet sind, Überstunden zu leisten",
      "Weil Satoshi Nakamoto fehlende Blöcke automatisch durch Reserveblöcke auffüllt",
      "Weil die Blockgröße bei weniger Minern automatisch verdoppelt wird"
    ],
    "explanation": "Das mathematische Regelwerk passt sich stets an: Egal wie viel oder wenig Rechenleistung existiert, das Angebot an neuen BTC bleibt exakt nach Plan.",
    "exp": "Weil die automatische Difficulty Adjustment die Rechenhürde senkt, sodass Blöcke wieder verlässlich alle 10 Minuten entstehen"
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Was ist ein „Orphan Block“ (verwaister Block) in der Bitcoin-Blockchain?",
    "a": [
      "Ein gültiger Block, der fast zeitgleich mit einem anderen gefunden wurde, dessen Kette sich aber letztlich nicht als längste durchsetzte",
      "Ein Block, der von Minern unter 18 Jahren ohne Elterneinwilligung gemint wurde",
      "Ein Block mit gefälschten Transaktionsgebühren, der von der Polizei beschlagnahmt wurde",
      "Ein Block, der ausschließlich Transaktionen ohne Empfängeradresse enthält"
    ],
    "explanation": "Finden zwei Miner gleichzeitig einen Block, spaltet sich die Kette kurz – sobald der nächste Block gefunden wird, gewinnt die längere Kette und der andere wird verworfen.",
    "exp": "Ein gültiger Block, der fast zeitgleich mit einem anderen gefunden wurde, dessen Kette sich aber letztlich nicht als längste durchsetzte"
  },
  {
    "cat": "mining_konsens",
    "diff": "easy",
    "q": "Warum wird Bitcoin-Mining oft als „Käufer der letzten Instanz“ für erneuerbare Energien bezeichnet?",
    "a": [
      "Weil Miner ortsunabhängig überschüssigen Strom abnehmen können, der sonst wegen Netzengpässen abgeregelt würde",
      "Weil Miner gesetzlich verpflichtet sind, Solaranlagen auf Firmengebäuden zu finanzieren",
      "Weil Mining-ASICs als Heizkörper für staatliche Hallenbäder vorgeschrieben sind",
      "Weil Ökostrom-Zertifikate direkt in Bitcoin-Transaktionen eingedruckt werden"
    ],
    "explanation": "Wind- und Wasserkraftwerke an entlegenen Orten können Strom nicht immer transportieren – Bitcoin-Miner wandeln diese sonst verlorene Energie in ökonomischen Wert um.",
    "exp": "Weil Miner ortsunabhängig überschüssigen Strom abnehmen können, der sonst wegen Netzengpässen abgeregelt würde"
  },
  {
    "cat": "mining_konsens",
    "diff": "pro",
    "q": "Was passiert, wenn ein böswilliger Miner versucht, sich in der Coinbase-Transaktion 10 statt 3,125 Bitcoins auszuzahlen?",
    "a": [
      "Jede einzelne unabhängige Full Node weltweit verwirft den gesamten Block augenblicklich als ungültig – der Miner verbrennt Strom umsonst",
      "Der Block wird akzeptiert, aber der Miner erhält eine Geldstrafe von 50 Prozent seiner Gebühren",
      "Das Netzwerk teilt die überzähligen Bitcoins gleichmäßig unter allen Benutzern auf",
      "Die Transaktion wird für 14 Tage zur manuellen Überprüfung an Krypto-Börsen weitergeleitet"
    ],
    "explanation": "Konsensregeln sind absolut kompromisslos: Selbst wenn 99 % der Miner einen falschen Block unterstützen würden, wirft ihn jede Node sofort in den Papierkorb.",
    "exp": "Jede einzelne unabhängige Full Node weltweit verwirft den gesamten Block augenblicklich als ungültig – der Miner verbrennt Strom umsonst"
  },
  {
    "cat": "mining_konsens",
    "diff": "mid",
    "q": "Warum verbraucht das Bitcoin-Mining physikalisch überhaupt so viel Strom?",
    "a": [
      "Weil thermodynamische Arbeit (Energieeinsatz) die Verankerung in der physischen Realität schafft und Manipulationen unbezahlbar teuer macht",
      "Weil die Computerprogramme absichtlich mit ineffizienten Wartezeiten programmiert wurden",
      "Weil die Server permanente Hochfrequenz-Radiowellen in den Weltraum senden",
      "Um die weltweite Produktion von Siliziumchips künstlich anzukurbeln"
    ],
    "explanation": "PoW verbindet Information mit Thermodynamik: Wer die Vergangenheit umschreiben will, müsste mehr Energie aufwenden als das gesamte ehrliche Netzwerk zusammen.",
    "exp": "Weil thermodynamische Arbeit (Energieeinsatz) die Verankerung in der physischen Realität schafft und Manipulationen unbezahlbar teuer macht"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Was ist das Lightning Network im Verhältnis zur Bitcoin-Haupt-Blockchain?",
    "a": [
      "Ein dezentrales Layer-2-Netzwerk für sekundenschnelle, spottbillige Zahlungen außerhalb der Blockchain (Off-Chain)",
      "Eine neue Kryptowährung, die Bitcoin in Zukunft vollständig ablösen soll",
      "Ein zentraler Zahlungsdienstleister im Besitz des US-Finanzministeriums",
      "Ein Cloud-Backup-Dienst zur Speicherung von verschlüsselten Passwörtern"
    ],
    "explanation": "Im Lightning Network können Millionen Transaktionen pro Sekunde abgewickelt werden, während die Basisschicht nur zum Öffnen und Schließen von Kanälen dient.",
    "exp": "Ein dezentrales Layer-2-Netzwerk für sekundenschnelle, spottbillige Zahlungen außerhalb der Blockchain (Off-Chain)"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Was stellen die berühmten 12 oder 24 Wörter einer Seed-Phrase (BIP-39) dar?",
    "a": [
      "Eine für Menschen lesbare Codierung des kryptografischen Master-Private-Keys für alle Adressen der Wallet",
      "Ein Passwort, das bei einem zentralen Serverbetreiber per E-Mail hinterlegt ist",
      "Eine Liste von Freunden, die im Notfall den Zugriff auf die Wallet freigeben können",
      "Zufällige Wörter, die bei jeder Transaktion als Bestätigungscode eingegeben werden müssen"
    ],
    "explanation": "Aus diesen 12 oder 24 Wörtern aus der standardisierten BIP-39-Wortliste (2.048 Wörter) lassen sich mathematisch unendlich viele Adressen und Schlüssel ableiten.",
    "exp": "Eine für Menschen lesbare Codierung des kryptografischen Master-Private-Keys für alle Adressen der Wallet"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Was ist das kryptografische Kernkonstrukt, das Zahlungen über mehrere Stationen im Lightning Network sicher macht?",
    "a": [
      "HTLC (Hash Time Locked Contract)",
      "Zk-Rollup Smart Account",
      "Atomic Swapped Token",
      "Proof of Authority Vault"
    ],
    "explanation": "Ein HTLC garantiert: Entweder wird das Geheimnis (Preimage) rechtzeitig vorgelegt und das Geld fließt, oder beide Parteien erhalten ihr Guthaben automatisch zurück.",
    "exp": "HTLC (Hash Time Locked Contract)"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Was bewirkt die optionale „Passphrase“ (oft als 25. Wort bezeichnet) bei einem BIP-39-Backup?",
    "a": [
      "Sie generiert eine komplett eigenständige, neue Wallet und schützt vor Erpressung („Plausible Deniability“)",
      "Sie sperrt die Wallet für exakt 25 Tage nach fehlerhafter PIN-Eingabe",
      "Sie übermittelt die Transaktionsdaten automatisch an das zuständige Finanzamt",
      "Sie halbiert die erforderliche Anzahl an Wörtern auf dem Notizblatt"
    ],
    "explanation": "Jede unterschiedliche Passphrase öffnet eine völlig neue Kette von Adressen – ein Angreifer kann nicht feststellen, ob noch eine weitere geheime Wallet existiert.",
    "exp": "Sie generiert eine komplett eigenständige, neue Wallet und schützt vor Erpressung („Plausible Deniability“)"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "pro",
    "q": "Was ist die Aufgabe eines „Watchtowers“ im Lightning Network?",
    "a": [
      "Er überwacht die Blockchain auf alte Kanalzustände und bestraft unehrliche Partner mit dem Verlust ihres gesamten Einsatzes",
      "Er sendet Werbe-Pings an andere Nodes zur Steigerung der Kanalgebühren",
      "Er wandelt Satoshis bei starkem Kursverfall automatisch in Stablecoins um",
      "Er misst die Temperatur der Hardware-Wallets und alarmiert die Feuerwehr"
    ],
    "explanation": "Versucht ein Partner einen alten Kanalstand auf der Kette zu veröffentlichen, greift der Watchtower mit der Revocation-Transaktion ein und straft ihn rigoros ab.",
    "exp": "Er überwacht die Blockchain auf alte Kanalzustände und bestraft unehrliche Partner mit dem Verlust ihres gesamten Einsatzes"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Was bedeutet das Motto: „Not your keys, not your coins“ in der Bitcoin-Community?",
    "a": [
      "Wer seine privaten Schlüssel Börsen oder Dritten überlässt, besitzt nur ein unsicheres Schuldversprechen statt echtem Bitcoin",
      "Man darf Bitcoins nur auf Geräten mit mindestens zwei mechanischen Schlüsseln lagern",
      "Jeder Nutzer muss seinen kryptografischen Schlüssel beim Einwohnermeldeamt registrieren",
      "Verlorene Passwörter können gegen Vorlage des Personalausweises zurückgesetzt werden"
    ],
    "explanation": "Zusammenbrüche wie Mt. Gox oder FTX bewiesen: Nur wer seine Schlüssel (Non-Custodial) selbst verwahrt, ist vor Veruntreuung und Pleiten geschützt.",
    "exp": "Wer seine privaten Schlüssel Börsen oder Dritten überlässt, besitzt nur ein unsicheres Schuldversprechen statt echtem Bitcoin"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Was ist eine „Multisig-Wallet“ (z. B. 2-von-3) und welchen Sicherheitsgewinn bringt sie?",
    "a": [
      "Mindestens 2 von 3 separaten Schlüsseln müssen signieren, um eine Transaktion auszulösen – kein Einzelfehler führt zu Verlust",
      "Man muss jede Überweisung dreimal hintereinander mit demselben Passwort bestätigen",
      "Drei verschiedene Banken müssen der Transaktion vorab per Fax zustimmen",
      "Die Transaktion wird gleichzeitig an drei verschiedene Empfänger versendet"
    ],
    "explanation": "Geht ein Schlüssel verloren oder wird gestohlen, bleibt das Geld sicher – Multisig ist der Goldstandard für Firmen und große private Vermögen.",
    "exp": "Mindestens 2 von 3 separaten Schlüsseln müssen signieren, um eine Transaktion auszulösen – kein Einzelfehler führt zu Verlust"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "pro",
    "q": "Was ist der Vorteil von „PSBT“ (Partially Signed Bitcoin Transactions, BIP174)?",
    "a": [
      "Transaktionen können offline auf Air-Gapped-Hardware signiert und zwischen mehreren Geräten gefahrlos ausgetauscht werden",
      "Miner können unvollständige Transaktionen erraten und die Lücken selbst füllen",
      "Man kann halbe Bitcoins ohne Zahlung von Netzwerkgebühren transferieren",
      "Es erlaubt das Signieren von Zahlungen mit rein biometrischen Fingerabdrücken"
    ],
    "explanation": "PSBT trennt das Vorbereiten, Koordinieren und Signieren – die Hardware-Wallet berührt niemals das Internet und signiert sicher per QR-Code oder SD-Karte.",
    "exp": "Transaktionen können offline auf Air-Gapped-Hardware signiert und zwischen mehreren Geräten gefahrlos ausgetauscht werden"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Was zeichnet eine echte „Hardware-Wallet“ (wie BitBox02, Trezor oder Coldcard) im Vergleich zu einer Handy-App aus?",
    "a": [
      "Der private Schlüssel verlässt niemals den geschützten, isolierten Sicherheitschip des Geräts",
      "Sie benötigt keine Stromversorgung und funktioniert rein über Magnetfelder",
      "Sie speichert die gesamte 600-GB-Blockchain auf einem internen Mini-Laufwerk",
      "Sie erstattet gestohlene Coins über eine eingebaute Versicherungs-Police"
    ],
    "explanation": "Selbst wenn der verbundene Computer voller Viren und Trojaner ist, kann der Angreifer den privaten Schlüssel nicht auslesen.",
    "exp": "Der private Schlüssel verlässt niemals den geschützten, isolierten Sicherheitschip des Geräts"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Was beschreibt das neue Lightning-Spezifikationsprotokoll „BOLT-12“ (Offers)?",
    "a": [
      "Wiederverwendbare, statische Zahlungsanfragen und native Abonnements ohne jedes Mal eine neue Rechnung generieren zu müssen",
      "Die Erhöhung der maximalen Kanalkapazität auf über 100 Millionen US-Dollar",
      "Das automatische Schließen von Kanälen nach 24 Stunden Inaktivität",
      "Ein Notfall-Protokoll zur Rückabwicklung von Fehlüberweisungen"
    ],
    "explanation": "Klassische BOLT-11-Rechnungen waren Einweg-Invoices – BOLT-12 ermöglicht Spenden-QR-Codes, die dauerhaft gültig sind, und automatische Rechnungsstellung.",
    "exp": "Wiederverwendbare, statische Zahlungsanfragen und native Abonnements ohne jedes Mal eine neue Rechnung generieren zu müssen"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "pro",
    "q": "Was ist das Problem des „Inbound Liquidity“ beim Betreiben einer eigenen neuen Lightning-Routing-Node?",
    "a": [
      "Man kann erst Zahlungen empfangen, wenn andere Teilnehmer ihrerseits Kanäle zu einem öffnen oder man Guthaben ausgibt",
      "Die Festplatte läuft voll, weil alle Rechnungen weltweit lokal gespeichert werden müssen",
      "Der Internetanbieter drosselt die Bandbreite wegen zu vieler gleichzeitiger Pings",
      "Die Node verliert pro Tag automatisch ein Prozent ihres Kapitals an Miner"
    ],
    "explanation": "Um empfangen zu können, müssen Satoshis auf der Gegenseite des Kanals liegen. Fehlt Gegenstellen-Guthaben, können Zahlungen nicht zu einem geroutet werden.",
    "exp": "Man kann erst Zahlungen empfangen, wenn andere Teilnehmer ihrerseits Kanäle zu einem öffnen oder man Guthaben ausgibt"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Was bedeutet der Begriff „Cold Storage“ bei der Aufbewahrung von Kryptowerten?",
    "a": [
      "Die privaten Schlüssel werden vollkommen offline auf Medien aufbewahrt, die niemals mit dem Internet verbunden sind",
      "Die Wallets werden in speziellen Tiefkühltruhen bei minus 18 Grad gelagert",
      "Das Einfrieren von Benutzerkonten durch gerichtliche Beschlüsse",
      "Das Abspeichern von Transaktionsdaten auf magnetischen Tonbändern im Banktresor"
    ],
    "explanation": "Hardware-Wallets, Paper-Wallets oder Metallplatten, die keinen Internetkontakt haben, sind vor Online-Hacking absolut sicher.",
    "exp": "Die privaten Schlüssel werden vollkommen offline auf Medien aufbewahrt, die niemals mit dem Internet verbunden sind"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Warum stanzen erfahrene Bitcoiner ihre 12 oder 24 Seed-Wörter oft in Edelstahl- oder Titanplatten?",
    "a": [
      "Um das Backup gegen Hausbrände, Löschwasser, Säure und physische Zerstörung unzerstörbar zu machen",
      "Weil Papier gesetzlich für Finanz-Backups verboten ist",
      "Damit Metalldetektoren am Flughafen das Backup sofort erkennen können",
      "Um elektromagnetische Strahlung von Mobilfunkmasten abzuschirmen"
    ],
    "explanation": "Papier verbrennt bei 230 °C und löst sich in Wasser auf – Edelstahl widersteht über 1.400 °C Hitze bei einem Wohnungsbrand mühelos.",
    "exp": "Um das Backup gegen Hausbrände, Löschwasser, Säure und physische Zerstörung unzerstörbar zu machen"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "pro",
    "q": "Was ist der Unterschied zwischen einer „Federated Sidechain“ (wie Liquid) und dem Lightning Network?",
    "a": [
      "Liquid ist eine eigenständige Blockchain mit Zwischenverwahrung durch Funktionäre; Lightning arbeitet ohne eigene Token direkt mit echtem BTC",
      "Liquid funktioniert ohne Kryptografie, während Lightning Quantencomputer nutzt",
      "Lightning speichert alle Daten auf Google-Servern, Liquid auf Apple-Servern",
      "Liquid erlaubt nur Zahlungen an staatliche Institutionen"
    ],
    "explanation": "Auf Sidechains werden Bitcoins eingesperrt (Peg-in) und als Stellvertreter-Token bewegt – Lightning bewegt echte native UTXOs in Zahlungskanälen.",
    "exp": "Liquid ist eine eigenständige Blockchain mit Zwischenverwahrung durch Funktionäre; Lightning arbeitet ohne eigene Token direkt mit echtem BTC"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Wie viele Transaktionen pro Sekunde (TPS) schafft die Bitcoin-Basisschicht (Layer 1) theoretisch maximal?",
    "a": [
      "Rund 7 bis 10 Transaktionen pro Sekunde",
      "Rund 24.000 Transaktionen pro Sekunde",
      "Genau 1 Transaktion pro Minute",
      "Unbegrenzt viele Transaktionen pro Sekunde"
    ],
    "explanation": "Wegen der Blockgröße von ~1-2 MB und 10 Minuten Blockzeit ist Layer 1 bewusst als unveränderliches, globales Abrechnungsnetzwerk (Settlement Layer) konzipiert.",
    "exp": "Rund 7 bis 10 Transaktionen pro Sekunde"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Was geschieht beim „Closing“ (Schließen) eines Lightning-Zahlungskanals?",
    "a": [
      "Der finale Abrechnungsstand der Guthaben wird in einer einzigen On-Chain-Transaktion auf der Blockchain festgeschrieben",
      "Alle getätigten Zahlungen werden einzeln nacheinander auf der Blockchain nachgetragen",
      "Das gesamte Kanalkapital wird automatisch an die Miner als Gebühr überwiesen",
      "Die beteiligten Wallets werden dauerhaft deaktiviert und können nicht mehr genutzt werden"
    ],
    "explanation": "Tausende Zahlungen liefen blitzschnell off-chain ab – nur Start (Open) und Ende (Close) hinterlassen jeweils exakt eine Spur auf der Bitcoin-Blockchain.",
    "exp": "Der finale Abrechnungsstand der Guthaben wird in einer einzigen On-Chain-Transaktion auf der Blockchain festgeschrieben"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "pro",
    "q": "Was ist das Prinzip des „Onion Routings“ bei Lightning-Zahlungen?",
    "a": [
      "Jeder Zwischenknoten kennt nur seinen direkten Vorgänger und Nachfolger, nicht aber Sender oder finalen Empfänger",
      "Zahlungen werden in sieben gleiche Teile gespalten und wie Zwiebelschalen gestapelt",
      "Zahlungen können nur über das Tor-Netzwerk im Darknet versendet werden",
      "Die Transaktionsgebühren steigen mit jedem Hop schalenweise um 10 Prozent"
    ],
    "explanation": "Wie bei Tor ist das Zahlungspaket mehrfach verschlüsselt: Jeder Knoten schält nur seine eigene Schicht ab und leitet das Paket weiter – maximale Privatsphäre.",
    "exp": "Jeder Zwischenknoten kennt nur seinen direkten Vorgänger und Nachfolger, nicht aber Sender oder finalen Empfänger"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "easy",
    "q": "Was passiert, wenn du deine Hardware-Wallet verlierst oder sie ins Wasser fällt?",
    "a": [
      "Gar nichts Schlimmes – du kaufst ein neues Gerät und stellst mit deinen 12/24 Seed-Wörtern alle Bitcoins wieder her",
      "Deine Bitcoins sind für immer im Meer versunken",
      "Du musst eine Verlustanzeige bei der Bundesanstalt für Finanzdienstleistungsaufsicht stellen",
      "Der Finder des Geräts kann ohne PIN sofort dein ganzes Geld abheben"
    ],
    "explanation": "Bitcoins liegen niemals auf der Hardware-Wallet selbst, sondern auf der weltweiten Blockchain. Das Gerät speichert nur den Schlüssel zur Autorisierung.",
    "exp": "Gar nichts Schlimmes – du kaufst ein neues Gerät und stellst mit deinen 12/24 Seed-Wörtern alle Bitcoins wieder her"
  },
  {
    "cat": "layer2_skalierung",
    "diff": "mid",
    "q": "Was versteht man unter dem Begriff „Dust Limit“ im Bitcoin-Protokoll?",
    "a": [
      "Ein Schwellenwert für winzige Beträge, deren Ausgabe mehr Gebühren kosten würde als sie wert sind",
      "Die maximale Menge an Kerosinstaub in unterirdischen Serverzentren",
      "Ein Grenzwert für veraltete Transaktionen, die nach 3 Tagen automatisch gelöscht werden",
      "Die Mindestgebühr für Transaktionen mit mehr als fünfzehn Empfängern"
    ],
    "explanation": "Um zu verhindern, dass die UTXO-Datenbank aller Nodes mit unwirtschaftlichem Müll zugemüllt wird, lehnen Nodes Transaktionen unter dem Dust Limit (~546 Satoshis) ab.",
    "exp": "Ein Schwellenwert für winzige Beträge, deren Ausgabe mehr Gebühren kosten würde als sie wert sind"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Welche historische Schlagzeile bettete Satoshi Nakamoto am 3. Januar 2009 in den Genesis-Block von Bitcoin ein?",
    "a": [
      "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks",
      "Wall Street Journal: Lehman Brothers files for biggest bankruptcy in history",
      "New York Times: President Obama announces trillion-dollar stimulus package",
      "Financial Times: Gold reaches all-time high amid global currency crisis"
    ],
    "explanation": "Satoshi bewies damit nicht nur das exakte Startdatum, sondern hinterließ einen dauerhaften Protest gegen das unbegrenzte Gelddrucken und Bankenrettungen.",
    "exp": "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Was kaufte der Programmierer Laszlo Hanyecz am 22. Mai 2010 für 10.000 Bitcoins (der berühmte Bitcoin Pizza Day)?",
    "a": [
      "Zwei Pizzen von Papa John’s, geliefert von einem Forenmitglied",
      "Einen gebrauchten Sportwagen der Marke Toyota Supra",
      "Zehn Kisten Champagner für eine Krypto-Entwicklerparty",
      "Den ersten ASIC-Mining-Prozessor aus einem chinesischen Labor"
    ],
    "explanation": "Es war die allererste dokumentierte kommerzielle Warentransaktion mit Bitcoin – damals waren 10.000 BTC rund 41 US-Dollar wert.",
    "exp": "Zwei Pizzen von Papa John’s, geliefert von einem Forenmitglied"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Wie werden Gewinne aus dem Verkauf von privat gehaltenem Bitcoin in Deutschland steuerlich nach § 23 EStG behandelt?",
    "a": [
      "Nach einer Haltedauer von mindestens einem Jahr sind Kursgewinne zu 100 Prozent völlig steuerfrei",
      "Es gilt immer eine pauschale Abgeltungssteuer von 25 Prozent plus Solidaritätszuschlag",
      "Verkäufe sind grundsätzlich illegal und werden mit Einzug der Coins bestraft",
      "Gewinne müssen unabhängig von der Haltedauer immer mit 42 Prozent versteuert werden"
    ],
    "explanation": "In Deutschland gilt Bitcoin steuerlich als privates Wirtschaftsgut (wie Gold oder Kunst) – wer mindestens 365 Tage hodlt, zahlt keinen einzigen Cent Steuer.",
    "exp": "Nach einer Haltedauer von mindestens einem Jahr sind Kursgewinne zu 100 Prozent völlig steuerfrei"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "mid",
    "q": "Welcher renommierte Krypto-Pionier erhielt im Januar 2009 die allererste Bitcoin-Transaktion (10 BTC) von Satoshi Nakamoto persönlich?",
    "a": [
      "Hal Finney",
      "Nick Szabo",
      "Adam Back",
      "Wei Dai"
    ],
    "explanation": "Hal Finney twitterte legendär am 11. Januar 2009 „Running bitcoin“ und half Satoshi beim Testen und Debuggen des ersten Quellcodes.",
    "exp": "Hal Finney"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "mid",
    "q": "Worum ging es im dramatischen „Blocksize War“ zwischen 2015 und 2017 in der Bitcoin-Community?",
    "a": [
      "Großkonzerne und Miner wollten riesige Blöcke erzwingen; die Community verteidigte kleine Blöcke zur Erhaltung privater Full Nodes",
      "Ein Streit zwischen Entwicklern über die Einführung von Werbebannern in Transaktionen",
      "Ein Rechtsstreit vor dem US Supreme Court über das Urheberrecht am Bitcoin-Logo",
      "Der Versuch der europäischen Union, die Blockzeit von 10 auf 60 Minuten zu verlängern"
    ],
    "explanation": "Wären Blöcke gigantisch groß, könnten nur noch Großrechenzentren Nodes betreiben – Bitcoin hätte seine zensurresistente Dezentralisierung verloren.",
    "exp": "Großkonzerne und Miner wollten riesige Blöcke erzwingen; die Community verteidigte kleine Blöcke zur Erhaltung privater Full Nodes"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "pro",
    "q": "Was besagt der ökonomische „Cantillon-Effekt“ und warum löst Bitcoin dieses Problem?",
    "a": [
      "Wer neu gedrucktes Geld zuerst erhält (Staaten, Großbanken), profitiert auf Kosten jener, zu denen das Geld erst nach Preisanstiegen sickert",
      "Währungen mit festem Angebot führen zwingend zu Massenarbeitslosigkeit und Firmenpleiten",
      "Der Goldpreis sinkt immer dann, wenn Zentralbanken die Leitzinsen unter Null senken",
      "Je mehr Münzen geprägt werden, desto höher wird der Silberanteil in Umlaufmünzen"
    ],
    "explanation": "Richard Cantillon erkannte 1755: Fiat-Geldumverteilung bereichert die Elite nah an der Druckerpresse. Bei Bitcoin kann niemand neues Geld bevorzugt aus dem Nichts schöpfen.",
    "exp": "Wer neu gedrucktes Geld zuerst erhält (Staaten, Großbanken), profitiert auf Kosten jener, zu denen das Geld erst nach Preisanstiegen sickert"
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
    "exp": "El Salvador"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "mid",
    "q": "Welches bahnbrechende Konzept erfand Adam Back 1997, das Satoshi Nakamoto direkt in Bitcoin als PoW übernahm?",
    "a": [
      "Hashcash (ursprünglich zur Bekämpfung von E-Mail-Spam erfunden)",
      "B-Money für dezentrale Verträge",
      "Bit Gold mit Quorums-Konsens",
      "DigiCash mit blinden Signaturen"
    ],
    "explanation": "Hashcash verlangte vom E-Mail-Absender den Nachweis einer kleinen Rechenleistung – Satoshi zitierte Backs Paper direkt im Bitcoin-Whitepaper.",
    "exp": "Hashcash (ursprünglich zur Bekämpfung von E-Mail-Spam erfunden)"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "pro",
    "q": "Welcher Meilenstein der Finanzgeschichte ereignete sich im Januar 2024 an den US-Börsen?",
    "a": [
      "Die US-Börsenaufsicht SEC genehmigte erstmals 11 physisch gedeckte Bitcoin-Spot-ETFs (u. a. BlackRock und Fidelity)",
      "Die Federal Reserve kaufte 100.000 Bitcoins als offizielle Währungsreserve",
      "Der Handel mit Kryptowährungen an der Wall Street wurde vollständig verboten",
      "Die New York Stock Exchange stellte ihr gesamtes Abrechnungssystem auf Bitcoin um"
    ],
    "explanation": "Der BlackRock iShares Bitcoin Trust (IBIT) wurde zum am schnellsten wachsenden ETF der gesamten Wall-Street-Geschichte.",
    "exp": "Die US-Börsenaufsicht SEC genehmigte erstmals 11 physisch gedeckte Bitcoin-Spot-ETFs (u. a. BlackRock und Fidelity)"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Wann verfasste Satoshi Nakamoto seine letzte bekannte Nachricht im Bitcointalk-Forum, bevor er für immer verschwand?",
    "a": [
      "Dezember 2010",
      "Oktober 2008",
      "Mai 2015",
      "Januar 2020"
    ],
    "explanation": "Am 12. Dezember 2010 postete Satoshi über Software-Verbesserungen gegen DoS-Angriffe. Im April 2011 schrieb er Mike Hearn: „I’ve moved on to other things.“",
    "exp": "Dezember 2010"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "mid",
    "q": "Welche berüchtigte Darknet-Plattform wurde 2013 vom FBI geschlossen und brachte Bitcoin erstmals breite Medienpräsenz?",
    "a": [
      "Silk Road (gegründet von Ross Ulbricht als „Dread Pirate Roberts“)",
      "AlphaBay Marketplace",
      "Napster Underground",
      "The Pirate Bay Crypto"
    ],
    "explanation": "Silk Road bewies einerseits die Funktionsfähigkeit zensurresistenter Zahlungen, prägte aber jahrelang das falsche Vorurteil, Bitcoin sei rein für Kriminelle.",
    "exp": "Silk Road (gegründet von Ross Ulbricht als „Dread Pirate Roberts“)"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "pro",
    "q": "Was war der Auslöser für den dramatischen Zusammenbruch der Krypto-Börse Mt. Gox im Februar 2014?",
    "a": [
      "Über Jahre hinweg wurden unbemerkt rund 850.000 Bitcoins aus Hot-Wallets entwendet",
      "Ein Brand im Serverraum der Zentrale in Tokio vernichtete alle Festplatten",
      "Die japanische Notenbank beschlagnahmte die Konten wegen illegaler Devisengeschäfte",
      "Der Gründer verlor die Passwörter bei einem Tauchunfall im Pazifik"
    ],
    "explanation": "Mt. Gox wickelte damals über 70 Prozent des weltweiten Bitcoin-Handels ab – die Pleite löste einen mehrjährigen Bärenmarkt aus.",
    "exp": "Über Jahre hinweg wurden unbemerkt rund 850.000 Bitcoins aus Hot-Wallets entwendet"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Was bedeutet der Begriff „Stock-to-Flow-Verhältnis“ bei einem knappen Gut wie Gold oder Bitcoin?",
    "a": [
      "Das Verhältnis des vorhandenen Bestands (Stock) zur jährlichen Neuproduktion (Flow)",
      "Die tägliche Anzahl an Aktien, die an den großen Wertpapierbörsen gehandelt werden",
      "Die Menge an Kerosin, die für den weltweiten Transport von Münzgeld nötig ist",
      "Die Gewinnmarge von Minern nach Abzug aller laufenden Strom- und Betriebskosten"
    ],
    "explanation": "Je höher das Stock-to-Flow-Verhältnis, desto härter das Geld – seit dem Halving 2024 hat Bitcoin ein höheres Stock-to-Flow-Verhältnis als Gold.",
    "exp": "Das Verhältnis des vorhandenen Bestands (Stock) zur jährlichen Neuproduktion (Flow)"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "mid",
    "q": "Welche Bewegung von Programmierern in den 1990ern forderte starke Kryptografie zum Schutz der Privatsphäre („Cypherpunks write code“)?",
    "a": [
      "Die Cypherpunks (um Eric Hughes, Timothy May und John Gilmore)",
      "Die Silicon Valley Pioneers League",
      "Der Chaos Computer Club New York",
      "Die Open Source Hardware Alliance"
    ],
    "explanation": "Aus ihrer Mailingliste, auf der auch Hal Finney, Nick Szabo und Adam Back aktiv waren, entsprang 2008 das Bitcoin-Whitepaper.",
    "exp": "Die Cypherpunks (um Eric Hughes, Timothy May und John Gilmore)"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "pro",
    "q": "Was geschah bei der berüchtigten Hard Fork von „Bitcoin Cash“ (BCH) am 1. August 2017?",
    "a": [
      "Befürworter großer Blöcke spalteten sich ab; alle bisherigen Bitcoin-Besitzer erhielten automatisch exakt dieselbe Menge BCH geschenkt",
      "Alle existierenden Bitcoins wurden auf einen Schlag entwertet und durch BCH ersetzt",
      "Die Europäische Zentralbank übernahm die technische Aufsicht über das neue Netzwerk",
      "Miner mussten ihre bestehenden ASIC-Geräte verschrotten und neue Hardware kaufen"
    ],
    "explanation": "Weil Bitcoin Cash die Historie kopierte, besaß jeder Wallet-Inhaber plötzlich beide Coins – der Markt entschied sich jedoch eindeutig für das Original (BTC).",
    "exp": "Befürworter großer Blöcke spalteten sich ab; alle bisherigen Bitcoin-Besitzer erhielten automatisch exakt dieselbe Menge BCH geschenkt"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "easy",
    "q": "Unter welchem Pseudonym veröffentlichte der unbekannte Schöpfer von Bitcoin am 31. Oktober 2008 das Whitepaper?",
    "a": [
      "Satoshi Nakamoto",
      "Dorian Nakamoto",
      "Nick Szabo",
      "Craig Wright"
    ],
    "explanation": "Bis heute ist die wahre Identität von Satoshi Nakamoto eines der größten und faszinierendsten Geheimnisse der modernen Menschheit.",
    "exp": "Satoshi Nakamoto"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "mid",
    "q": "Welches US-amerikanische Software-Unternehmen kaufte unter Michael Saylor ab 2020 massiv Bitcoin als primäre Treasury-Reserve?",
    "a": [
      "MicroStrategy",
      "Oracle Corporation",
      "Salesforce",
      "Adobe Systems"
    ],
    "explanation": "MicroStrategy wandelte seine gesamten Cash-Bestände in Bitcoin um, emittierte Wandelanleihen und besitzt heute über 1 % aller existierenden Bitcoins.",
    "exp": "MicroStrategy"
  },
  {
    "cat": "historie_oekonomie",
    "diff": "pro",
    "q": "Wie hoch ist die Freigrenze für private Veräußerungsgeschäfte nach § 23 EStG in Deutschland (Stand ab Steuerjahr 2024)?",
    "a": [
      "1.000 Euro Gewinn pro Kalenderjahr (bei Erreichen ab 1.000 € wird der volle Betrag steuerpflichtig)",
      "600 Euro Freibetrag, der immer komplett abgezogen wird",
      "10.000 Euro pauschal für alle Bürger über 18 Jahre",
      "Es gibt überhaupt keine Freigrenze für Verkäufe innerhalb der Jahresfrist"
    ],
    "explanation": "Achtung: Es ist eine Freigrenze, kein Freibetrag! Wer 999 € Gewinn macht, zahlt 0 €; wer 1.001 € Gewinn innerhalb der Jahresfrist macht, versteuert die vollen 1.001 €.",
    "exp": "1.000 Euro Gewinn pro Kalenderjahr (bei Erreichen ab 1.000 € wird der volle Betrag steuerpflichtig)"
  }
];
  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("bitcoin", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["bitcoin"] = DATA;
  }
})();
