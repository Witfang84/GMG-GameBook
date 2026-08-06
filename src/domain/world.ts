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
    description: 'Żywy statek i dom dla trzystu załogantów. Przemierza Labirynt, zbierając zasoby dla Gniazda.',
    facts: [
      { label: 'ZAŁOGA', value: '300 osób' },
      { label: 'FUNKCJA', value: 'Ekspedycyjna' },
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
    description: 'Nieznane znalezisko z doliny pod sztucznym słońcem. Szczur nr 16 nie chciał się do niego zbliżyć, a w jego wnętrzu odnotowano oznaki życia.',
    facts: [
      { label: 'POCHODZENIE', value: 'Nieznane' },
      { label: 'STATUS', value: 'W magazynie' },
    ],
  },
  {
    id: 'BIO-013',
    category: 'ISTOTA',
    name: 'Szczur nr 13',
    description: 'Zaginiony biomechaniczny Szczur, którego rozszarpany sztandar odnaleziono pod zawaliskiem. Los jego załogi pozostaje nieznany.',
    facts: [
      { label: 'STATUS', value: 'Zaginiony / zniszczony' },
      { label: 'LOKALIZACJA', value: 'Zawalony korytarz Labiryntu' },
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
    description: 'Legendarny drapieżnik Labiryntu. W pobliżu zawaliska odnaleziono ślady wielkich pazurów, pomruki i fragment kociego wąsa.',
    facts: [
      { label: 'STATUS', value: 'Niepotwierdzony' },
      { label: 'ŚLADY', value: 'Pazury, pomruki, koci wąs' },
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
]