export interface WorldFact {
  label: string
  value: string
}

export interface WorldEntry {
  id: string
  category: 'ISTOTA' | 'BOHATER' | 'ARTEFAKT'
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
    description: 'Nieznane znalezisko z doliny pod sztucznym słońcem. W jego wnętrzu odnotowano oznaki życia.',
    facts: [
      { label: 'POCHODZENIE', value: 'Nieznane' },
      { label: 'STATUS', value: 'W magazynie' },
    ],
  },
]