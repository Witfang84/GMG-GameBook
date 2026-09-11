import type { PlayableNode } from './playableStory'

type Branch = {
  id: string
  roundNumber: number
  paragraphText: string
  choices: [string, string, string]
  nextNodeIds: [string, string, string]
}

const branch = (value: Branch): PlayableNode => ({
  id: value.id,
  roundNumber: value.roundNumber,
  paragraphText: value.paragraphText,
  options: value.choices.map((text, index) => ({
    id: `${value.id}-choice-${index + 1}`,
    label: (index + 1).toString() as '1' | '2' | '3',
    text,
    canonical: false,
    nextNodeId: value.nextNodeIds[index],
  })),
})

const archiveTargets = [
  'alternate-entry-option-2-1',
  'alternate-entry-option-2-3',
  'alternate-entry-option-2-1',
] as [string, string, string]

export const authoredAlternateNodes: PlayableNode[] = [
  branch({
    id: 'alternate-round-2-option-1',
    roundNumber: 2,
    paragraphText: '„Nie ryzykujemy ładunku. Zawracamy.”\n\nNezumi patrzy na ciebie tak, jakbyś właśnie wypowiedziała zakazane słowo. Potem kapitan uśmiecha się zbyt szeroko.\n\n— Tchórzysz? — pyta. — Z Gniazda przyślą świeżego Szczura, a my będziemy czekać pod kamieniami?\n\nRozkaz odwrotu zostaje wydany, lecz Szczur nr 16 nie chce go wykonać. Zawracacie do odnogi korytarza. Cztery dni drogi zmieniają się w trzy, trzy w dwa. Maszyna szarpie, piszczy i napina stalowe żebra, jakby coś trzymało ją za ogon.\n\nDrugiego dnia Tral znajduje otwarte drzwi kontenera. Nie ma wartowników, zapasów ani śladów walki. Jest tylko wilgoć na podłodze i granatowa nitka przyklejona do zawiasu. Następnego ranka po Nezumim zostaje sama kurtka, ułożona na fotelu dowódcy. Z bocznych korytarzy dobiega ciche: cyk, cyk, cyk.\n\nW załodze zostało was dwadzieścioro. Szczur zatrzymuje się przed rozwidleniem. Na mapie widnieją trzy drogi, ale komputer pokładowy pokazuje tylko jedną jako przejezdną.',
    choices: [
      'Każesz załodze opuścić Szczura i iść pieszo do Gniazda. Zabieracie wodę, broń oraz nadajnik awaryjny. Jeśli maszyna czegoś się boi, nie pozwolisz, by zabrała ze sobą resztę załogi.',
      'Wracasz do fotela kapitana i zakładasz jego kurtkę. Rozkazujesz Szczuru jechać dalej, a Tralowi odciąć wszystkie boczne włazy. Chcesz sprawdzić, czy głos Nezumiego nadal odpowiada z któregoś kanału.',
      'Otwierasz znaleziony kontener. W środku może być zapas, schron albo pułapka, lecz granatowa nitka na zawiasie zaczyna drgać w rytm cykania.',
    ],
    nextNodeIds: [
      'alternate-round-2-option-1-choice-1',
      'alternate-round-2-option-1-choice-2',
      'alternate-round-2-option-1-choice-3',
    ],
  }),
  branch({
    id: 'alternate-round-2-option-3',
    roundNumber: 2,
    paragraphText: 'Nezumi początkowo odmawia. Potem patrzy na granatowy materiał i zmienia zdanie.\n\nIdziesz sama w pajęczym skafandrze. Za tobą zamykają się drzwi śluzy, a światło Szczura zostaje cienką, białą kreską. Ślady pazurów prowadzą przez zawalony korytarz do pieczary pokrytej fluorescencyjnymi grzybami. Na kamieniach widzisz porzucone hełmy, pęknięte skorupy jaj i granatowe włókna grubsze od kabli.\n\nW dole ktoś rozmawia. Najpierw słyszysz pomruki Kota, potem piski i mlaskanie. Przesuwasz się po suficie, aż widzisz źródło dźwięku: wielkie, ciężkie stworzenie siedzi przy płytkim basenie, a naprzeciw niego skulony Kretomuł i trzy wychudzone sylwetki w resztkach mundurów Szczura 13.\n\nJedna z sylwetek podnosi głowę. To mała dziewczynka. Nie patrzy na ciebie, ale jej głos pojawia się prosto w twoim hełmie:\n\n— Oni zabrali mi siostrę. Wiesz, gdzie ona jest?\n\nW tej samej chwili przez radio odzywa się Nezumi:\n\n— Kiza, rozładuj jajo.\n\nKapitan został w Szczurze. Jego głos nie powinien docierać do tej pieczary.',
    choices: [
      'Nie odpowiadasz dziewczynce. Włączasz zapis obrazu i schodzisz niżej, żeby ustalić, czy stworzenia są ocalałymi z Trzynastki, czy tylko używają ich głosów.',
      'Pytasz dziewczynkę o siostrę i o granatowe włókna. Próbujesz utrzymać rozmowę, zanim ktoś w pieczarze zauważy odbicie twojego skafandra.',
      'Ignorujesz rozkaz z radia i wracasz do Szczura. Jeśli głos Nezumiego słychać tutaj, ktoś albo coś nadaje z jego wnętrza.',
    ],
    nextNodeIds: [
      'alternate-round-2-option-3-choice-1',
      'alternate-round-2-option-3-choice-2',
      'alternate-round-2-option-3-choice-3',
    ],
  }),
  branch({
    id: 'alternate-round-2-option-1-choice-1',
    roundNumber: 3,
    paragraphText: 'Gaszą latarki. W ciemności słyszysz, jak ludzie wciskają się w szczeliny między płytami. Granatowe sylwetki nie ruszają się, dopóki nie zaczyna pracować nadajnik. Wtedy wszystkie obracają głowy w tę samą stronę.\n\nNie reagują na światło. Reagują na głos.\n\nWysyłasz krótki impuls z nadajnika. Z przeciwległej ściany odpowiada identyczny sygnał, lecz jego źródło znajduje się za wami — tam, gdzie przed chwilą zostawiliście Szczura. Po chwili maszyna zapala reflektory i oświetla pusty korytarz. Na podłodze widać świeże ślady butów prowadzące do środka kadłuba.',
    choices: ['Przekazujesz załodze zakaz mówienia i ruszasz za śladami. Chcesz odzyskać Szczura, zanim granatowe sylwetki zamkną przejście.', 'Nadajesz drugi impuls, tym razem z fałszywą lokalizacją. Jeśli sylwetki podążą za sygnałem, otworzysz ludziom drogę do Gniazda.', 'Każesz Kozakom zaatakować najbliższą sylwetkę. Potrzebujesz jednej żywej, żeby dowiedzieć się, kim są i skąd znają głos Nezumiego.'],
    nextNodeIds: archiveTargets,
  }),
  branch({
    id: 'alternate-round-2-option-1-choice-2',
    roundNumber: 3,
    paragraphText: 'Schodzisz do ładowni. Sygnał nie pochodzi z jaja, lecz z pustej przestrzeni pod platformą transportową. Gdy wsuwasz rękę pod metal, dotykasz czegoś miękkiego i ciepłego.\n\nGranatowa błona odkleja się od podłogi. Pod nią leży hełm z numerem 13, a w jego wnętrzu pulsuje cienki przewód. Z przewodu płynie głos:\n\n— Kiza, nie strzelaj. Jeszcze nie jestem cały.\n\nNa wizjerze hełmu pojawia się obraz korytarza, którego nie ma na żadnej mapie. W oddali stoi Nezumi. Za nim coś wielkiego przesuwa się pod materiałem munduru.',
    choices: ['Wyciągasz hełm i podłączasz go do własnego skafandra. Chcesz ustalić, czy głos należy do ocalałego z Trzynastki.', 'Odłączasz przewód i zamykasz hełm w pojemniku próżniowym. Wolisz utracić kontakt, niż pozwolić sygnałowi przenieść się do twojego skafandra.', 'Pytasz obraz Nezumiego, co znajduje się pod jego mundurem. Jeśli odpowie, będziesz wiedziała, czy patrzysz na kapitana, czy na jego kopię.'],
    nextNodeIds: archiveTargets,
  }),
  branch({
    id: 'alternate-round-2-option-1-choice-3',
    roundNumber: 3,
    paragraphText: 'Otwierasz kontener. Zamiast zapasów widzisz rząd przezroczystych pojemników z wodą. W każdym pływa pojedyncza, granatowa nić. Na dnie leżą tabliczki oznaczone numerami Szczurów.\n\nGdy dotykasz jednej z nich, wszystkie nici wyginają się w twoją stronę. Cykanie z korytarza przyspiesza. Z nadajnika awaryjnego odzywa się automatyczny komunikat:\n\n— Transport biologiczny. Nie otwierać przed przybyciem do Gniazda.\n\nTral patrzy na ciebie przez wizjer.\n\n— Kiza, ten komunikat ma dwieście lat.\n\nW głębi kontenera coś uderza w szkło. Raz. Drugi. Za trzecim razem jedna z nici układa się w kształt dłoni.',
    choices: ['Zamykasz kontener i oznaczasz go jako skażony. Zabierasz tylko tabliczki, aby ustalić, co stało się z poprzednimi Szczurami.', 'Rozbijasz pojemnik z najdłuższą nicią. Chcesz zobaczyć, czy organizm przeżyje poza wodą i czy rozpozna załogę.', 'Każesz Tralowi podłączyć kontener do systemu Szczura. Jeśli ładunek steruje maszyną, może uda się zrozumieć jego sygnały bez otwierania pojemników.'],
    nextNodeIds: archiveTargets,
  }),
  branch({
    id: 'alternate-round-2-option-3-choice-1',
    roundNumber: 3,
    paragraphText: 'Strzelasz w lampy. Pieczara gaśnie, lecz rozdzielony obraz nie znika. Teraz w obu kanałach widzisz tylko oczy: fioletowe w ciemności oraz zielone na monitorze mostka.\n\nStworzenia rzucają się na siebie, jakby cię nie widziały. Kretomuł przewraca basen, a mleczny śluz rozpływa się po kamieniach. Dziewczynka chwyta cię za rękę. Jej dotyk przechodzi przez rękawicę jako obcy, zimny impuls.\n\n— Nie strzelaj do oczu — mówi. — One są drzwiami.\n\nZ góry spada granatowa lina. Owija się wokół twojego jetpacka i zaczyna wciągać cię pod sklepienie.',
    choices: ['Odpalasz silniki na krótkim ciągu, żeby przeciąć linę o krawędź skały i wyrwać dziewczynkę z pieczary.', 'Pozwalasz, by lina wciągnęła cię wyżej. Jeśli prowadzi do źródła sygnału, możesz wreszcie zobaczyć, kto steruje obrazem.', 'Rzucasz broń i chwytasz rozlany śluz. Chcesz sprawdzić, czy reaguje na dotyk tak samo jak granatowe włókna.'],
    nextNodeIds: archiveTargets,
  }),
  branch({
    id: 'alternate-round-2-option-3-choice-2',
    roundNumber: 3,
    paragraphText: 'Dziewczynka prowadzi cię pod sklepienie. Granatowe włókna są miękkie, ale pod nimi wyczuwasz twarde kształty: hełmy, narzędzia, kości. W środku nie ma jednej osoby. Jest ich wiele, połączonych w jeden nieruchomy splot.\n\n— Moja siostra pamięta drogę — mówi dziewczynka. — Ty też ją pamiętasz, tylko jeszcze o tym nie wiesz.\n\nWchodzisz głębiej. Skafander zaczyna wyświetlać wspomnienia, których nie przeżyłaś: białe pomieszczenie, rzędy jaj, rękę Nezumiego podpisującego formularz. Na końcu obrazu widzisz samą siebie, młodszą o kilka lat, stojącą przed zamkniętym włazem.\n\nWłaz otwiera się od środka.',
    choices: ['Wchodzisz do środka i pozwalasz, by wspomnienie doprowadziło cię do siostry dziewczynki.', 'Zaznaczasz położenie splotu i wycofujesz się po własnych śladach. Najpierw chcesz sprowadzić Kozaków i sprzęt do rozcięcia włókien.', 'Wołasz Nezumiego. Jeśli wspomnienie jest prawdziwe, kapitan powinien znać pomieszczenie widoczne za włazem.'],
    nextNodeIds: archiveTargets,
  }),
  branch({
    id: 'alternate-round-2-option-3-choice-3',
    roundNumber: 3,
    paragraphText: 'Kozacy wbiegają na mostek. Każdy patrzy na jajo, ale nikt nie chce podejść pierwszy. Każesz ustawić je na środku stołu nawigacyjnego i zamykasz wszystkie drzwi.\n\nJajo zaczyna emitować głos załogi. Najpierw powtarza wasze imiona, potem ostatnie zdania wypowiedziane przez każdego z was. Gdy dochodzi do Nezumiego, z głośników płynie zupełnie inny ton:\n\n— Załoga nie jest gotowa.\n\nSkorupa pęka, lecz nie otwiera się. Przez szczelinę widać ciemność, większą niż wnętrze jaja. W tej ciemności znajduje się coś, co przypomina drugi kokpit.\n\nTral wskazuje na mapę. Wokół Szczura pojawiają się trzydzieści dwa nowe sygnały.',
    choices: ['Rozkazujesz wszystkim założyć skafandry i przygotować się do opuszczenia maszyny. Jeśli jajo otworzy przejście, nie chcecie być w środku.', 'Wysyłasz przez szczelinę małą sondę. Chcesz zobaczyć, dokąd prowadzi ciemność, zanim ktokolwiek podejmie nieodwracalną decyzję.', 'Każesz Tralowi skierować Szczura w stronę Gniazda z maksymalną prędkością. Jeśli sygnały są pościgiem, jedyną szansą pozostaje dotarcie do ludzi.'],
    nextNodeIds: archiveTargets,
  }),
]
