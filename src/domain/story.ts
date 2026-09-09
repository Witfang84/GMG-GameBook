export type ContestStatus = 'open' | 'between-rounds' | 'completed'
export type RoundStatus = 'collecting-submissions' | 'option-selected' | 'completed'
export type SubmissionStatus =
  | 'pending'
  | 'winner'
  | 'rejected'
  | 'unchosen-option'
  | 'withdrawn'

import { openingSubmissions, roundSubmissions } from './submissions'

export interface Contest {
  id: string
  title: string
  description: string
  status: ContestStatus
}

export interface OpeningParagraph {
  id: string
  text: string
  authorName: string
  publishedAt: string
}

export interface Option {
  id: string
  roundId: string
  label: '1' | '2' | '3'
  text: string
  selectedAt?: string
}

export interface Submission {
  id: string
  roundId: string
  optionId: string
  authorName: string
  text: string
  status: SubmissionStatus
  submittedAt: string
}

export interface OpeningSubmission {
  id: string
  queueNumber: number
  authorName: string
  text: string
  status: SubmissionStatus
}

export interface Round {
  id: string
  number: number
  parentCanonParagraphId: string
  prompt?: string
  status: RoundStatus
  createdAt: string
  submissionDeadline?: string
  decidedAt?: string
  decidedBy?: string
}

export interface CanonEntry {
  sequenceNumber: number
  paragraphId: string
  chosenOptionId: string
}

export interface StoryData {
  contest: Contest
  openingParagraph: OpeningParagraph
  rounds: Round[]
  options: Option[]
  openingSubmissions: OpeningSubmission[]
  submissions: Submission[]
  canonEntries: CanonEntry[]
}

export const story: StoryData = {
  contest: {
    id: 'szczur-nr-16',
    title: 'Szczur nr 16',
    description:
      'Wspólnie pisana science-fiction paragrafówka o załodze biomechanicznego Szczura przemierzającego Nieskończony Labirynt.',
    status: 'completed',
  },
  openingParagraph: {
    id: 'opening',
    authorName: 'Kubulozaurus.Rex',
    publishedAt: '2020-07-19T21:00:00Z',
    text: 'Jesteśmy dzielną załogą Szczura nr 16. Pracuje i żyje nas w tym ogromnym biomechanicznym gryzoniu 300 ludzi. Chodzimy nim po Nieskończonym Labiryncie w Fundacji Rozwoju. Szukamy żywności i zasobów, by wrócić z nimi do Gniazda. To metropolia pośrodku Labiryntu, baza dla setek Szczurów takich jak nasz. Nie bój się Kota, to tylko mit.',
  },
  rounds: [
    {
      id: 'round-2',
      number: 2,
      parentCanonParagraphId: 'opening-submission-5',
      prompt: 'Kiza, jesteś doświadczoną szczurzą załogantką i pierwszym oficerem kapitana Nezumiego. Wracacie Szczurem nr 16 z czteromiesięcznej tułaczki. Epidemia nieznanej choroby zabiła sześćdziesięciu załogantów, lecz później znaleźliście żyzną dolinę pod sztucznym słońcem, pełną jadalnych owoców, korzeni, ziół i ryb. Odkryliście też wielkie jajo, w którym odnotowaliście życie. Szczur nie chciał się do niego zbliżyć, a po załadowaniu jaja do ochronnego magazynu przyspieszył, jakby pragnął jak najszybciej dostarczyć je do Gniazda. Dwa dni przed domem drogę blokuje zawalony korytarz. Pod kamieniami wystają strzępy granatowego materiału, a ściany noszą ślady wielkich pazurów. Nezumi wysyła ciebie i trójkę Kozaków, by zbadać miejsce w świetle Szczura; jednemu z nich każe wziąć miotacz ognia.',
      status: 'completed',
      createdAt: '2020-07-19T21:00:00Z',
      decidedAt: '2020-07-26T22:00:00Z',
      decidedBy: 'Organizator',
    },
    {
      id: 'round-3',
      number: 3,
      parentCanonParagraphId: 'submission-2-8',
      status: 'completed',
      createdAt: '2020-07-26T22:00:00Z',
      decidedAt: '2020-08-02T22:00:00Z',
      decidedBy: 'Organizator',
    },
    {
      id: 'round-4',
      number: 4,
      parentCanonParagraphId: 'submission-3-1',
      status: 'completed',
      createdAt: '2020-08-02T22:00:00Z',
      submissionDeadline: '2026-08-09T20:00:00Z',
      decidedAt: '2026-08-09T20:00:00Z',
      decidedBy: 'Organizator',
    },
    {
      id: 'round-5',
      number: 5,
      parentCanonParagraphId: 'submission-4-5',
      status: 'completed',
      createdAt: '2026-08-09T20:00:00Z',
      submissionDeadline: '2026-08-16T20:00:00Z',
      decidedAt: '2026-08-16T20:00:00Z',
      decidedBy: 'Organizator',
    },
    {
      id: 'round-6',
      number: 6,
      parentCanonParagraphId: 'submission-5-9',
      status: 'completed',
      createdAt: '2026-08-16T20:00:00Z',
      submissionDeadline: '2026-08-24T20:00:00Z',
      decidedAt: '2026-08-24T20:00:00Z',
      decidedBy: 'Organizator',
    },
    {
      id: 'round-7',
      number: 7,
      parentCanonParagraphId: 'submission-6-7',
      status: 'completed',
      createdAt: '2026-08-24T20:00:00Z',
      submissionDeadline: '2026-08-31T20:00:00Z',
      decidedAt: '2026-08-31T20:00:00Z',
      decidedBy: 'Organizator',
    },
    {
      id: 'round-8',
      number: 8,
      parentCanonParagraphId: 'submission-7-1',
      prompt: 'Padasz na pancerz dziobu. Wbijasz palce pod właz awaryjny. Prostujesz nogi i wspomagana ciągiem jetpacka wyrywasz stal z nitów. Wpadasz na mostek. Na huk wyłomu Nezumi unosi dymiący rewolwer znad martwego sternika i z obłędem w oczach mierzy w ciebie. Za jego plecami, w grubym przeszkleniu rosną wrota Gniazda. Maszyna nie wyhamuje.',
      status: 'completed',
      createdAt: '2026-08-31T20:00:00Z',
      submissionDeadline: '2026-09-06T20:00:00Z',
      decidedAt: '2026-09-06T20:00:00Z',
      decidedBy: 'Organizator',
    },
  ],
  options: [
    {
      id: 'option-2-1',
      roundId: 'round-2',
      label: '1',
      text: 'Namawiasz kapitana, by obrać dłuższą drogę i nie ryzykować ładunku. Niech z Gniazda przyślą tu świeżego Szczura z załogą.',
    },
    {
      id: 'option-2-2',
      roundId: 'round-2',
      label: '2',
      text: 'Wychodzisz z trójką Kozaków i za pomocą mech-ramienia próbujecie z odległości uwolnić materiał spod gruzu.',
      selectedAt: '2020-07-26T22:00:00Z',
    },
    {
      id: 'option-2-3',
      roundId: 'round-2',
      label: '3',
      text: 'Prosisz Nezumi, by pozwolił ci iść samej w pajęczym skafandrze. Pójdziesz za śladami pazurów, by zrobić rekonesans.',
    },
    {
      id: 'option-3-1',
      roundId: 'round-3',
      label: '1',
      text: 'Zgłaszasz kapitanowi odkrycie i prosisz o posiłki. Czekacie na ich przybycie, rozglądając się.',
    },
    {
      id: 'option-3-2',
      roundId: 'round-3',
      label: '2',
      text: 'Składasz raport i rozkazujesz przyspieszyć pracę mech-ramienia: „Tam może jeszcze ktoś żyć!”',
      selectedAt: '2020-08-02T22:00:00Z',
    },
    {
      id: 'option-3-3',
      roundId: 'round-3',
      label: '3',
      text: 'Mech-ramię ma pracować dalej w poszukiwaniu ocaleńców z 13stki, ale ty w kocim skafandrze po suficie starasz się dostać na drugą stronę zawaliska.',
    },
    {
      id: 'option-4-1',
      roundId: 'round-4',
      label: '1',
      text: 'Skupiasz się na jak najszybszym doprowadzeniu ocalonego do lepszego stanu, by mógł powiedzieć więcej.',
      selectedAt: '2026-08-09T20:00:00Z',
    },
    {
      id: 'option-4-2',
      roundId: 'round-4',
      label: '2',
      text: '„13” na wykopanym hełmie przykuwa twą uwagę. Dostrzegasz ślady nieznanego mecha-śluzu i przywołujesz Kozaka z mobilnym labem.',
    },
    {
      id: 'option-4-3',
      roundId: 'round-4',
      label: '3',
      text: 'Słyszysz metaliczną eksplozję za plecami. Burta Szczura 16 jest rozrywana od środka, więc pędzisz z ratunkiem.',
    },
    {
      id: 'option-5-1',
      roundId: 'round-5',
      label: '1',
      text: 'Cofając się o parę kroków, bierzesz na muszkę Hiko, a pozostali Kozacy idą za twoim śladem. Mówisz do Hiko: „Tylko spokojnie!”, ale on, już na czworaka, skacze na ciebie, mając w oczach szaleńczy apetyt.',
    },
    {
      id: 'option-5-2',
      roundId: 'round-5',
      label: '2',
      text: 'Hiko skacze do szyi najbliższego z twojej załogi, więc pozostali rozstrzeliwują przemienionego kolegę. Jego krew i resztki są wszędzie, docierają także do ciał twoich Kozaków. Ty zdążyłaś odskoczyć. Czy ktoś jeszcze?... Przemiana trafionych, która dzieje się na twoich oczach, jest niemal natychmiastowa. Pędzisz co sił z powrotem do Szczura.',
      selectedAt: '2026-08-16T20:00:00Z',
    },
    {
      id: 'option-5-3',
      roundId: 'round-5',
      label: '3',
      text: 'Reagujesz instynktownie — uruchamiasz swój kombinezon i wystrzeliwujesz jeden pocisk koło ucha Hiko, po czym wskakujesz na ścianę, a stamtąd na sufit — chcesz go odciągnąć od pozostałych. Gdy oszalały Hiko-czworonożny drapieżnik skacze za tobą, pędzisz po suficie za gruzowisko, krzycząc przez radio: „Wycofać się do Szczura i raportować Nezumiemu!”. Myśl: „Jak to się stało, że ocalony Kozak uchronił się od przemiany?” — gdy chcesz o tym powiedzieć przez radio, Hiko, wyjąc wściekle, rzuca się na ciebie.',
    },
    {
      id: 'option-6-1',
      roundId: 'round-6',
      label: '1',
      text: 'Odmieńcy ruszają na ciebie, a ty uruchamiasz kombinezon i wskakujesz na startującego całą wstecz Szczura. Wiesz, że jeśli się rozpędzi, twoje lepkie rękawice nie utrzymają cię. Ale może przynajmniej oddalisz się od pogoni czworonogów. Albo któryś ze skurwieli w środku otworzy ci właz! „Wyloty turbo!” — myślisz. „Szczur musi wycofać, obrócić się, by uruchomić maksymalną prędkość. Może zdążę!”. Pokonując rosnący pęd, przesuwasz się na rufę i wślizgujesz do wnętrza Szczura tuż, zanim Nezumi uruchamia turbo.',
    },
    {
      id: 'option-6-2',
      roundId: 'round-6',
      label: '2',
      text: 'Szczur 16 odpala silniki i unosi się do prędkiej ewakuacji. Reflektory oświetlają zbiegających z gruzu kolejnych załogantów 13stki, a za nimi sunie coś olbrzymiego, wielokończynowego, ciemnego ciemnością gęstą jak błoto... Za pomocą swojego pajęczego skafandra wskakujesz na ścianę i rozpoczynasz desperacką ucieczkę przed chmarą wygłodzonych czworonożnych drapieżników oraz... czegoś, co człapie za nimi.',
      selectedAt: '2026-08-24T20:00:00Z',
    },
    {
      id: 'option-6-3',
      roundId: 'round-6',
      label: '3',
      text: 'Gdy Szczur wrzuca całą wstecz, odmieńcy rzucają się w pogoń. „Już po mnie” — myślisz... Ale oni cię mijają! Pędzą za próbującym się obrócić w wąskim korytarzu Szczurem. „Jak to?!” Stoisz oniemiała, aż słyszysz, jak coś znacznie cięższego schodzi z gruzu za twoimi plecami. Spoglądasz w oczy olbrzymiego, brunatnego węża. Patrzy na ciebie z zaciekawieniem, przekrzywia łeb, po czym skacze za swoimi czworonożnymi dziećmi w pogoni za Szczurem, który unosi jego jajo. Zostajesz sama, po chwili jest ciemno, a ty nie wiesz, czy to ci się nie przyśniło...',
    },
    {
      id: 'option-7-1',
      roundId: 'round-7',
      label: '1',
      text: 'Odpalasz całą moc skafandra, ryzykując, że wypali się on, zanim dopędzisz Szczura, i gnasz. Na szczęście od małego uwielbiałaś łazić po Labiryncie i potrafisz intuicyjnie rozpoznawać skróty w korytarzach — Szczur by się nie zmieścił, ale ty jak najbardziej. Po jednym z takich korytarzy bingo! Wylatujesz z niego akurat, by dostrzec, że twoja ukochana jednostka zaraz cię będzie mijać w drodze do Gniazda; nie gonią go już mutanci.',
    },
    {
      id: 'option-7-2',
      roundId: 'round-7',
      label: '2',
      text: 'Zawalenie sufitu odkryło ciasny korytarz, który na oko zmierza w kierunku w sam raz na Gniazdo — idąc nim, może zdążysz przeciąć drogę Szczurowi!',
    },
    {
      id: 'option-7-3',
      roundId: 'round-7',
      label: '3',
      text: 'Spod zmiażdżonego Kota wydostaje się histeryzujący mężczyzna w białym mundurze Fundacji. Ma na plecach jetpack i chyba, będąc w Kocie, złamał rękę. Patrzycie sobie w oczy: – To... mechanizm?! — pytasz zszokowana. Facet nie odpowiada, niezręcznie lewą ręką próbuje odpalić konsolę jetpacka i uciec. – Ty tym sterowałeś? Odpala się jetpack, ucieknie ci — reakcja — strzelasz do mężczyzny. Wypuszczony z martwej dłoni joystick wyłącza napęd. Po założeniu jetpacka i upewnieniu się, że z „pilota” Kota niczego się nie dowiesz, odpalasz turbo i pędzisz przez korytarze na spotkanie ze Szczurem...',
      selectedAt: '2026-08-31T20:00:00Z',
    },
    {
      id: 'option-8-1',
      roundId: 'round-8',
      label: '1',
      text: 'Natychmiastowo uruchamiasz jetpack i wylatujesz z mostka poza Szczura w ostatniej chwili przed grzmotem uderzenia. Szczur z całym impetem uderza we wrota Gniazda, roztrzaskując tak siebie, jak i je. Unosząc się w powietrzu, widzisz, jak do miejsca wypadku zaczynają się zbliżać mieszkańcy osady.',
    },
    {
      id: 'option-8-2',
      roundId: 'round-8',
      label: '2',
      text: 'Odpalasz radio na otwarty kanał i najszybciej, jak się da, raportujesz: „Na pokładzie 16stki skażone jajo! Mutacje! Nezumi zarażony! Szczury stworzone przez ...”. Jakby obłęd Nezumiego zniknął — w ostatniej chwili próbuje wyhamować pojazd przed uderzeniem. Ale było za późno. Potężny trzask — tracisz przytomność…',
    },
    {
      id: 'option-8-3',
      roundId: 'round-8',
      label: '3',
      text: 'Coś poza mostkiem, pewnie w ładowni, wydarza się! Nie wiesz — to jakieś przeczucie, ułamek sekundy — przed chwilą patrzyłaś na nieubłaganie zbliżającą się katastrofę, a teraz Szczur zatrzymuje się zaledwie kilkanaście metrów od wrót Gniazda. Siła rozpędu rzuca cię na przednie okno jak lalkę. Na szczęście masz skafander. Nezumi zostaje rozpłaszczony na kokpicie. Otwierasz oczy, by zobaczyć, co zatrzymało Szczura...',
      selectedAt: '2026-09-06T20:00:00Z',
    },
  ],
  openingSubmissions,
  submissions: roundSubmissions,
  canonEntries: [
    {
      sequenceNumber: 2,
      paragraphId: 'submission-2-8',
      chosenOptionId: 'option-2-2',
    },
    {
      sequenceNumber: 3,
      paragraphId: 'submission-3-1',
      chosenOptionId: 'option-3-2',
    },
    {
      sequenceNumber: 4,
      paragraphId: 'submission-4-5',
      chosenOptionId: 'option-4-1',
    },
    {
      sequenceNumber: 5,
      paragraphId: 'submission-5-9',
      chosenOptionId: 'option-5-2',
    },
    {
      sequenceNumber: 6,
      paragraphId: 'submission-6-7',
      chosenOptionId: 'option-6-2',
    },
    {
      sequenceNumber: 7,
      paragraphId: 'submission-7-1',
      chosenOptionId: 'option-7-3',
    },
    {
      sequenceNumber: 8,
      paragraphId: 'submission-8-1',
      chosenOptionId: 'option-8-3',
    },
  ],
}

export function getRoundOptions(data: StoryData, roundId: string) {
  return data.options.filter((option) => option.roundId === roundId)
}

export function getSelectedOption(data: StoryData, roundId: string) {
  return getRoundOptions(data, roundId).find((option) => option.selectedAt)
}

export function getRoundSubmissions(data: StoryData, roundId: string) {
  return data.submissions.filter((submission) => submission.roundId === roundId)
}

export function getActiveRound(data: StoryData) {
  return data.rounds.find((round) => round.status === 'collecting-submissions')
}

export function getCanonicalEntries(data: StoryData) {
  return [...data.canonEntries].sort(
    (first, second) => first.sequenceNumber - second.sequenceNumber,
  )
}

export function getSubmission(data: StoryData, submissionId: string) {
  return data.submissions.find((submission) => submission.id === submissionId)
}

export function validateStory(data: StoryData) {
  const errors: string[] = []
  const canonicalParagraphIds = new Set<string>()
  const sequenceNumbers = new Set<number>()

  for (const round of data.rounds) {
    const options = getRoundOptions(data, round.id)
    const selectedOptions = options.filter((option) => option.selectedAt)
    const roundSubmissions = getRoundSubmissions(data, round.id)
    const winners = roundSubmissions.filter(
      (submission) => submission.status === 'winner',
    )

    for (const submission of roundSubmissions) {
      const option = options.find((item) => item.id === submission.optionId)

      if (!option) {
        errors.push(
          `Zgłoszenie ${submission.id} musi być przypisane do opcji rundy ${round.number}.`,
        )
      }
    }

    if (options.length !== 3) {
      errors.push(`Runda ${round.number} musi mieć dokładnie trzy opcje.`)
    }

    if (selectedOptions.length > 1) {
      errors.push(`Runda ${round.number} ma więcej niż jedną wybraną opcję.`)
    }

    if (winners.length > 1) {
      errors.push(`Runda ${round.number} ma więcej niż jedno zwycięskie zgłoszenie.`)
    }

    if (winners.length === 1 && selectedOptions.length !== 1) {
      errors.push(`Zwycięzca rundy ${round.number} wymaga wybranej opcji.`)
    }

    if (
      winners.length === 1 &&
      selectedOptions.length === 1 &&
      winners[0].optionId !== selectedOptions[0].id
    ) {
      errors.push(
        `Zwycięzca rundy ${round.number} musi należeć do wybranej opcji.`,
      )
    }
  }

  for (const entry of data.canonEntries) {
    const paragraph = getSubmission(data, entry.paragraphId)
    const option = data.options.find((item) => item.id === entry.chosenOptionId)

    if (sequenceNumbers.has(entry.sequenceNumber)) {
      errors.push(`Sekwencja kanonu ${entry.sequenceNumber} nie jest unikalna.`)
    }
    sequenceNumbers.add(entry.sequenceNumber)

    if (!paragraph || paragraph.status !== 'winner') {
      errors.push(`Wpis kanonu ${entry.sequenceNumber} nie wskazuje zwycięzcy.`)
      continue
    }

    if (!option || option.id !== paragraph.optionId || !option.selectedAt) {
      errors.push(
        `Wpis kanonu ${entry.sequenceNumber} nie wskazuje wybranej opcji zwycięzcy.`,
      )
    }

    if (canonicalParagraphIds.has(paragraph.id)) {
      errors.push(`Paragraf ${paragraph.id} pojawia się w kanonie więcej niż raz.`)
    }
    canonicalParagraphIds.add(paragraph.id)
  }

  return errors
}

const validationErrors = validateStory(story)

if (validationErrors.length > 0) {
  throw new Error(`Niepoprawne dane historii:\n${validationErrors.join('\n')}`)
}
