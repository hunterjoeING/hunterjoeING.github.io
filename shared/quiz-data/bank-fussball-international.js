// Unified quiz bank for "fussball_international" (75 questions)
(function () {
  const DATA = [
  {
    "cat": "international",
    "diff": "easy",
    "q": "Welcher Verein ist mit 15 Titeln der unangefochtene Rekordsieger der UEFA Champions League bzw. des Landesmeisterpokals?",
    "a": [
      "Real Madrid",
      "AC Mailand",
      "FC Liverpool",
      "FC Bayern München"
    ],
    "explanation": "Die 'Königlichen' gewannen die ersten fünf Ausgaben (1956–1960) und bauten ihre Dominanz in der Neuzeit massiv aus.",
    "exp": "Die 'Königlichen' gewannen die ersten fünf Ausgaben (1956–1960) und bauten ihre Dominanz in der Neuzeit massiv aus."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "In welcher türkischen Metropole fand 2005 das 'Wunder von Istanbul' zwischen Liverpool und dem AC Mailand statt?",
    "a": [
      "Istanbul",
      "Ankara",
      "Izmir",
      "Antalya"
    ],
    "explanation": "Liverpool glich im Atatürk-Olympiastadion einen 0:3-Pausenrückstand innerhalb von sechs Minuten zum 3:3 aus.",
    "exp": "Liverpool glich im Atatürk-Olympiastadion einen 0:3-Pausenrückstand innerhalb von sechs Minuten zum 3:3 aus."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Wer erzielte 1999 im Champions-League-Finale in Barcelona in der 93. Minute das 2:1 für Manchester United gegen Bayern?",
    "a": [
      "Ole Gunnar Solskjær",
      "Teddy Sheringham",
      "David Beckham",
      "Dwight Yorke"
    ],
    "explanation": "Sheringham glich in der 91. Minute aus, Solskjær hielt kurz darauf den Fuß nach einer Beckham-Ecke hin.",
    "exp": "Sheringham glich in der 91. Minute aus, Solskjær hielt kurz darauf den Fuß nach einer Beckham-Ecke hin."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Wer schoss den FC Bayern München 2013 im rein deutschen Champions-League-Finale gegen Borussia Dortmund zum 2:1-Sieg?",
    "a": [
      "Arjen Robben",
      "Mario Mandžukić",
      "Thomas Müller",
      "Bastian Schweinsteiger"
    ],
    "explanation": "In der 89. Minute spitzelte Robben den Ball an Roman Weidenfeller vorbei ins Netz des Londoner Wembley-Stadions.",
    "exp": "In der 89. Minute spitzelte Robben den Ball an Roman Weidenfeller vorbei ins Netz des Londoner Wembley-Stadions."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Welcher argentinische Superstar wurde in seiner Karriere rekordverdächtige achtmal mit dem Ballon d'Or ausgezeichnet?",
    "a": [
      "Lionel Messi",
      "Cristiano Ronaldo",
      "Diego Maradona",
      "Alfredo Di Stéfano"
    ],
    "explanation": "Messi gewann den Ballon d'Or in den Jahren 2009, 2010, 2011, 2012, 2015, 2019, 2021 und 2023.",
    "exp": "Messi gewann den Ballon d'Or in den Jahren 2009, 2010, 2011, 2012, 2015, 2019, 2021 und 2023."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Wie wird das weltberühmte Ligaduell zwischen den spanischen Erzrivalen Real Madrid und dem FC Barcelona genannt?",
    "a": [
      "El Clásico",
      "Derbi Madrileño",
      "Superclásico",
      "Derby della Madonnina"
    ],
    "explanation": "El Clásico gilt mit hunderten Millionen TV-Zuschauern weltweit als das prestigeträchtigste Vereinsspiel der Welt.",
    "exp": "El Clásico gilt mit hunderten Millionen TV-Zuschauern weltweit als das prestigeträchtigste Vereinsspiel der Welt."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Welcher portugiesische Torjäger hält mit 140 Toren den ewigen Rekord für die meisten Treffer in der UEFA Champions League?",
    "a": [
      "Cristiano Ronaldo",
      "Lionel Messi",
      "Robert Lewandowski",
      "Karim Benzema"
    ],
    "explanation": "Ronaldo traf in der Königsklasse für Manchester United, Real Madrid und Juventus Turin.",
    "exp": "Ronaldo traf in der Königsklasse für Manchester United, Real Madrid und Juventus Turin."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Welche Vereinshymne schallt vor jedem Heimspiel des FC Liverpool von der legendären Tribüne 'The Kop'?",
    "a": [
      "You'll Never Walk Alone",
      "Blue Moon",
      "Glory Glory Man United",
      "Forever Blowing Bubbles"
    ],
    "explanation": "Die Gerry-and-the-Pacemakers-Version des Rodgers-und-Hammerstein-Klassikers ist seit den 1960ern Liverpools Erkennungszeichen.",
    "exp": "Die Gerry-and-the-Pacemakers-Version des Rodgers-und-Hammerstein-Klassikers ist seit den 1960ern Liverpools Erkennungszeichen."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Welcher französische Spielmacher erzielte im Champions-League-Finale 2002 für Real Madrid ein unvergessliches Volleytor?",
    "a": [
      "Zinédine Zidane",
      "Thierry Henry",
      "David Trezeguet",
      "Robert Pirès"
    ],
    "explanation": "Im Glasgower Hampden Park traf Zidane gegen Bayer Leverkusen per Traum-Direktabnahme mit links in den Winkel.",
    "exp": "Im Glasgower Hampden Park traf Zidane gegen Bayer Leverkusen per Traum-Direktabnahme mit links in den Winkel."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Welcher englische Außenseiter schaffte 2015/16 unter Claudio Ranieri die größte Meisterschaftssensation der Premier League?",
    "a": [
      "Leicester City",
      "Blackburn Rovers",
      "Wolverhampton Wanderers",
      "Southampton FC"
    ],
    "explanation": "Die Buchmacher hatten Leicesters Meisterchance vor der Saison mit einer absurden Quote von 5000:1 beziffert.",
    "exp": "Die Buchmacher hatten Leicesters Meisterchance vor der Saison mit einer absurden Quote von 5000:1 beziffert."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Wie wird das hitzige Stadtderby zwischen Celtic Glasgow und den Glasgow Rangers in Schottland genannt?",
    "a": [
      "Old Firm",
      "Merseyside Derby",
      "North London Derby",
      "Tyne-Wear Derby"
    ],
    "explanation": "Das 'Old Firm' ist tief in der schottischen Kulturgeschichte zwischen Katholiken und Protestanten verwurzelt.",
    "exp": "Das 'Old Firm' ist tief in der schottischen Kulturgeschichte zwischen Katholiken und Protestanten verwurzelt."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "In welchem berühmten Londoner Nationalstadion fand 1966 das WM-Finale und 2013 das deutsche Champions-League-Finale statt?",
    "a": [
      "Wembley-Stadion",
      "Emirates Stadium",
      "Stamford Bridge",
      "White Hart Lane"
    ],
    "explanation": "Das alte Wembley mit den 'Twin Towers' wurde 2003 abgerissen und durch die moderne 90.000-Zuschauer-Arena ersetzt.",
    "exp": "Das alte Wembley mit den 'Twin Towers' wurde 2003 abgerissen und durch die moderne 90.000-Zuschauer-Arena ersetzt."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Welcher legendäre Torhüter wurde 1963 als bislang einziger Keeper der Geschichte mit dem Ballon d'Or ausgezeichnet?",
    "a": [
      "Lew Jaschin",
      "Gordon Banks",
      "Dino Zoff",
      "Sepp Maier"
    ],
    "explanation": "Die sowjetische Torwart-Legende von Dynamo Moskau wurde wegen seiner Reflexe und schwarzen Kleidung 'Schwarze Spinne' genannt.",
    "exp": "Die sowjetische Torwart-Legende von Dynamo Moskau wurde wegen seiner Reflexe und schwarzen Kleidung 'Schwarze Spinne' genannt."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Wer gewann 1995 als allererster afrikanischer Fußballprofi der Geschichte den Ballon d'Or?",
    "a": [
      "George Weah",
      "Roger Milla",
      "Samuel Eto'o",
      "Abédi Pelé"
    ],
    "explanation": "Der liberianische Stürmerstar des AC Mailand wurde später Staatspräsident seines Heimatlandes Liberia.",
    "exp": "Der liberianische Stürmerstar des AC Mailand wurde später Staatspräsident seines Heimatlandes Liberia."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "In welchem Stadion des FC Barcelona trugen die Katalanen jahrzehntelang ihre Heimspiele vor fast 100.000 Zuschauern aus?",
    "a": [
      "Camp Nou",
      "Santiago Bernabéu",
      "Estadio Mestalla",
      "San Mamés"
    ],
    "explanation": "Das Camp Nou wurde 1957 eröffnet und ist das größte reine Vereins-Fußballstadion auf europäischem Boden.",
    "exp": "Das Camp Nou wurde 1957 eröffnet und ist das größte reine Vereins-Fußballstadion auf europäischem Boden."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Welches Stadtderby elektrisiert die italienische Modestadt Mailand zwischen Inter und dem AC Milan?",
    "a": [
      "Derby della Madonnina",
      "Derby d'Italia",
      "Derby della Capitale",
      "Derby della Mole"
    ],
    "explanation": "Benannt ist das Derby nach der Madonnenstatue auf der höchsten Spitze des berühmten Mailänder Doms.",
    "exp": "Benannt ist das Derby nach der Madonnenstatue auf der höchsten Spitze des berühmten Mailänder Doms."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Wie lautet der berühmte Spitzname des italienischen Rekordmeisters Juventus Turin?",
    "a": [
      "Die Alte Dame",
      "Die Wölfe",
      "Die Geißböcke",
      "Die Rossoneri"
    ],
    "explanation": "'La Vecchia Signora' geht auf die traditionsreichen Wurzeln des 1897 von Turiner Studenten gegründeten Klubs zurück.",
    "exp": "'La Vecchia Signora' geht auf die traditionsreichen Wurzeln des 1897 von Turiner Studenten gegründeten Klubs zurück."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Welcher spanische Trainer gewann 2009 mit dem FC Barcelona sensationelle sechs Vereinstitel (Sextuple) in einem Kalenderjahr?",
    "a": [
      "Pep Guardiola",
      "Luis Enrique",
      "Frank Rijkaard",
      "Johan Cruyff"
    ],
    "explanation": "Guardiola holte Meisterschaft, Pokal, Champions League, spanischen Supercup, UEFA Supercup und Klub-WM.",
    "exp": "Guardiola holte Meisterschaft, Pokal, Champions League, spanischen Supercup, UEFA Supercup und Klub-WM."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Wer schoss Manchester City 2012 am 38. Spieltag in der 94. Minute mit seinem berühmten 'Agüeroooo'-Tor zur Meisterschaft?",
    "a": [
      "Sergio Agüero",
      "Edin Džeko",
      "Carlos Tévez",
      "David Silva"
    ],
    "explanation": "Agüeros 3:2 gegen Queens Park Rangers entriss dem Stadtrivalen Manchester United in letzter Sekunde den Titel.",
    "exp": "Agüeros 3:2 gegen Queens Park Rangers entriss dem Stadtrivalen Manchester United in letzter Sekunde den Titel."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Welcher brasilianische Kultstürmer glänzte bei Barcelona mit Übersteigern, Grinsen und dem berühmten Hacken-Lupfer?",
    "a": [
      "Ronaldinho",
      "Rivaldo",
      "Romário",
      "Robinho"
    ],
    "explanation": "Ronaldinho wurde 2005 im Bernabéu von den Fans von Erzrivale Real Madrid mit Standing Ovations gefeiert.",
    "exp": "Ronaldinho wurde 2005 im Bernabéu von den Fans von Erzrivale Real Madrid mit Standing Ovations gefeiert."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Welcher englische Klub blieb in der Premier-League-Saison 2003/04 als 'The Invincibles' ungeschlagen?",
    "a": [
      "FC Arsenal",
      "FC Chelsea",
      "Manchester United",
      "FC Liverpool"
    ],
    "explanation": "Unter Arsène Wenger gewannen die 'Gunners' mit Thierry Henry 26 Partien bei 12 Remis und 0 Niederlagen.",
    "exp": "Unter Arsène Wenger gewannen die 'Gunners' mit Thierry Henry 26 Partien bei 12 Remis und 0 Niederlagen."
  },
  {
    "cat": "international",
    "diff": "easy",
    "q": "Wer köpfte Real Madrid im Champions-League-Finale 2014 gegen Atlético in Minute 92:48 zur Verlängerung und 'La Décima'?",
    "a": [
      "Sergio Ramos",
      "Cristiano Ronaldo",
      "Gareth Bale",
      "Karim Benzema"
    ],
    "explanation": "Nach Luka Modrićs Ecke rettete Ramos Real in extremis; in der Verlängerung gewann Real noch 4:1.",
    "exp": "Nach Luka Modrićs Ecke rettete Ramos Real in extremis; in der Verlängerung gewann Real noch 4:1."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher Gegenstand wurde 2002 im Camp Nou nach Luís Figos Wechsel von Barcelona zu Real Madrid nach ihm geworfen?",
    "a": [
      "Ein echter Spanferkelkopf",
      "Ein weißer Turnschuh",
      "Eine leere Weinflasche",
      "Ein brennendes Feuerzeug"
    ],
    "explanation": "Der geworfene Schweinekopf an der Eckfahne wurde zum weltweiten Symbol für den Fan-Hass nach Figos Transfer.",
    "exp": "Der geworfene Schweinekopf an der Eckfahne wurde zum weltweiten Symbol für den Fan-Hass nach Figos Transfer."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "In welchem legendären Stadion in Buenos Aires tragen die Boca Juniors ihre stimmungsvollen Heimspiele aus?",
    "a": [
      "La Bombonera",
      "El Monumental",
      "Estadio Libertadores",
      "Estadio José Amalfitani"
    ],
    "explanation": "Die 'Pralinenschachtel' ist berühmt für ihre steile Tribünenwand und den vibrierenden Boden bei Gesängen.",
    "exp": "Die 'Pralinenschachtel' ist berühmt für ihre steile Tribünenwand und den vibrierenden Boden bei Gesängen."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher französische Klub gewann 1993 das allererste Finale der neu gegründeten UEFA Champions League gegen den AC Mailand?",
    "a": [
      "Olympique Marseille",
      "Paris Saint-Germain",
      "AS Monaco",
      "Girondins Bordeaux"
    ],
    "explanation": "Verteidiger Basile Boli köpfte in München das goldene 1:0 für das Team von Präsident Bernard Tapie.",
    "exp": "Verteidiger Basile Boli köpfte in München das goldene 1:0 für das Team von Präsident Bernard Tapie."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Wer hielt im 'Finale dahoam' 2012 in München in der Verlängerung Arjen Robbens Elfmeter und sicherte Chelsea den Titel?",
    "a": [
      "Petr Čech",
      "Thibaut Courtois",
      "Carlo Cudicini",
      "Henrique Hilário"
    ],
    "explanation": "Čech erriet in allen Elfmetern des Spiels die richtige Ecke und parierte gegen Robben, Olić und Schweinsteiger.",
    "exp": "Čech erriet in allen Elfmetern des Spiels die richtige Ecke und parierte gegen Robben, Olić und Schweinsteiger."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher niederländische Visionär prägte Ajax Amsterdam und den FC Barcelona mit der Philosophie des 'Totalen Fußballs'?",
    "a": [
      "Johan Cruyff",
      "Rinus Michels",
      "Louis van Gaal",
      "Guus Hiddink"
    ],
    "explanation": "Cruyff schuf die Nachwuchsakademie La Masia und legte den Grundstein für Barcelonas weltberühmten Spielstil.",
    "exp": "Cruyff schuf die Nachwuchsakademie La Masia und legte den Grundstein für Barcelonas weltberühmten Spielstil."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher Torhüter irritierte die Mailänder Schützen im Finale 2005 mit seinem 'Dudek Dance' auf der Linie?",
    "a": [
      "Jerzy Dudek",
      "Sander Westerveld",
      "Chris Kirkland",
      "Scott Carson"
    ],
    "explanation": "Dudek ahmte Bruce Grobbelaars legendäre 'Spaghetti Legs' von 1984 nach und parierte zwei Schüsse.",
    "exp": "Dudek ahmte Bruce Grobbelaars legendäre 'Spaghetti Legs' von 1984 nach und parierte zwei Schüsse."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Mit welchem englischen Verein gewann Trainerlegende Brian Clough 1979 und 1980 zweimal in Folge den Europapokal der Landesmeister?",
    "a": [
      "Nottingham Forest",
      "Derby County",
      "Aston Villa",
      "Leeds United"
    ],
    "explanation": "Der Provinzklub stieg erst 1977 in die erste Liga auf und eroberte binnen drei Jahren ganz Europa.",
    "exp": "Der Provinzklub stieg erst 1977 in die erste Liga auf und eroberte binnen drei Jahren ganz Europa."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher ungarische Stürmer erzielte 1960 beim legendären 7:3-Finalsieg von Real Madrid gegen Frankfurt vier Tore?",
    "a": [
      "Ferenc Puskás",
      "Alfredo Di Stéfano",
      "Nándor Hidegkuti",
      "Sándor Kocsis"
    ],
    "explanation": "Puskás traf viermal, Di Stéfano dreimal – das Spiel im Hampden Park vor 127.000 Zuschauern gilt als Jahrhundertspiel.",
    "exp": "Puskás traf viermal, Di Stéfano dreimal – das Spiel im Hampden Park vor 127.000 Zuschauern gilt als Jahrhundertspiel."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher Verein gewann 2004 unter dem jungen Trainer José Mourinho sensationell die UEFA Champions League?",
    "a": [
      "FC Porto",
      "Benfica Lissabon",
      "Deportivo La Coruña",
      "Olympique Lyon"
    ],
    "explanation": "Porto schlug im Finale in Gelsenkirchen die AS Monaco mit 3:0; Mourinho nannte sich danach 'The Special One'.",
    "exp": "Porto schlug im Finale in Gelsenkirchen die AS Monaco mit 3:0; Mourinho nannte sich danach 'The Special One'."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher britische Flügelstürmer gewann 1956 im Alter von 41 Jahren den allerersten Ballon d'Or der Geschichte?",
    "a": [
      "Stanley Matthews",
      "Tom Finney",
      "Duncan Edwards",
      "Bobby Charlton"
    ],
    "explanation": "Der 'Zauberer des Dribblings' von Blackpool spielte in der höchsten englischen Liga, bis er 50 Jahre alt war.",
    "exp": "Der 'Zauberer des Dribblings' von Blackpool spielte in der höchsten englischen Liga, bis er 50 Jahre alt war."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher Traditionsklub schockte Paris Saint-Germain 2017 mit der historischen 'Remontada' nach einem 0:4 im Hinspiel?",
    "a": [
      "FC Barcelona",
      "Real Madrid",
      "Juventus Turin",
      "Manchester City"
    ],
    "explanation": "Barcelona gewann das Rückspiel im Camp Nou mit 6:1 – Sergi Roberto erzielte in der 95. Minute das entscheidende Tor.",
    "exp": "Barcelona gewann das Rückspiel im Camp Nou mit 6:1 – Sergi Roberto erzielte in der 95. Minute das entscheidende Tor."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher italienische Klub dominierte Ende der 1980er mit dem niederländischen Trio Gullit, van Basten und Rijkaard?",
    "a": [
      "AC Mailand",
      "Inter Mailand",
      "Juventus Turin",
      "AS Rom"
    ],
    "explanation": "Unter Trainer Arrigo Sacchi gewann Milan 1989 und 1990 zweimal in Folge den Europapokal der Landesmeister.",
    "exp": "Unter Trainer Arrigo Sacchi gewann Milan 1989 und 1990 zweimal in Folge den Europapokal der Landesmeister."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher Verein stellte im November 2003 die berühmte Rekordkulisse von 0:0 auf Schalke auf?",
    "a": [
      "Inter Mailand",
      "FC Arsenal",
      "Lazio Rom",
      "Sparta Prag"
    ],
    "explanation": "Arsenal deklassierte Inter 2003 im San Siro mit 5:1 nach einer sensationellen Gala von Thierry Henry.",
    "exp": "Arsenal deklassierte Inter 2003 im San Siro mit 5:1 nach einer sensationellen Gala von Thierry Henry."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher Verein verlor zwischen 1973 und 2017 sagenhafte sieben Finals im Europapokal der Landesmeister bzw. Champions League?",
    "a": [
      "Juventus Turin",
      "Benfica Lissabon",
      "Bayern München",
      "Atlético Madrid"
    ],
    "explanation": "Juve gewann den Pokal nur zweimal (1985, 1996), verlor aber sieben Endspiele auf bitterste Weise.",
    "exp": "Juve gewann den Pokal nur zweimal (1985, 1996), verlor aber sieben Endspiele auf bitterste Weise."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher brasilianische Klub gewann mit Pelé 1962 und 1963 sowohl die Copa Libertadores als auch den Weltpokal?",
    "a": [
      "FC Santos",
      "Flamengo Rio de Janeiro",
      "FC São Paulo",
      "Palmeiras São Paulo"
    ],
    "explanation": "Pelés Santos tourte damals durch die ganze Welt und besiegte Benfica Lissabon und den AC Mailand.",
    "exp": "Pelés Santos tourte damals durch die ganze Welt und besiegte Benfica Lissabon und den AC Mailand."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher englische Stürmer hält mit 260 Treffern den ewigen Torrekord der 1992 gegründeten Premier League?",
    "a": [
      "Alan Shearer",
      "Wayne Rooney",
      "Harry Kane",
      "Andy Cole"
    ],
    "explanation": "Shearer traf vor allem für die Blackburn Rovers (Meister 1995) und seinen Heimatklub Newcastle United.",
    "exp": "Shearer traf vor allem für die Blackburn Rovers (Meister 1995) und seinen Heimatklub Newcastle United."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher Verein gewann 1991 als einziges Team aus dem damaligen Jugoslawien den Europapokal der Landesmeister?",
    "a": [
      "Roter Stern Belgrad",
      "Partizan Belgrad",
      "Dinamo Zagreb",
      "Hajduk Split"
    ],
    "explanation": "Mit Stars wie Prosinečki, Savićević, Mihajlović und Pančev schlug Belgrad Olympique Marseille im Elfmeterschießen.",
    "exp": "Mit Stars wie Prosinečki, Savićević, Mihajlović und Pančev schlug Belgrad Olympique Marseille im Elfmeterschießen."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Wie viele Tore schoss Lionel Messi im Kalenderjahr 2012 für Barcelona und Argentinien zum ewigen Weltrekord?",
    "a": [
      "91 Tore",
      "85 Tore",
      "99 Tore",
      "78 Tore"
    ],
    "explanation": "Messi übertraf Gerd Müllers 40 Jahre alten Rekord von 85 Toren aus dem Jahr 1972 um sechs Treffer.",
    "exp": "Messi übertraf Gerd Müllers 40 Jahre alten Rekord von 85 Toren aus dem Jahr 1972 um sechs Treffer."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welches argentinische Derby zwischen Boca Juniors und River Plate musste 2018 wegen Krawallen in Madrid ausgetragen werden?",
    "a": [
      "Superclásico",
      "Clásico Avellaneda",
      "Clásico Rosarino",
      "Clásico Platense"
    ],
    "explanation": "Das Finale der Copa Libertadores 2018 fand nach Steinwürfen auf den Boca-Bus im Santiago Bernabéu statt.",
    "exp": "Das Finale der Copa Libertadores 2018 fand nach Steinwürfen auf den Boca-Bus im Santiago Bernabéu statt."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Wer erzielte 1997 für Real Madrid im CL-Finale gegen Juventus Turin nach 32 Jahren das goldene 1:0-Siegtor?",
    "a": [
      "Predrag Mijatović",
      "Raúl",
      "Fernando Morientes",
      "Clarence Seedorf"
    ],
    "explanation": "Mijatovićs Treffer beendete Reals lange Durststrecke seit 1966 und sicherte die 'Séptima'.",
    "exp": "Mijatovićs Treffer beendete Reals lange Durststrecke seit 1966 und sicherte die 'Séptima'."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher Spieler gewann die UEFA Champions League als einziger Profi mit drei verschiedenen Vereinen (Ajax, Real, Milan)?",
    "a": [
      "Clarence Seedorf",
      "Cristiano Ronaldo",
      "Samuel Eto'o",
      "Zlatan Ibrahimović"
    ],
    "explanation": "Seedorf siegte 1995 mit Ajax Amsterdam, 1998 mit Real Madrid und 2003 sowie 2007 mit dem AC Mailand.",
    "exp": "Seedorf siegte 1995 mit Ajax Amsterdam, 1998 mit Real Madrid und 2003 sowie 2007 mit dem AC Mailand."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher Traditionsverein aus Neapel gewann 1987 und 1990 mit Diego Maradona seine ersten beiden italienischen Meisterschaften?",
    "a": [
      "SSC Neapel",
      "AS Rom",
      "AC Florenz",
      "Sampdoria Genua"
    ],
    "explanation": "Maradona wurde in Neapel wie ein Gott verehrt; das Stadio San Paolo wurde nach seinem Tod nach ihm benannt.",
    "exp": "Maradona wurde in Neapel wie ein Gott verehrt; das Stadio San Paolo wurde nach seinem Tod nach ihm benannt."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Wer erzielte 1986 im Finale des Europapokals der Landesmeister im Elfmeterschießen gegen Barcelona vier Paraden?",
    "a": [
      "Helmuth Duckadam",
      "Javier Urruticoechea",
      "Silviu Lung",
      "Rincón"
    ],
    "explanation": "Steaua Bukarests Keeper Duckadam wehrte alle vier Elfmeter der Katalanen ab – Steaua siegte sensationell 2:0.",
    "exp": "Steaua Bukarests Keeper Duckadam wehrte alle vier Elfmeter der Katalanen ab – Steaua siegte sensationell 2:0."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher Trainer gewann die Champions League als erster Coach dreimal hintereinander (2016, 2017, 2018)?",
    "a": [
      "Zinédine Zidane",
      "Carlo Ancelotti",
      "Pep Guardiola",
      "Alex Ferguson"
    ],
    "explanation": "Mit Real Madrid schaffte Zidane den historischen Hattrick in der modernen Champions-League-Ära.",
    "exp": "Mit Real Madrid schaffte Zidane den historischen Hattrick in der modernen Champions-League-Ära."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher Schotte trainierte Manchester United fast 27 Jahre lang von 1986 bis 2013 und gewann 38 Trophäen?",
    "a": [
      "Sir Alex Ferguson",
      "Matt Busby",
      "Bill Shankly",
      "Jock Stein"
    ],
    "explanation": "Ferguson führte Man United zu 13 Meistertiteln, zwei Champions-League-Siegen und dem legendären Triple 1999.",
    "exp": "Ferguson führte Man United zu 13 Meistertiteln, zwei Champions-League-Siegen und dem legendären Triple 1999."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher brasilianische Stürmer erzielte 1997 für Barcelona gegen Compostela ein weltberühmtes 50-Meter-Solotor?",
    "a": [
      "Ronaldo Nazário",
      "Rivaldo",
      "Romário",
      "Bebeto"
    ],
    "explanation": "'O Fenômeno' schüttelte fünf Gegenspieler ab, die ihn am Trikot zogen – Trainer Bobby Robson schlug die Hände vors Gesicht.",
    "exp": "'O Fenômeno' schüttelte fünf Gegenspieler ab, die ihn am Trikot zogen – Trainer Bobby Robson schlug die Hände vors Gesicht."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welches berühmte Schild berühren die Spieler des FC Liverpool beim Gang aus den Katakomben auf den Platz?",
    "a": [
      "This is Anfield",
      "Welcome to Liverpool",
      "We are the Kop",
      "Fortress Anfield"
    ],
    "explanation": "Das Schild wurde von Manager-Legende Bill Shankly angebracht, um den Gegnern Respekt einzuflößen.",
    "exp": "Das Schild wurde von Manager-Legende Bill Shankly angebracht, um den Gegnern Respekt einzuflößen."
  },
  {
    "cat": "international",
    "diff": "mid",
    "q": "Welcher Verein gewann 1970 als erster niederländischer Klub den Europapokal der Landesmeister gegen Celtic Glasgow?",
    "a": [
      "Feyenoord Rotterdam",
      "Ajax Amsterdam",
      "PSV Eindhoven",
      "AZ Alkmaar"
    ],
    "explanation": "Ove Kindvall schoss Feyenoord in Mailand in der 117. Minute zum 2:1-Sieg über die Schotten.",
    "exp": "Ove Kindvall schoss Feyenoord in Mailand in der 117. Minute zum 2:1-Sieg über die Schotten."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher ungarische Trainer verfluchte Benfica Lissabon 1962 angeblich dazu, 100 Jahre lang kein europäisches Finale mehr zu gewinnen?",
    "a": [
      "Béla Guttmann",
      "Lajos Czeizler",
      "Gyula Lóránt",
      "Gusztáv Sebes"
    ],
    "explanation": "Nach dem Streit um eine Gehaltserhöhung verließ Guttmann den Klub – Benfica verlor seither acht Europapokal-Endspiele.",
    "exp": "Nach dem Streit um eine Gehaltserhöhung verließ Guttmann den Klub – Benfica verlor seither acht Europapokal-Endspiele."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Wer erzielte 1995 im Champions-League-Finale für Ajax Amsterdam in der 85. Minute das 1:0 gegen den AC Mailand mit der Fußspitze?",
    "a": [
      "Patrick Kluivert",
      "Jari Litmanen",
      "Marc Overmars",
      "Nwankwo Kanu"
    ],
    "explanation": "Der 18-jährige Kluivert kam von der Bank und überwand Sebastiano Rossi im Wiener Ernst-Happel-Stadion.",
    "exp": "Der 18-jährige Kluivert kam von der Bank und überwand Sebastiano Rossi im Wiener Ernst-Happel-Stadion."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher argentinische Abwehrchef führte Inter Mailand 2010 unter José Mourinho als Kapitän zum Triple?",
    "a": [
      "Javier Zanetti",
      "Walter Samuel",
      "Esteban Cambiasso",
      "Diego Milito"
    ],
    "explanation": "Zanetti absolvierte über 850 Pflichtspiele für Inter und reckte im Bernabéu den Henkelpott in die Höhe.",
    "exp": "Zanetti absolvierte über 850 Pflichtspiele für Inter und reckte im Bernabéu den Henkelpott in die Höhe."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher Verein gewann 1974 das einzige Wiederholungsspiel der Landesmeisterpokal-Geschichte gegen Atlético Madrid?",
    "a": [
      "FC Bayern München",
      "Ajax Amsterdam",
      "Juventus Turin",
      "Leeds United"
    ],
    "explanation": "Nach Schwarzenbecks 1:1 in Minute 120 gewann Bayern das Wiederholungsspiel zwei Tage später mit 4:0 (Müller, Hoeneß).",
    "exp": "Nach Schwarzenbecks 1:1 in Minute 120 gewann Bayern das Wiederholungsspiel zwei Tage später mit 4:0 (Müller, Hoeneß)."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Wer erzielte im UEFA-Cup-Finale 2001 beim legendären 5:4 von Liverpool gegen Alavés das kuriose Golden Goal per Eigentor?",
    "a": [
      "Delfí Geli",
      "Jordi Cruyff",
      "Óscar Téllez",
      "Antonio Karmona"
    ],
    "explanation": "Geli köpfte einen Freistoß von Gary McAllister in der 116. Minute ins eigene Tor und beendete die Partie.",
    "exp": "Geli köpfte einen Freistoß von Gary McAllister in der 116. Minute ins eigene Tor und beendete die Partie."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher dänische Superstar fehlte 1992 im EM-Kader Dänemarks wegen eines Streits mit Nationaltrainer Richard Møller Nielsen?",
    "a": [
      "Michael Laudrup",
      "Brian Laudrup",
      "Jan Mølby",
      "Morten Olsen"
    ],
    "explanation": "Während sein Bruder Brian Europameister wurde, schaute Barças Spielmacher Michael Laudrup von zu Hause zu.",
    "exp": "Während sein Bruder Brian Europameister wurde, schaute Barças Spielmacher Michael Laudrup von zu Hause zu."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher Verein kassierte im Landesmeister-Halbfinale 1989 gegen Sacchis AC Mailand eine verheerende 0:5-Klatsche?",
    "a": [
      "Real Madrid",
      "FC Bayern München",
      "PSV Eindhoven",
      "Steaua Bukarest"
    ],
    "explanation": "Milans Offensiv-Gala im San Siro gegen Butragueño und Co. gilt als Meilenstein der Taktikgeschichte.",
    "exp": "Milans Offensiv-Gala im San Siro gegen Butragueño und Co. gilt als Meilenstein der Taktikgeschichte."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher Spieler erzielte 1963 im Finale des Europapokals der Pokalsieger für Tottenham ein Tor direkt von der Eckfahne?",
    "a": [
      "Terry Dyson",
      "Jimmy Greaves",
      "John White",
      "Cliff Jones"
    ],
    "explanation": "Tottenham schlug Atlético Madrid mit 5:1 und holte als erster britischer Verein einen Europapokal.",
    "exp": "Tottenham schlug Atlético Madrid mit 5:1 und holte als erster britischer Verein einen Europapokal."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher Star wechselte 1973 für die damalige Weltrekord-Ablöse von 6 Millionen Gulden von Ajax Amsterdam zum FC Barcelona?",
    "a": [
      "Johan Cruyff",
      "Johan Neeskens",
      "Johnny Rep",
      "Piet Keizer"
    ],
    "explanation": "Cruyff führte Barcelona in seiner Debütsaison nach 14 Jahren Pause prompt zur spanischen Meisterschaft.",
    "exp": "Cruyff führte Barcelona in seiner Debütsaison nach 14 Jahren Pause prompt zur spanischen Meisterschaft."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher schottische Klub erreichte 1987 unter dem späteren Startrainer Jim McLean das UEFA-Cup-Finale gegen Göteborg?",
    "a": [
      "Dundee United",
      "FC Aberdeen",
      "Heart of Midlothian",
      "Hibernian Edinburgh"
    ],
    "explanation": "Dundee schaltete im Halbfinale sogar den FC Barcelona aus, verlor das Finale aber knapp gegen IFK Göteborg.",
    "exp": "Dundee schaltete im Halbfinale sogar den FC Barcelona aus, verlor das Finale aber knapp gegen IFK Göteborg."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Wer köpfte 2008 im Champions-League-Finale in Moskau für Chelsea gegen Manchester United den Ball an den Pfosten?",
    "a": [
      "Didier Drogba",
      "Frank Lampard",
      "John Terry",
      "Michael Ballack"
    ],
    "explanation": "Drogba traf Aluminium, flog später vom Platz, und John Terry rutschte im Elfmeterschießen auf nassem Rasen weg.",
    "exp": "Drogba traf Aluminium, flog später vom Platz, und John Terry rutschte im Elfmeterschießen auf nassem Rasen weg."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher Star erzielte 1968 für Manchester United im Finale des Landesmeisterpokals zwei Tore gegen Benfica Lissabon?",
    "a": [
      "Bobby Charlton",
      "George Best",
      "Brian Kidd",
      "Denis Law"
    ],
    "explanation": "Zehn Jahre nach dem Flugzeugunglück von München führte Überlebender Charlton Man United zum ersten englischen Europatitel.",
    "exp": "Zehn Jahre nach dem Flugzeugunglück von München führte Überlebender Charlton Man United zum ersten englischen Europatitel."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher Verein scheiterte 2002 im sogenannten 'Vizekusen'-Jahr in drei Wettbewerben (Bundesliga, DFB-Pokal, CL) auf Platz 2?",
    "a": [
      "Bayer 04 Leverkusen",
      "FC Schalke 04",
      "Borussia Dortmund",
      "Werder Bremen"
    ],
    "explanation": "Unter Klaus Toppmöller spielte Leverkusen genialen Fußball, verlor aber binnen weniger Tage alle drei Titel.",
    "exp": "Unter Klaus Toppmöller spielte Leverkusen genialen Fußball, verlor aber binnen weniger Tage alle drei Titel."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Wer erzielte 1987 im Landesmeister-Finale in Wien das berühmte Hackentor für den FC Porto gegen Bayern München?",
    "a": [
      "Rabah Madjer",
      "Juary",
      "Paulo Futre",
      "António André"
    ],
    "explanation": "Der Algerier Madjer traf mit dem Rücken zum Tor genial mit der Hacke zum 1:1, ehe Juary das 2:1 erzielte.",
    "exp": "Der Algerier Madjer traf mit dem Rücken zum Tor genial mit der Hacke zum 1:1, ehe Juary das 2:1 erzielte."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher Torhüter parierte im Champions-League-Finale 2001 gegen Valencia drei Elfmeter für Bayern München?",
    "a": [
      "Oliver Kahn",
      "Stefan Wessels",
      "Bernd Dreher",
      "Sven Scheuer"
    ],
    "explanation": "Kahns Parade gegen Mauricio Pellegrino im San Siro sicherte Bayern nach 25 Jahren wieder Europas Thron.",
    "exp": "Kahns Parade gegen Mauricio Pellegrino im San Siro sicherte Bayern nach 25 Jahren wieder Europas Thron."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher brasilianische Klub gewann 2000 die allererste FIFA-Klub-Weltmeisterschaft im Elfmeterschießen gegen Vasco da Gama?",
    "a": [
      "Corinthians São Paulo",
      "Flamengo Rio de Janeiro",
      "FC São Paulo",
      "Palmeiras"
    ],
    "explanation": "Corinthians siegte im Maracanã vor 73.000 Zuschauern und wurde historischer Premierensieger der FIFA Klub-WM.",
    "exp": "Corinthians siegte im Maracanã vor 73.000 Zuschauern und wurde historischer Premierensieger der FIFA Klub-WM."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher Verein gewann 1978 und 1984 zweimal die Copa Libertadores und verhinderte Tore mit der legendären Abseitsfalle?",
    "a": [
      "Boca Juniors",
      "Independiente",
      "Peñarol Montevideo",
      "Club Olimpia"
    ],
    "explanation": "Independiente aus Avellaneda ist mit 7 Titeln bis heute der Rekordsieger der Copa Libertadores.",
    "exp": "Independiente aus Avellaneda ist mit 7 Titeln bis heute der Rekordsieger der Copa Libertadores."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Wer erzielte 2003 im Viertelfinale der Champions League im Old Trafford für Real Madrid einen legendären Hattrick?",
    "a": [
      "Ronaldo Nazário",
      "Raúl",
      "Luís Figo",
      "Zinédine Zidane"
    ],
    "explanation": "Nach seiner Auswechslung erhoben sich alle 67.000 englischen Fans und spendeten Ronaldo tosenden Applaus.",
    "exp": "Nach seiner Auswechslung erhoben sich alle 67.000 englischen Fans und spendeten Ronaldo tosenden Applaus."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher Klub aus Belgrad verlor 1966 das Finale des Europapokals der Landesmeister in Brüssel nur knapp mit 1:2 gegen Real Madrid?",
    "a": [
      "Partizan Belgrad",
      "Roter Stern Belgrad",
      "OFK Belgrad",
      "FK Rad Belgrad"
    ],
    "explanation": "Partizan führte bis zur 70. Minute, ehe Amancio und Serena das Spiel für Reals 'Yé-yé'-Generation drehten.",
    "exp": "Partizan führte bis zur 70. Minute, ehe Amancio und Serena das Spiel für Reals 'Yé-yé'-Generation drehten."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Wer schoss 1983 im Finale des Europapokals der Landesmeister in Athen das 1:0-Siegtor für den Hamburger SV gegen Juventus Turin?",
    "a": [
      "Felix Magath",
      "Horst Hrubesch",
      "Manfred Kaltz",
      "Lars Bastrup"
    ],
    "explanation": "Magath düpierte Juves Dino Zoff in der 9. Minute mit einem maßgenauen Schlenzer ins rechte Kreuzeck.",
    "exp": "Magath düpierte Juves Dino Zoff in der 9. Minute mit einem maßgenauen Schlenzer ins rechte Kreuzeck."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher Star traf 1972 für Ajax Amsterdam im Landesmeister-Finale gegen Inter Mailand beide Tore zum 2:0-Triumph?",
    "a": [
      "Johan Cruyff",
      "Piet Keizer",
      "Sjaak Swart",
      "Gerrie Mühren"
    ],
    "explanation": "Cruyff zerlegte den gefürchteten Catenaccio der Italiener in Rotterdam mit spielerischer Eleganz.",
    "exp": "Cruyff zerlegte den gefürchteten Catenaccio der Italiener in Rotterdam mit spielerischer Eleganz."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher brasilianische Klub gewann 1981 angeführt von Zico den Weltpokal in Tokio mit einem 3:0 gegen den FC Liverpool?",
    "a": [
      "Flamengo Rio de Janeiro",
      "Grêmio Porto Alegre",
      "FC Santos",
      "Cruzeiro Belo Horizonte"
    ],
    "explanation": "Der 'Weiße Pelé' Zico zauberte Liverpools Defensive schwindelig und wurde zum besten Spieler gewählt.",
    "exp": "Der 'Weiße Pelé' Zico zauberte Liverpools Defensive schwindelig und wurde zum besten Spieler gewählt."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Wer erzielte 1994 im Champions-League-Finale in Athen für den AC Mailand beim 4:0-Triumph über Barcelona zwei Tore?",
    "a": [
      "Daniele Massaro",
      "Dejan Savićević",
      "Marcel Desailly",
      "Zvonimir Boban"
    ],
    "explanation": "Fabio Capellos Milan demütigte Johan Cruyffs hochfavorisiertes 'Dream Team' in einer taktischen Meisterleistung.",
    "exp": "Fabio Capellos Milan demütigte Johan Cruyffs hochfavorisiertes 'Dream Team' in einer taktischen Meisterleistung."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Welcher Verein gewann 1988 im Elfmeterschießen gegen Benfica Lissabon den Europapokal der Landesmeister ohne ein einziges Tor in 120 Minuten?",
    "a": [
      "PSV Eindhoven",
      "KV Mechelen",
      "RSC Anderlecht",
      "Ajax Amsterdam"
    ],
    "explanation": "Unter Guus Hiddink spielte Eindhoven extrem defensiv und siegte in Stuttgart mit 6:5 im Elfmeterschießen.",
    "exp": "Unter Guus Hiddink spielte Eindhoven extrem defensiv und siegte in Stuttgart mit 6:5 im Elfmeterschießen."
  },
  {
    "cat": "international",
    "diff": "hard",
    "q": "Wer erzielte 2006 im Finale der Champions League in Paris den 2:1-Siegtreffer für Barcelona gegen den FC Arsenal?",
    "a": [
      "Juliano Belletti",
      "Samuel Eto'o",
      "Henrik Larsson",
      "Ludovic Giuly"
    ],
    "explanation": "Der eingewechselte brasilianische Rechtsverteidiger Belletti schoss sein einziges Tor überhaupt für Barcelona zum Titel.",
    "exp": "Der eingewechselte brasilianische Rechtsverteidiger Belletti schoss sein einziges Tor überhaupt für Barcelona zum Titel."
  }
];

  if (window.ArcadeQuizEngine && typeof window.ArcadeQuizEngine.registerBank === "function") {
    window.ArcadeQuizEngine.registerBank("fussball_international", DATA);
  } else {
    window.ARCADE_QUIZ_BANKS = window.ARCADE_QUIZ_BANKS || {};
    window.ARCADE_QUIZ_BANKS["fussball_international"] = DATA;
  }
})();
