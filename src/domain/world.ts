export interface WorldFact {
  label: string
  value: string
}

export interface WorldEntry {
  id: string
  introducedInRound: number
  category: 'ISTOTA' | 'BOHATER' | 'ARTEFAKT' | 'MIEJSCE'
  name: string
  description: string
  facts: WorldFact[]
}

export const worldEntries: WorldEntry[] = [
  {
    id: 'BIO-016',
    introducedInRound: 1,
    category: 'ISTOTA',
    name: 'Biomechaniczny Szczur nr 16',
    description: 'Żywy statek i dom dla trzystu załogantów. Przemierza Labirynt, zbierając zasoby dla Gniazda. Po zderzeniu z bramą Gniazda jego wrak zatrzymał się kilkanaście metrów przed wejściem.',
    facts: [
      { label: 'ZAŁOGA', value: '300 osób' },
      { label: 'FUNKCJA', value: 'Ekspedycyjna' },
      { label: 'FINAŁ', value: 'Wrak przed wrotami Gniazda' },
    ],
  },
  {
    id: 'OSO-001',
    introducedInRound: 2,
    category: 'BOHATER',
    name: 'Kiza',
    description: 'Doświadczona szczurza załogantka, pierwszy oficer kapitana Nezumiego i osoba odpowiedzialna za zwiad.',
    facts: [
      { label: 'RANGA', value: 'Pierwszy oficer' },
      { label: 'ZAŁOGA', value: 'Kozacy' },
    ],
  },
  {
    id: 'ART-013',
    introducedInRound: 2,
    category: 'ARTEFAKT',
    name: 'Wielkie jajo',
    description: 'Nieznane znalezisko z doliny pod sztucznym słońcem. Szczur nr 16 nie chciał się do niego zbliżyć, a w jego wnętrzu odnotowano oznaki życia. Ocalony z Trzynastki potwierdził, że pęknięcie podobnego jaja uwolniło zakaźny śluz.',
    facts: [
      { label: 'POCHODZENIE', value: 'Nieznane' },
      { label: 'STATUS', value: 'Jajo Szczura 16 w magazynie' },
      { label: 'ZAGROŻENIE', value: 'Zakaźny śluz po pęknięciu' },
      { label: 'HIPOTEZA', value: 'Może wibrować lub śpiewać' },
    ],
  },
  {
    id: 'BIO-013',
    introducedInRound: 2,
    category: 'ISTOTA',
    name: 'Szczur nr 13',
    description: 'Zniszczony biomechaniczny Szczur odnaleziony pod zawaliskiem. Z wraku wydobyto rannego Kozaka, który ostrzegł załogę Szesnastki przed jajem i śluzem.',
    facts: [
      { label: 'STATUS', value: 'Zniszczony' },
      { label: 'LOKALIZACJA', value: 'Zawalony korytarz Labiryntu' },
      { label: 'OCALAŁY', value: 'Ranny Kozak' },
    ],
  },
  {
    id: 'ART-FLG-013',
    introducedInRound: 2,
    category: 'ARTEFAKT',
    name: 'Granatowy sztandar',
    description: 'Rozszarpany fragment granatowego materiału znaleziony pod gruzami. Najpewniej należał do Szczura nr 13.',
    facts: [
      { label: 'STAN', value: 'Rozszarpany' },
      { label: 'POCHODZENIE', value: 'Szczur nr 13' },
    ],
  },
  {
    id: 'IST-KOT',
    introducedInRound: 1,
    category: 'ISTOTA',
    name: 'Kot',
    description: 'Legendarny drapieżnik Labiryntu. W pobliżu zawaliska odnaleziono ślady wielkich pazurów, pomruki i fragment kociego wąsa. Relacje z kolejki 4 łączą go z jajami, ich sygnałem oraz atakami na biomechaniczne Szczury. W kanonicznej relacji z kolejki 6 Kiza zwabia jednego z prześladowców zawołaniem „Kici kici” i grzebie go zawaloną miną.',
    facts: [
      { label: 'STATUS', value: 'Niepotwierdzony' },
      { label: 'ŚLADY', value: 'Pazury, pomruki, koci wąs' },
      { label: 'RELACJA', value: 'Może wyczuwać jaja z daleka' },
      { label: 'KANON', value: 'Jeden z prześladowców zabity miną w korytarzu' },
    ],
  },
  {
    id: 'LOC-VALLEY-SUN',
    introducedInRound: 2,
    category: 'MIEJSCE',
    name: 'Dolina pod sztucznym słońcem',
    description: 'Żyzna dolina odnaleziona podczas czteromiesięcznej tułaczki. Rosły tam jadalne rośliny, a w wodach żyły ryby.',
    facts: [
      { label: 'WARUNKI', value: 'Sztuczne słońce' },
      { label: 'ZASOBY', value: 'Owoce, korzenie, zioła i ryby' },
    ],
  },
  {
    id: 'ART-THREAD-BLUE',
    introducedInRound: 2,
    category: 'ARTEFAKT',
    name: 'Granatowe włókna',
    description: 'Nieznana struktura odnaleziona w rumowisku. Mogą być fragmentem sztandaru, liną albo częścią organizmu.',
    facts: [
      { label: 'FORMA', value: 'Włókna, lina lub kłąb' },
      { label: 'STATUS', value: 'Nierozpoznane' },
    ],
  },
  {
    id: 'OSO-S13-SURVIVOR',
    introducedInRound: 3,
    category: 'BOHATER',
    name: 'Ocalony Kozak z Trzynastki',
    description: 'Ranny członek załogi Szczura nr 13 odkopany spod zwałowiska. Po podaniu wody zdołał ostrzec Kizę i Kozaków, że jajo jest pułapką.',
    facts: [
      { label: 'ZAŁOGA', value: 'Szczur nr 13' },
      { label: 'STATUS', value: 'Ranny, uratowany spod gruzu' },
      { label: 'OSTRZEŻENIE', value: '„Jajo. To pułapka”' },
    ],
  },
  {
    id: 'ART-HELMET-013',
    introducedInRound: 3,
    category: 'ARTEFAKT',
    name: 'Hełm Szczura nr 13',
    description: 'Hełm wydobyty spod zwałowiska razem z innymi dowodami katastrofy Trzynastki. Na jego powierzchni wyryto liczbę 13.',
    facts: [
      { label: 'OZNACZENIE', value: '13' },
      { label: 'POCHODZENIE', value: 'Załoga Szczura nr 13' },
      { label: 'LOKALIZACJA', value: 'Zawalony korytarz Labiryntu' },
    ],
  },
  {
    id: 'ART-TAIL-013',
    introducedInRound: 3,
    category: 'ARTEFAKT',
    name: 'Powłoka ogona Szczura nr 13',
    description: 'Fragment biomechanicznej powłoki szczurzego ogona odnaleziony pod gruzami. Stanowi dowód rozległego zniszczenia Szczura nr 13.',
    facts: [
      { label: 'POCHODZENIE', value: 'Szczur nr 13' },
      { label: 'RODZAJ', value: 'Biomechaniczna powłoka' },
      { label: 'STATUS', value: 'Oderwana od wraku' },
    ],
  },
  {
    id: 'OSO-HIKO',
    introducedInRound: 4,
    category: 'BOHATER',
    name: 'Hiko',
    description: 'Kozak, który dotknął śluzu uwolnionego z jaja. Zakażenie natychmiast zaatakowało jego układ nerwowy, wywołało konwulsje i zmusiło go do opadnięcia na cztery kończyny.',
    facts: [
      { label: 'ROLA', value: 'Kozak Szczura nr 16' },
      { label: 'STATUS', value: 'Zakażony' },
      { label: 'OBJAWY', value: 'Konwulsje i ruch na czterech kończynach' },
    ],
  },
  {
    id: 'IST-PAT-EGG',
    introducedInRound: 4,
    category: 'ISTOTA',
    name: 'Patogen ze śluzu jaja',
    description: 'Wirus obecny w śluzie uwolnionym po pęknięciu jaja. Analizator rozpoznał ten sam patogen, który wywołał epidemię na początku wyprawy, oraz wykrył w próbce ludzkie DNA.',
    facts: [
      { label: 'WEKTOR', value: 'Śluz wnikający w tkanki' },
      { label: 'CEL', value: 'Układ nerwowy' },
      { label: 'POWIĄZANIE', value: 'Epidemia z początku wyprawy' },
      { label: 'DNA', value: 'Ludzkie' },
    ],
  },
  {
    id: 'BIO-006',
    introducedInRound: 4,
    category: 'ISTOTA',
    name: 'Szczur nr 6',
    description: 'Biomechaniczny Szczur wskazany przez symbol Щр-6, widoczny w podczerwieni na skorupie jaja. Według alternatywnej analizy mógł znieść lub dostarczyć trefne jajo.',
    facts: [
      { label: 'OZNACZENIE', value: 'Щр-6' },
      { label: 'POWIĄZANIE', value: 'Hipotetyczne źródło jaja' },
      { label: 'STATUS', value: 'Nieznany' },
    ],
  },
  {
    id: 'OSO-VON-HENZELT',
    introducedInRound: 4,
    category: 'BOHATER',
    name: 'Von Henzelt',
    description: 'Doktor-inżynier wspomniany przez ocaleńca z Trzynastki. Według jego relacji badał narastające drgania jaja i uznał je za wiadomość rozchodzącą się daleko po Labiryncie.',
    facts: [
      { label: 'FUNKCJA', value: 'Doktor-inżynier' },
      { label: 'BADANIE', value: 'Wibracyjny sygnał jaja' },
      { label: 'STATUS', value: 'Nieznany' },
    ],
  },
  {
    id: 'ART-MIND-THIEF',
    introducedInRound: 4,
    category: 'ARTEFAKT',
    name: 'Myślokradka',
    description: 'Urządzenie widziane w alternatywnej wizji po kontakcie mobilnego Laba ze śluzem. Załoga Trzynastki miała wisieć pod sufitem, połączona z nim pulsującymi kablami.',
    facts: [
      { label: 'ŹRÓDŁO', value: 'Wizja Kozaka' },
      { label: 'WIADOMOŚĆ', value: '„Nie ratujcie nas”' },
      { label: 'STATUS', value: 'Niepotwierdzona' },
    ],
  },
  {
    id: 'ART-NANOBOTS',
    introducedInRound: 4,
    category: 'ARTEFAKT',
    name: 'Nanoboty jednostki bojowej',
    description: 'Nanoboty odseparowane w alternatywnej analizie od części ciekłokrystalicznej. Ich trajektorie miały należeć do jednostki bojowej mniejszej i znacznie szybszej od biomechanicznych Szczurów.',
    facts: [
      { label: 'FORMA', value: 'Nanoboty i część ciekłokrystaliczna' },
      { label: 'FUNKCJA', value: 'Jednostka bojowa' },
      { label: 'STATUS', value: 'Hipoteza z analizy' },
    ],
  },
  {
    id: 'OSO-NEZUMI',
    introducedInRound: 5,
    category: 'BOHATER',
    name: 'Nezumi',
    description: 'Kapitan Szczura nr 16, dotąd wymagający i sprawiedliwy dowódca. W finale przyznaje Kizie, że jajo i embriony były dla Fundacji ważniejsze niż życie załogi; ginie w roztrzaskanym wraku Szesnastki.',
    facts: [
      { label: 'FUNKCJA', value: 'Kapitan Szczura nr 16' },
      { label: 'DECYZJA', value: 'Poświęca załogę dla jaja' },
      { label: 'FINAŁ', value: 'Ginie w roztrzaskanym Szczurze 16' },
    ],
  },
  {
    id: 'IST-ODMIENCY',
    introducedInRound: 5,
    category: 'ISTOTA',
    name: 'Odmieńcy',
    description: 'Kozacy z Trzynastki przemienieni przez śluz z jaja w agresywne, czworonożne istoty przypominające Hiko. Przed zamkniętą śluzą Szczura 16 zatrzymują się i czekają, jakby na rozkaz.',
    facts: [
      { label: 'POCHODZENIE', value: 'Przemienieni Kozacy Trzynastki' },
      { label: 'ZACHOWANIE', value: 'Agresja, ruch na czterech kończynach' },
      { label: 'OBSERWACJA', value: 'Zatrzymują się przed śluzą, wyczekując' },
    ],
  },
  {
    id: 'LOC-SALA-JAJ',
    introducedInRound: 5,
    category: 'MIEJSCE',
    name: 'Sterylna sala z jajami',
    description: 'Alternatywna wizja białej, sterylnej sali z rzędami jaj, z których wychodzą wężyki podłączone do ludzkich ciał oznaczonych logiem Fundacji.',
    facts: [
      { label: 'WYGLĄD', value: 'Sterylnie biała, rzędy jaj' },
      { label: 'POWIĄZANIE', value: 'Ciała ludzkie znaczone logiem Fundacji' },
      { label: 'STATUS', value: 'Niepotwierdzona wizja' },
    ],
  },
  {
    id: 'ART-MINA-SKAFANDRA',
    introducedInRound: 6,
    category: 'ARTEFAKT',
    name: 'Mina ze skafandra',
    description: 'Ładunek wybuchowy użyty przez Kizę do zawalenia sufitu na jednym z odmieńców ścigających ją przez korytarze Labiryntu.',
    facts: [
      { label: 'UŻYCIE', value: 'Zawalenie sufitu na odmieńcu' },
      { label: 'EFEKT', value: 'Skuteczne spowolnienie pościgu' },
    ],
  },
  {
    id: 'BIO-WAZ-RODZIC',
    introducedInRound: 6,
    category: 'ISTOTA',
    name: 'Wielki wąż',
    description: 'Olbrzymi, brunatny wąż widziany w alternatywnej relacji z kolejki 6 — wyłania się z gruzowiska za odmieńcami, patrzy z zaciekawieniem, po czym rusza w pogoń za Szczurem unoszącym jajo. Sugerowany jako rodzic odmieńców i jaja.',
    facts: [
      { label: 'WYGLĄD', value: 'Olbrzymi, brunatny wąż' },
      { label: 'RELACJA', value: 'Możliwy rodzic odmieńców i jaja' },
      { label: 'STATUS', value: 'Niepotwierdzona hipoteza' },
    ],
  },
  {
    id: 'ART-JETPACK',
    introducedInRound: 7,
    category: 'ARTEFAKT',
    name: 'Jetpack Kizy',
    description: 'Napęd osobistego skafandra, dzięki któremu Kiza może dogonić Szczura nr 16, przebić się do jego wnętrza albo pokonać skróty Labiryntu. W zgłoszeniach kolejki 7 staje się kluczowym narzędziem pościgu.',
    facts: [
      { label: 'FUNKCJA', value: 'Lot i szybki pościg' },
      { label: 'UŻYTKOWNICZKA', value: 'Kiza' },
      { label: 'STATUS', value: 'Sprawny, lecz ograniczony zapasem energii' },
    ],
  },
  {
    id: 'IST-FUNDACYJNY-KOT',
    introducedInRound: 7,
    category: 'ISTOTA',
    name: 'Fundacyjny K0T',
    description: 'Podejrzany obiekt lub mechanizm w kształcie Kota, wspomniany w zgłoszeniach kolejki 7. Jedna z relacji sugeruje, że to człowiek sterujący konstrukcją z wnętrza, co podważa dotychczasowy obraz Kota jako pojedynczego drapieżnika.',
    facts: [
      { label: 'POCHODZENIE', value: 'Fundacja' },
      { label: 'NATURA', value: 'Nieustalona: istota albo mechanizm' },
      { label: 'POWIĄZANIE', value: 'Granatowe ślady i jajo' },
      { label: 'STATUS', value: 'Hipoteza z alternatywnej relacji' },
    ],
  },
  {
    id: 'LOC-BRAMA-GNIAZDA',
    introducedInRound: 7,
    category: 'MIEJSCE',
    name: 'Wrota Gniazda',
    description: 'Monumentalna brama prowadząca do metropolii pośrodku Labiryntu. W zgłoszeniach kolejki 7 Szczur nr 16 zbliża się do niej z pełną prędkością, a załoga nie ma pewności, czy Gniazdo jest schronieniem, pułapką czy centrum spisku Fundacji.',
    facts: [
      { label: 'FUNKCJA', value: 'Wejście do Gniazda' },
      { label: 'ZAGROŻENIE', value: 'Szczur nr 16 może nie wyhamować' },
      { label: 'TAJEMNICA', value: 'Nieznany status mieszkańców i Fundacji' },
    ],
  },
  {
    id: 'ART-EMBRIONY',
    introducedInRound: 8,
    category: 'ISTOTA',
    name: 'Embriony z jaja',
    description: 'Istoty rozwijające się w jajach przewożonych przez Szczury. Według ostatnich słów Nezumiego mogą przetrwać w słońcu i żyć na powierzchni, co miało być celem eksperymentów Fundacji.',
    facts: [
      { label: 'POCHODZENIE', value: 'Jajo z doliny' },
      { label: 'ODPORNOŚĆ', value: 'Mogą żyć w słońcu' },
      { label: 'STATUS', value: 'Nieznany po katastrofie' },
    ],
  },
  {
    id: 'LOC-WRAK-016',
    introducedInRound: 8,
    category: 'MIEJSCE',
    name: 'Wrak Szesnastki',
    description: 'Miejsce katastrofy kilkanaście metrów przed wrotami Gniazda. W zderzeniu ranni załoganci zostali uwięzieni w roztrzaskanym Szczurze, a ładunek z jajem przepadł.',
    facts: [
      { label: 'LOKALIZACJA', value: 'Przed wrotami Gniazda' },
      { label: 'STAN', value: 'Pogruchotany wrak' },
      { label: 'ŁADUNEK', value: 'Zniszczony lub utracony' },
    ],
  },
]

export function getNewestWorldEntries() {
  return [...worldEntries].sort(
    (first, second) => second.introducedInRound - first.introducedInRound,
  )
}
