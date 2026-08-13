export interface WorldFact {
  label: string
  value: string
}

export interface WorldEntry {
  id: string
  category: 'ISTOTA' | 'BOHATER' | 'ARTEFAKT' | 'MIEJSCE'
  name: string
  description: string
  facts: WorldFact[]
}

export const worldEntries: WorldEntry[] = [
  {
    id: 'BIO-016',
    category: 'ISTOTA',
    name: 'Biomechaniczny Szczur nr 16',
    description: 'Żywy statek i dom dla trzystu załogantów. Przemierza Labirynt, zbierając zasoby dla Gniazda. Alternatywne relacje z kolejki 4 ostrzegają przed utratą kontroli nad Szczurem albo atakiem w jego wnętrzu.',
    facts: [
      { label: 'ZAŁOGA', value: '300 osób' },
      { label: 'FUNKCJA', value: 'Ekspedycyjna' },
      { label: 'OSTRZEŻENIE', value: 'Możliwy atak lub utrata kontroli' },
    ],
  },
  {
    id: 'OSO-001',
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
    category: 'ISTOTA',
    name: 'Kot',
    description: 'Legendarny drapieżnik Labiryntu. W pobliżu zawaliska odnaleziono ślady wielkich pazurów, pomruki i fragment kociego wąsa. Relacje z kolejki 4 łączą go z jajami, ich sygnałem oraz atakami na biomechaniczne Szczury.',
    facts: [
      { label: 'STATUS', value: 'Niepotwierdzony' },
      { label: 'ŚLADY', value: 'Pazury, pomruki, koci wąs' },
      { label: 'RELACJA', value: 'Może wyczuwać jaja z daleka' },
    ],
  },
  {
    id: 'LOC-VALLEY-SUN',
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
    category: 'ARTEFAKT',
    name: 'Granatowe włókna',
    description: 'Nieznana struktura odnaleziona w rumowisku. Mogą być fragmentem sztandaru, liną albo częścią organizmu.',
    facts: [
      { label: 'FORMA', value: 'Włókna, lina lub kłąb' },
      { label: 'STATUS', value: 'Nierozpoznane' },
    ],
  },
  {
    id: 'OSO-HIKO',
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
    category: 'ARTEFAKT',
    name: 'Nanoboty jednostki bojowej',
    description: 'Nanoboty odseparowane w alternatywnej analizie od części ciekłokrystalicznej. Ich trajektorie miały należeć do jednostki bojowej mniejszej i znacznie szybszej od biomechanicznych Szczurów.',
    facts: [
      { label: 'FORMA', value: 'Nanoboty i część ciekłokrystaliczna' },
      { label: 'FUNKCJA', value: 'Jednostka bojowa' },
      { label: 'STATUS', value: 'Hipoteza z analizy' },
    ],
  },
]