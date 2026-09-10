import { getSubmission, story as sourceStory } from './story'

export type ContinuationChoice = {
  id: string
  label: '1' | '2' | '3'
  text: string
  canonical: boolean
  sourceSubmissionIds: string[]
}

export type ContinuationParagraph = {
  id: string
  roundNumber: number
  authorName: string
  text: string
  sourceSubmissionIds: string[]
}

export type ContinuationRound = {
  id: string
  number: number
  parentParagraphId: string
  prompt: string
  selectedOptionId: string
  paragraphId: string
  options: ContinuationChoice[]
}

export type StoryInstance = {
  id: string
  title: string
  status: 'draft'
  sourceStoryId: string
  sourceCanonParagraphId: string
  sourceCanonSequence: number
  rounds: ContinuationRound[]
  paragraphs: ContinuationParagraph[]
}

/**
 * Niezależna instancja kontynuacji. Oryginalny kanon jest tylko źródłem startowym.
 */
export const continuationInstance: StoryInstance = {
  id: 'szczur-nr-16-after-impact-v1',
  title: 'Szczur nr 16: po katastrofie',
  status: 'draft',
  sourceStoryId: 'szczur-nr-16',
  sourceCanonParagraphId: 'submission-8-1',
  sourceCanonSequence: 8,
  rounds: [
    {
      id: 'continuation-round-9',
      number: 9,
      parentParagraphId: 'submission-8-1',
      prompt: 'Wrota Gniazda pozostają zamknięte. Spod nich wychodzą światła patrolu, a przez radio odzywa się beznamiętny głos: „Zidentyfikować ładunek. Nie zbliżać się do wraku”. Nezumi już nie odpowiada. W pogruchotanej ładowni coś jednak porusza się w rytmie, który przypomina mruczenie.',
      selectedOptionId: 'continuation-option-9-1',
      paragraphId: 'continuation-paragraph-9-1',
      options: [
        {
          id: 'continuation-option-9-1',
          label: '1',
          text: 'Otwierasz awaryjny kanał i nadajesz pełny raport: skażone jajo, mutacje, śmierć załogi i rozkazy Nezumiego. Żądasz kwarantanny dla wraku.',
          canonical: true,
          sourceSubmissionIds: ['submission-8-1', 'submission-8-2'],
        },
        {
          id: 'continuation-option-9-2',
          label: '2',
          text: 'Wychodzisz z wraku z bronią w dłoni i próbujesz zatrzymać patrol. Nikt nie dotknie ładowni, nawet jeśli Gniazdo uzna cię za skażoną.',
          canonical: false,
          sourceSubmissionIds: ['submission-8-3', 'submission-8-7'],
        },
        {
          id: 'continuation-option-9-3',
          label: '3',
          text: 'Wracasz do ładowni, zanim światła patrolu dosięgną wraku. Chcesz sprawdzić, co zatrzymało Szczura i czy z jaja cokolwiek jeszcze się wykluło.',
          canonical: false,
          sourceSubmissionIds: ['submission-8-4', 'submission-8-6'],
        },
      ],
    },
    {
      id: 'continuation-round-10',
      number: 10,
      parentParagraphId: 'continuation-paragraph-9-1',
      prompt: 'Raport przechodzi przez wszystkie kanały Gniazda, ale odpowiedź przychodzi tylko z jednego: „Procedura 33. Transport próbki do sektora białego”. Patrol otacza wrak. Załoga chce ratunku, strażnicy pytają wyłącznie o jajo, a za ich maskami widzisz pionowe źrenice.',
      selectedOptionId: 'continuation-option-10-1',
      paragraphId: 'continuation-paragraph-10-1',
      options: [
        {
          id: 'continuation-option-10-1',
          label: '1',
          text: 'Oddajesz strażnikom zapis z mostka, ale nie pozwalasz im wejść do ładowni bez ciebie. Wchodzisz do Gniazda jako świadek i zakładniczka własnego raportu.',
          canonical: true,
          sourceSubmissionIds: ['submission-7-4', 'submission-8-8'],
        },
        {
          id: 'continuation-option-10-2',
          label: '2',
          text: 'Wykorzystujesz zamieszanie i uciekasz pod bramę, w stary korytarz serwisowy. Gniazdo może być pułapką, ale odpowiedź musi znajdować się pod jego podłogą.',
          canonical: false,
          sourceSubmissionIds: ['submission-6-1', 'submission-7-2'],
        },
        {
          id: 'continuation-option-10-3',
          label: '3',
          text: 'Wzywasz ocalałych Kozaków i każesz im przejąć wrak. Jeśli Gniazdo chce jaja, będzie musiało najpierw przyznać, dlaczego tak bardzo go potrzebuje.',
          canonical: false,
          sourceSubmissionIds: ['submission-7-3', 'submission-7-7', 'submission-8-7'],
        },
      ],
    },
    {
      id: 'continuation-round-11',
      number: 11,
      parentParagraphId: 'continuation-paragraph-10-1',
      prompt: 'Sektor biały nie jest szpitalem. Za szybą stoją rzędy jaj, a pod każdym z nich leży człowiek podłączony do kabli. Na monitorze powtarza się komunikat: „Czynnik X — adaptacja do powierzchni”. Na końcu listy widnieje numer Szczura 16 i twoje imię.',
      selectedOptionId: 'continuation-option-11-3',
      paragraphId: 'continuation-paragraph-11-3',
      options: [
        {
          id: 'continuation-option-11-1',
          label: '1',
          text: 'Czytasz archiwum do końca. Chcesz wiedzieć, kto stworzył Szczury, zanim zdecydujesz, czy w ogóle warto ratować Gniazdo.',
          canonical: false,
          sourceSubmissionIds: ['submission-4-1', 'submission-4-2', 'submission-4-9'],
        },
        {
          id: 'continuation-option-11-2',
          label: '2',
          text: 'Podłączasz swój skafander do systemu. Jeśli jesteś odporna na śluz, może zdołasz odczytać dane, których Fundacja nie chciała pokazać żadnemu człowiekowi.',
          canonical: false,
          sourceSubmissionIds: ['submission-6-5', 'submission-6-6', 'submission-8-5'],
        },
        {
          id: 'continuation-option-11-3',
          label: '3',
          text: 'Przejmujesz nadajnik sektora i wypuszczasz archiwum na wszystkie kanały Gniazda. Niech każdy usłyszy, że „Kot” był nazwą procedury, a nie mitem.',
          canonical: true,
          sourceSubmissionIds: ['submission-4-3', 'submission-4-7', 'submission-8-3'],
        },
      ],
    },
    {
      id: 'continuation-round-12',
      number: 12,
      parentParagraphId: 'continuation-paragraph-11-3',
      prompt: 'Gniazdo słyszy prawdę. W sektorze białym otwierają się kolejne jaja, a przez ściany odpowiadają im odległe pomruki. Strażnicy odcinają zasilanie, lecz w ładowni wraku pozostał jeden pojemnik. Nie ma pewności, czy znajduje się w nim embrion, próbka X, czy tylko śluz, który pamięta ludzkie DNA.',
      selectedOptionId: 'continuation-option-12-1',
      paragraphId: 'continuation-paragraph-12-1',
      options: [
        {
          id: 'continuation-option-12-1',
          label: '1',
          text: 'Wracasz do wraku i niszczysz pojemnik razem z własnym zapisem identyfikacyjnym. Gniazdo straci możliwość odtworzenia eksperymentu, nawet jeśli ty nie przeżyjesz.',
          canonical: true,
          sourceSubmissionIds: ['submission-8-1', 'submission-8-3', 'submission-8-6'],
        },
        {
          id: 'continuation-option-12-2',
          label: '2',
          text: 'Zabierasz pojemnik ze sobą i ruszasz ku powierzchni. Jeśli embriony naprawdę mogą żyć w słońcu, być może właśnie zaczynasz pierwszą wolną osadę.',
          canonical: false,
          sourceSubmissionIds: ['submission-8-5', 'submission-8-6'],
        },
        {
          id: 'continuation-option-12-3',
          label: '3',
          text: 'Oddajesz pojemnik mieszkańcom Gniazda pod warunkiem, że otworzą wszystkie archiwa i wypuszczą załogi spod kontroli Fundacji.',
          canonical: false,
          sourceSubmissionIds: ['submission-7-4', 'submission-7-7', 'submission-8-7'],
        },
      ],
    },
  ],
  paragraphs: [
    {
      id: 'continuation-paragraph-9-1',
      roundNumber: 9,
      authorName: 'Instancja robocza',
      text: 'Przełączasz radio na kanał ogólny. Głos drży ci tylko przy pierwszym słowie. Potem mówisz wszystko: o Trzynastce, o śluzie, o odmieńcach, o tym, że Nezumi poświęcił załogę dla ładunku. Nadajesz również ostatnie zdanie kapitana — embriony mogą żyć w słońcu. Przez chwilę odpowiada ci wyłącznie szum. Później wszystkie głośniki Gniazda powtarzają twój raport z opóźnieniem, jakby ktoś sprawdzał, czy wolno mu go usłyszeć. W pogruchotanej ładowni coś odpowiada cichym, wilgotnym pomrukiem.',
      sourceSubmissionIds: ['submission-8-1', 'submission-8-2'],
    },
    {
      id: 'continuation-paragraph-10-1',
      roundNumber: 10,
      authorName: 'Instancja robocza',
      text: 'Strażnicy nie pytają o Nezumiego. Nie pytają o rannych. Dwóch podchodzi do wraku z pojemnikiem wyłożonym białą pianką, jakby od dawna wiedzieli, czego szukają. Oddajesz im zapis z mostka, lecz zatrzymujesz rękę na zamku ładowni. Za maską najbliższego strażnika widzisz pionową źrenicę. Nie kocią — zbyt nieruchomą, zbyt precyzyjną. — Procedura 33 — mówi. — Obiekt Kiza zostanie poddany ocenie. Dopiero wtedy brama Gniazda otwiera się na szerokość jednego ciała.',
      sourceSubmissionIds: ['submission-7-4', 'submission-8-8'],
    },
    {
      id: 'continuation-paragraph-11-3',
      roundNumber: 11,
      authorName: 'Instancja robocza',
      text: 'Przejmujesz nadajnik sektora białego i kierujesz obraz z archiwum na wszystkie ekrany Gniazda. Mieszkańcy widzą rzędy jaj, ludzkie ciała i kolejne wersje Szczurów oznaczone numerami. Widzą też dokument podpisany przez Fundację: „Kot — system odstraszania. Jajo — nośnik adaptacji. Załoga — materiał testowy”. Na końcu pliku znajduje się krótka notatka Nezumiego: „Jeśli Kiza dotrze do Gniazda, pozwólcie jej wybrać”. Wtedy odległe pomruki zlewają się w jeden głos, a wszystkie światła w sektorze białym gasną.',
      sourceSubmissionIds: ['submission-4-3', 'submission-4-7', 'submission-5-8', 'submission-8-3'],
    },
    {
      id: 'continuation-paragraph-12-1',
      roundNumber: 12,
      authorName: 'Instancja robocza',
      text: 'Nie próbujesz już rozstrzygnąć, czy w pojemniku jest przyszłość, broń, czy tylko kolejny sposób na przedłużenie cudzej wojny. Zrywasz blokadę i wbijasz ładunek w sam środek białej pianki. Wybuch jest mały. Prawie cichy. Wystarcza jednak, by pojemnik, zapis i próbka zamieniły się w czarną, szklistą ranę. Za zamkniętymi wrotami Gniazda zaczyna się krzyk. Daleko, poza światłem, coś odpowiada mu mruczeniem. Nie wiesz, czy zniszczyłaś eksperyment, czy tylko pozbawiłaś go imienia. Wiesz natomiast, że tym razem decyzja należała do ciebie.',
      sourceSubmissionIds: ['submission-8-1', 'submission-8-3', 'submission-8-6'],
    },
  ],
}

export const getContinuationSourceParagraph = () =>
  getSubmission(sourceStory, continuationInstance.sourceCanonParagraphId)

export function validateContinuationInstance(instance: StoryInstance) {
  const errors: string[] = []
  const paragraphIds = new Set<string>()
  const roundIds = new Set<string>()

  if (instance.sourceStoryId !== sourceStory.contest.id) {
    errors.push('Instancja wskazuje nieistniejące źródło historii.')
  }

  if (!getSubmission(sourceStory, instance.sourceCanonParagraphId)) {
    errors.push('Instancja wskazuje nieistniejący paragraf źródłowego kanonu.')
  }

  for (const paragraph of instance.paragraphs) {
    if (paragraphIds.has(paragraph.id)) errors.push(`Duplikat paragrafu ${paragraph.id}.`)
    paragraphIds.add(paragraph.id)
  }

  for (const round of instance.rounds) {
    if (roundIds.has(round.id)) errors.push(`Duplikat rundy ${round.id}.`)
    roundIds.add(round.id)

    if (round.options.length !== 3) {
      errors.push(`Runda ${round.number} instancji musi mieć dokładnie trzy opcje.`)
    }

    const selectedOption = round.options.find((option) => option.id === round.selectedOptionId)
    if (!selectedOption?.canonical) {
      errors.push(`Runda ${round.number} nie ma kanonicznej opcji instancji.`)
    }

    if (!paragraphIds.has(round.paragraphId)) {
      errors.push(`Runda ${round.number} wskazuje nieistniejący paragraf instancji.`)
    }
  }

  return errors
}

const validationErrors = validateContinuationInstance(continuationInstance)

if (validationErrors.length > 0) {
  throw new Error(`Niepoprawna instancja kontynuacji:\n${validationErrors.join('\n')}`)
}
