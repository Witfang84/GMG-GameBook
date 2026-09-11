# Stan drzewa historii Szczura nr 16

## Wniosek

Repozytorium nie zawiera pełnego drzewa wszystkich linii historii. Zawiera:

- otwarcie oraz 12 konkurencyjnych zgłoszeń otwierających;
- trzy opcje i zgłoszenia-paragrafy dla każdej rundy 2–8;
- pełny kanoniczny ciąg rund 2–8;
- opcje 1–3 dla roboczej kontynuacji rund 9–12, ale tekst paragrafu tylko dla wybranej opcji każdej z tych rund;
- generowane zastępniki dla odgałęzień alternatywnych.

Nie ma natomiast osobnych, redakcyjnie gotowych węzłów „po wyborze alternatywnym”: każdy taki węzeł powinien mieć własny paragraf i własne trzy kolejne opcje albo jawnie oznaczać zakończenie. Obecny `playableStory.ts` wypełnia te miejsca ogólnymi tekstami typu „Podążasz za najbliższym śladem...”. To nie jest pełna treść gry.

## Inwentaryzacja danych

| Zakres | Opcje | Teksty paragrafów | Status |
| --- | ---: | ---: | --- |
| Otwarcie | — | 12 zgłoszeń, 1 zwycięskie | komplet danych konkursowych |
| Runda 2 | 3 | zgłoszenia dla wszystkich 3 opcji | kanon ma opcję 2; odnogi 1 i 3 urywają się |
| Runda 3 | 3 | zgłoszenia dla wszystkich 3 opcji | kanon ma opcję 2; odnogi 1 i 3 urywają się |
| Runda 4 | 3 | zgłoszenia dla wszystkich 3 opcji | kanon ma opcję 1; odnogi 2 i 3 urywają się |
| Runda 5 | 3 | zgłoszenia dla wszystkich 3 opcji | kanon ma opcję 2; odnogi 1 i 3 urywają się |
| Runda 6 | 3 | zgłoszenia dla wszystkich 3 opcji | kanon ma opcję 2; odnogi 1 i 3 urywają się |
| Runda 7 | 3 | zgłoszenia dla wszystkich 3 opcji | kanon ma opcję 3; odnogi 1 i 2 urywają się |
| Runda 8 | 3 | zgłoszenia dla wszystkich 3 opcji | kanon ma opcję 3; odnogi 1 i 2 urywają się |
| Kontynuacja 9–12 | po 3 | paragraf tylko po opcji kanonicznej | robocza, częściowa |

Łącznie istnieje 21 decyzji konkursowych (po trzy w rundach 2–8), ale tylko siedem z nich prowadzi do następnego konkursowego węzła. Relacja `Round.parentCanonParagraphId` potwierdza, że rundy 3–8 są podpięte wyłącznie do zwycięzców kanonu.

## Przykład `R-16 / 01 / 11`

Pierwszy ekran gry jest budowany z `canonical-round-2` i ma trzy opcje. W modelu ma jednak `roundNumber: 0`, więc licznik powinien być skorygowany na numerację prezentacyjną od `01` (obecnie kod może wyświetlić `00 / 11`).

Ekrany bez opcji są tworzone celowo jako węzły terminalne (`options: []`). Dotyczy to także wielu wygenerowanych alternatyw, które nie mają opracowanego dalszego tekstu. Sama zmiana komponentu interfejsu nie odtworzy brakującej historii; najpierw trzeba uzupełnić model węzłów.

## Tekstowy zakres do uzupełnienia przed implementacją

Każda pozycja poniżej wymaga przygotowania w formacie:

```md
## Węzeł <id>

### Paragraf
<tekst sceny po wejściu do węzła>

### Opcja 1
<działanie gracza>

### Opcja 2
<działanie gracza>

### Opcja 3
<działanie gracza>
```

Do napisania są następujące odnogi:

- po opcjach 1 i 3 rundy 2;
- po opcjach 1 i 3 rundy 3;
- po opcjach 2 i 3 rundy 4;
- po opcjach 1 i 3 rundy 5;
- po opcjach 1 i 3 rundy 6;
- po opcjach 1 i 2 rundy 7;
- po opcjach 1 i 2 rundy 8;
- po opcjach 2 i 3 każdej rundy kontynuacji 9–12, jeśli kontynuacja ma być pełnoprawnym drzewem.

## Plan naprawy po zatwierdzeniu tekstów

1. Rozdzielić dane historii od generatora zastępczych węzłów w `playableStory.ts`.
2. Dodać jawne rekordy paragrafów, opcji i przejść dla każdej gotowej odnogi.
3. Rozszerzyć walidację o: brak pustych paragrafów, dokładnie trzy opcje dla grywalnego węzła, poprawne cele przejść i kontrolę osiągalności.
4. Ustawić licznik rund od `01` oraz jednoznacznie oznaczać zakończenia, zamiast pokazywać je jak zwykłe węzły.
5. Dopiero po przejściu walidacji podłączyć kompletne dane do interfejsu i przetestować każdą odnogę od początku do końca.

Na tym etapie interfejs nie został zmieniony. Ten plik jest punktem wejścia do dalszego opracowania treści.

## Projekt treści: pierwsze odnogi rundy 2

Poniższe teksty rozwijają istniejące zgłoszenia `submission-2-2`, `submission-2-6`, `submission-2-9`, `submission-2-1`, `submission-2-3`, `submission-2-10` i `submission-2-11`. Są wersją roboczą do redakcji, nie są jeszcze podłączone do gry.

### Węzeł `alternate-round-2-option-1`

#### Paragraf

„Nie ryzykujemy ładunku. Zawracamy.”

Nezumi patrzy na ciebie tak, jakbyś właśnie wypowiedziała zakazane słowo. Przez chwilę słyszysz tylko syk filtrów w jego masce. Potem kapitan uśmiecha się zbyt szeroko.

— Tchórzysz? — pyta. — Z Gniazda przyślą świeżego Szczura, a my będziemy czekać pod kamieniami?

Rozkaz odwrotu zostaje wydany, lecz Szczur nr 16 nie chce go wykonać. Zawracacie do odnogi korytarza. Cztery dni drogi zmieniają się w trzy, trzy w dwa. Maszyna szarpie, piszczy i napina stalowe żebra, jakby coś trzymało ją za ogon.

Drugiego dnia Tral znajduje otwarte drzwi kontenera. Nie ma wartowników, zapasów ani śladów walki. Jest tylko wilgoć na podłodze i granatowa nitka przyklejona do zawiasu. Następnego ranka po Nezumim zostaje sama kurtka, ułożona na fotelu dowódcy. Z bocznych korytarzy dobiega ciche: cyk, cyk, cyk.

W załodze zostało was dwadzieścioro. Szczur zatrzymuje się przed rozwidleniem. Na mapie widnieją trzy drogi, ale komputer pokładowy pokazuje tylko jedną jako przejezdną.

#### Opcja 1

Każesz załodze opuścić Szczura i iść pieszo do Gniazda. Zabieracie wodę, broń oraz nadajnik awaryjny. Jeśli maszyna czegoś się boi, nie pozwolisz, by zabrała ze sobą resztę załogi.

#### Opcja 2

Wracasz do fotela kapitana i zakładasz jego kurtkę. Rozkazujesz Szczuru jechać dalej, a Tralowi odciąć wszystkie boczne włazy. Chcesz sprawdzić, czy głos Nezumiego nadal odpowiada z któregoś kanału.

#### Opcja 3

Otwierasz znaleziony kontener. W środku może być zapas, schron albo pułapka, lecz granatowa nitka na zawiasie zaczyna drgać w rytm cykania.

### Węzeł `alternate-round-2-option-3`

#### Paragraf

Nezumi początkowo odmawia. Potem patrzy na granatowy materiał i zmienia zdanie.

Idziesz sama w pajęczym skafandrze. Za tobą zamykają się drzwi śluzy, a światło Szczura zostaje cienką, białą kreską. Ślady pazurów prowadzą przez zawalony korytarz do pieczary pokrytej fluorescencyjnymi grzybami. Na kamieniach widzisz porzucone hełmy, pęknięte skorupy jaj i granatowe włókna grubsze od kabli.

W dole ktoś rozmawia. Najpierw słyszysz pomruki Kota, potem piski i mlaskanie. Przesuwasz się po suficie, aż widzisz źródło dźwięku: wielkie, ciężkie stworzenie siedzi przy płytkim basenie, a naprzeciw niego skulony Kretomuł i trzy wychudzone sylwetki w resztkach mundurów Szczura 13.

Jedna z sylwetek podnosi głowę. To mała dziewczynka. Nie patrzy na ciebie, ale jej głos pojawia się prosto w twoim hełmie:

— Oni zabrali mi siostrę. Wiesz, gdzie ona jest?

W tej samej chwili przez radio odzywa się Nezumi:

— Kiza, rozładuj jajo.

Kapitan został w Szczurze. Jego głos nie powinien docierać do tej pieczary.

#### Opcja 1

Nie odpowiadasz dziewczynce. Włączasz zapis obrazu i schodzisz niżej, żeby ustalić, czy stworzenia są ocalałymi z Trzynastki, czy tylko używają ich głosów.

#### Opcja 2

Pytasz dziewczynkę o siostrę i o granatowe włókna. Próbujesz utrzymać rozmowę, zanim ktoś w pieczarze zauważy odbicie twojego skafandra.

#### Opcja 3

Ignorujesz rozkaz z radia i wracasz do Szczura. Jeśli głos Nezumiego słychać tutaj, ktoś albo coś nadaje z jego wnętrza.

### Kierunek dalszej redakcji

Obie odnogi zachowują wspólne motywy kanonu: granatowy materiał, ślady Kota, znikanie załogi, jajo i niepewność co do stanu Nezumiego. Następny etap powinien dopisać po trzy paragrafy dla sześciu wyborów powyżej. Dopiero wtedy pierwsza alternatywna warstwa będzie miała własne, grywalne rozgałęzienie zamiast pojedynczego zakończenia.

## Projekt treści: druga warstwa odgałęzień

### Węzeł `alternate-round-2-option-1-choice-1`

#### Paragraf

Wychodzicie ze Szczura w ciszy. Dwudziestu ludzi niesie wodę, broń i nadajnik, a ty prowadzisz ich w stronę Gniazda według starej mapy serwisowej. Po kilkuset krokach słyszysz za sobą metaliczny trzask. Szczur sam zamyka włazy.

Potem rusza. Nie do przodu, lecz wstecz — dokładnie tą drogą, którą przyszliście. Reflektory omiatają ściany. W ich świetle pojawiają się sylwetki w granatowych płaszczach, nieruchome i zbyt wysokie, by należeć do ludzi. Nadajnik zaczyna nadawać głos Nezumiego.

— Załoga ma wrócić do środka.

Najmłodszy Kozak chce odpowiedzieć, ale odbiornik wyprzedza jego ruch.

— Załoga już wróciła.

#### Opcja 1

Rozkazujesz wszystkim zgasić latarki i rozproszyć się w bocznych szczelinach. Chcesz sprawdzić, czy granatowe sylwetki reagują na światło, dźwięk czy zapach jaja.

#### Opcja 2

Nadajesz do Szczura własnym głosem: „Kiza do Nezumiego. Otwórz śluzę”. Jeśli coś przejęło radio, może zdradzić się odpowiedzią.

#### Opcja 3

Prowadzisz załogę prosto na sylwetki. Nie wiesz, czy są wrogami, ale rozproszenie oznaczałoby utratę ludzi pojedynczo.

### Węzeł `alternate-round-2-option-1-choice-2`

#### Paragraf

Zakładasz kurtkę kapitana. Jest cięższa, niż pamiętasz, i wilgotna od środka. Kiedy siadasz w fotelu, wszystkie monitory zapalają się jednocześnie.

— Zawracamy do Gniazda — mówisz.

Szczur odpowiada drżeniem. Z głośników dobiega szum, a pod nim drugi oddech, zsynchronizowany z twoim. Tral odcina boczne włazy. Załoga zostaje zamknięta w przedziałach, lecz na mapie pojawiają się nowe sygnały: jeden w ładowni, trzy w maszynowni i kilkanaście wewnątrz ścian.

W fotelu obok ciebie zapala się lampka identyfikacyjna Nezumiego. Nie ma go w kokpicie. Na pulpicie leży tylko jego rewolwer, rozgrzany jak po strzale.

#### Opcja 1

Schodzisz do ładowni z rewolwerem i każesz Tralowi prowadzić maszynę. Sygnał w ładowni może być jądrem całego problemu.

#### Opcja 2

Otwierasz kanał do maszynowni. Rozkazujesz trzem sygnałom ujawnić się, zanim wyłączysz napęd i uwięzisz Szczura w korytarzu.

#### Opcja 3

Próbujesz wymazać identyfikator Nezumiego z systemu. Jeśli kapitan nadal steruje maszyną, pozbawisz go dostępu; jeśli nie, możesz obudzić coś, co tylko czeka na usunięcie jego nazwiska.

### Węzeł `alternate-round-2-option-1-choice-3`

#### Paragraf

Otwierasz kontener. Zamiast zapasów widzisz rząd przezroczystych pojemników z wodą. W każdym pływa pojedyncza, granatowa nić. Na dnie leżą tabliczki oznaczone numerami Szczurów.

Gdy dotykasz jednej z nich, wszystkie nici wyginają się w twoją stronę. Cykanie z korytarza przyspiesza. Z nadajnika awaryjnego odzywa się automatyczny komunikat:

— Transport biologiczny. Nie otwierać przed przybyciem do Gniazda.

Tral patrzy na ciebie przez wizjer.

— Kiza, ten komunikat ma dwieście lat.

W głębi kontenera coś uderza w szkło. Raz. Drugi. Za trzecim razem jedna z nici układa się w kształt dłoni.

#### Opcja 1

Zamykasz kontener i oznaczasz go jako skażony. Zabierasz tylko tabliczki, aby ustalić, co stało się z poprzednimi Szczurami.

#### Opcja 2

Rozbijasz pojemnik z najdłuższą nicią. Chcesz zobaczyć, czy organizm przeżyje poza wodą i czy rozpozna załogę.

#### Opcja 3

Każesz Tralowi podłączyć kontener do systemu Szczura. Jeśli ładunek steruje maszyną, może uda się zrozumieć jego sygnały bez otwierania pojemników.

### Węzeł `alternate-round-2-option-3-choice-1`

#### Paragraf

Schodzisz niżej i rejestrujesz obraz. Stworzenia nie reagują na twoją obecność, ale ich rozmowa natychmiast cichnie. Dziewczynka podnosi rękę. Na jej nadgarstku widzisz ślad po igle i granatową bransoletę z tego samego materiału co płaszcz.

Kretomuł wyciąga z basenu skorupę jaja. W środku nie ma embrionu — tylko gęsty, mleczny śluz. Jedna z wychudzonych postaci pochyla się nad nim, a wtedy z jej ust wydobywa się głos Nezumiego.

— Nie filmuj tego, Kizo.

Obraz w twoim hełmie zaczyna się rozdwajać. W jednym kanale widzisz pieczarę, w drugim mostek Szczura. Na obu ekranach kapitan mierzy do ciebie.

#### Opcja 1

Strzelasz w lampy przy basenie. W ciemności obraz z hełmu powinien przestać się rozdwajać, a stworzenia stracą przewagę.

#### Opcja 2

Zapisujesz nagranie w trzech kopiach i wysyłasz je do załogi. Jeśli nie wrócisz, Gniazdo pozna prawdę o pieczarze.

#### Opcja 3

Celujesz w skorupę, nie w stworzenia. Chcesz zniszczyć to, co pozwala głosowi Nezumiego przechodzić między pieczarą a Szczurem.

### Węzeł `alternate-round-2-option-3-choice-2`

#### Paragraf

— Gdzie jest twoja siostra? — pytasz.

Dziewczynka wskazuje na granatową plątaninę zwisającą ze sklepienia. Włókna poruszają się bez wiatru. Pomiędzy nimi dostrzegasz małe, białe palce.

— W środku. Wszystkie są w środku.

Kretomuł odwraca łeb. Jego skóra jest zszyta metalowymi klamrami, a pod nią pulsuje światło. Pozostali zaczynają mówić jednocześnie. Każdy głos powtarza inne imię, lecz wszystkie kończą się tym samym słowem: „wróć”.

Radio znów trzeszczy.

— Kiza, nie słuchaj ich. — Tym razem głos Nezumiego jest cichy i prawdziwy. — Jajo nie jest ładunkiem. Jest drzwiami.

#### Opcja 1

Prosisz dziewczynkę, by zaprowadziła cię do siostry. Wchodzisz pod granatową plątaninę, licząc na to, że skafander ochroni cię przed śluzem.

#### Opcja 2

Pytasz Nezumiego, skąd naprawdę nadaje. Każesz mu podać szczegół znany tylko wam obojgu, zanim wykonasz jakikolwiek ruch.

#### Opcja 3

Rzucasz granat dymny na środek pieczary. Chcesz odciąć widoczność i wyprowadzić dziewczynkę, zanim Kretomuł zamknie przejście.

### Węzeł `alternate-round-2-option-3-choice-3`

#### Paragraf

Wracasz do Szczura, lecz śluza otwiera się zanim wydasz komendę. W kokpicie nie ma Nezumiego. Jest za to jego głos, dochodzący z każdego głośnika naraz.

— Dobrze, że wróciłaś sama.

Na pulpicie leży jajo. Przed chwilą znajdowało się w ochronnym magazynie, za trzema zamkami. Teraz jego skorupa pulsuje w rytm świateł awaryjnych.

W luku za tobą pojawia się granatowa smuga. Nie wchodzi do środka; zatrzymuje się na progu jak cień, który czeka na zaproszenie. Z maszynowni dobiega krzyk jednego z Kozaków. Potem drugi głos mówi przez radio:

— Nie otwieraj jaja. Otwórz Szczura.

#### Opcja 1

Zamykasz mostek i odcinasz ładownię. Chcesz uruchomić awaryjne sterowanie, zanim cokolwiek zdoła przejąć cały kadłub.

#### Opcja 2

Podchodzisz do jaja bez broni. Jeśli jest drzwiami, być może trzeba je otworzyć, a nie rozbić.

#### Opcja 3

Wzywasz całą załogę na mostek i każesz im patrzeć na jajo. Nie pozwolisz, by kolejne decyzje zapadały w ciemności i pojedynczo.

### Notatka redakcyjna

Druga warstwa wprowadza trzy możliwe osie dalszej historii: ucieczkę załogi, przejęcie Szczura oraz ujawnienie biologicznej funkcji jaja. Każda opcja prowadzi do konfliktu, który może zostać rozwinięty w kolejnym etapie. Nie należy jeszcze nadawać tym węzłom statusu kanonicznego ani dopisywać ich do `playableStory.ts`.

## Projekt treści: trzecia warstwa odgałęzień

Poniżej rozwinięto po jednej decyzji z każdego węzła drugiej warstwy. To sześć kolejnych paragrafów i 18 nowych wyborów.

### Węzeł `alternate-round-2-option-1-choice-1-choice-1`

#### Paragraf

Gaszą latarki. W ciemności słyszysz, jak ludzie wciskają się w szczeliny między płytami. Granatowe sylwetki nie ruszają się, dopóki nie zaczyna pracować nadajnik. Wtedy wszystkie obracają głowy w tę samą stronę.

Nie reagują na światło. Reagują na głos.

Wysyłasz krótki impuls z nadajnika. Z przeciwległej ściany odpowiada identyczny sygnał, lecz jego źródło znajduje się za wami — tam, gdzie przed chwilą zostawiliście Szczura. Po chwili maszyna zapala reflektory i oświetla pusty korytarz. Na podłodze widać świeże ślady butów prowadzące do środka kadłuba.

#### Opcja 1

Przekazujesz załodze zakaz mówienia i ruszasz za śladami. Chcesz odzyskać Szczura, zanim granatowe sylwetki zamkną przejście.

#### Opcja 2

Nadajesz drugi impuls, tym razem z fałszywą lokalizacją. Jeśli sylwetki podążą za sygnałem, otworzysz ludziom drogę do Gniazda.

#### Opcja 3

Każesz Kozakom zaatakować najbliższą sylwetkę. Potrzebujesz jednej żywej, żeby dowiedzieć się, kim są i skąd znają głos Nezumiego.

### Węzeł `alternate-round-2-option-1-choice-2-choice-1`

#### Paragraf

Schodzisz do ładowni. Sygnał nie pochodzi z jaja, lecz z pustej przestrzeni pod platformą transportową. Gdy wsuwasz rękę pod metal, dotykasz czegoś miękkiego i ciepłego.

Granatowa błona odkleja się od podłogi. Pod nią leży hełm z numerem 13, a w jego wnętrzu pulsuje cienki przewód. Z przewodu płynie głos:

— Kiza, nie strzelaj. Jeszcze nie jestem cały.

Na wizjerze hełmu pojawia się obraz korytarza, którego nie ma na żadnej mapie. W oddali stoi Nezumi. Za nim coś wielkiego przesuwa się pod materiałem munduru.

#### Opcja 1

Wyciągasz hełm i podłączasz go do własnego skafandra. Chcesz ustalić, czy głos należy do ocalałego z Trzynastki.

#### Opcja 2

Odłączasz przewód i zamykasz hełm w pojemniku próżniowym. Wolisz utracić kontakt, niż pozwolić sygnałowi przenieść się do twojego skafandra.

#### Opcja 3

Pytasz obraz Nezumiego, co znajduje się pod jego mundurem. Jeśli odpowie, będziesz wiedziała, czy patrzysz na kapitana, czy na jego kopię.

### Węzeł `alternate-round-2-option-1-choice-3-choice-1`

#### Paragraf

Zamykasz kontener i zabierasz tabliczki. Na pierwszej widnieje numer Szczura 4, na drugiej Szczura 9, na trzeciej — 13. Wszystkie mają ten sam znak: mały, czarny okrąg przecięty trzema kreskami.

W chwili, gdy chowasz tabliczki do kieszeni, z pojemników znika woda. Granatowe nici przyklejają się do szkła i układają w litery. Nie znasz tego alfabetu, ale system Szczura tłumaczy go automatycznie:

„Nie pojazdy. Nosiciele.”

Załoga zaczyna kaszleć. Na wizjerach pojawia się para, choć temperatura w kontenerze spada.

#### Opcja 1

Zarządzasz natychmiastową kwarantannę przedziału. Odcinasz skażony kontener razem z trzema Kozakami, którzy byli najbliżej.

#### Opcja 2

Wysyłasz tabliczki do centralnego komputera i każesz odszukać wszystkie wzmianki o znaku trzech kresek.

#### Opcja 3

Otwierasz kanał do Gniazda i przekazujesz pełny raport. Jeśli ktoś tam zna ten znak, może odpowiedzieć, zanim nici całkiem wyschną.

### Węzeł `alternate-round-2-option-3-choice-1-choice-1`

#### Paragraf

Strzelasz w lampy. Pieczara gaśnie, lecz rozdzielony obraz nie znika. Teraz w obu kanałach widzisz tylko oczy: fioletowe w ciemności oraz zielone na monitorze mostka.

Stworzenia rzucają się na siebie, jakby cię nie widziały. Kretomuł przewraca basen, a mleczny śluz rozpływa się po kamieniach. Dziewczynka chwyta cię za rękę. Jej dotyk przechodzi przez rękawicę jako obcy, zimny impuls.

— Nie strzelaj do oczu — mówi. — One są drzwiami.

Z góry spada granatowa lina. Owija się wokół twojego jetpacka i zaczyna wciągać cię pod sklepienie.

#### Opcja 1

Odpalasz silniki na krótkim ciągu, żeby przeciąć linę o krawędź skały i wyrwać dziewczynkę z pieczary.

#### Opcja 2

Pozwalasz, by lina wciągnęła cię wyżej. Jeśli prowadzi do źródła sygnału, możesz wreszcie zobaczyć, kto steruje obrazem.

#### Opcja 3

Rzucasz broń i chwytasz rozlany śluz. Chcesz sprawdzić, czy reaguje na dotyk tak samo jak granatowe włókna.

### Węzeł `alternate-round-2-option-3-choice-2-choice-1`

#### Paragraf

Dziewczynka prowadzi cię pod sklepienie. Granatowe włókna są miękkie, ale pod nimi wyczuwasz twarde kształty: hełmy, narzędzia, kości. W środku nie ma jednej osoby. Jest ich wiele, połączonych w jeden nieruchomy splot.

— Moja siostra pamięta drogę — mówi dziewczynka. — Ty też ją pamiętasz, tylko jeszcze o tym nie wiesz.

Wchodzisz głębiej. Skafander zaczyna wyświetlać wspomnienia, których nie przeżyłaś: białe pomieszczenie, rzędy jaj, rękę Nezumiego podpisującego formularz. Na końcu obrazu widzisz samą siebie, młodszą o kilka lat, stojącą przed zamkniętym włazem.

Właz otwiera się od środka.

#### Opcja 1

Wchodzisz do środka i pozwalasz, by wspomnienie doprowadziło cię do siostry dziewczynki.

#### Opcja 2

Zaznaczasz położenie splotu i wycofujesz się po własnych śladach. Najpierw chcesz sprowadzić Kozaków i sprzęt do rozcięcia włókien.

#### Opcja 3

Wołasz Nezumiego. Jeśli wspomnienie jest prawdziwe, kapitan powinien znać pomieszczenie widoczne za włazem.

### Węzeł `alternate-round-2-option-3-choice-3-choice-1`

#### Paragraf

Kozacy wbiegają na mostek. Każdy patrzy na jajo, ale nikt nie chce podejść pierwszy. Każesz ustawić je na środku stołu nawigacyjnego i zamykasz wszystkie drzwi.

Jajo zaczyna emitować głos załogi. Najpierw powtarza wasze imiona, potem ostatnie zdania wypowiedziane przez każdego z was. Gdy dochodzi do Nezumiego, z głośników płynie zupełnie inny ton:

— Załoga nie jest gotowa.

Skorupa pęka, lecz nie otwiera się. Przez szczelinę widać ciemność, większą niż wnętrze jaja. W tej ciemności znajduje się coś, co przypomina drugi kokpit.

Tral wskazuje na mapę. Wokół Szczura pojawiają się trzydzieści dwa nowe sygnały.

#### Opcja 1

Rozkazujesz wszystkim założyć skafandry i przygotować się do opuszczenia maszyny. Jeśli jajo otworzy przejście, nie chcecie być w środku.

#### Opcja 2

Wysyłasz przez szczelinę małą sondę. Chcesz zobaczyć, dokąd prowadzi ciemność, zanim ktokolwiek podejmie nieodwracalną decyzję.

#### Opcja 3

Każesz Tralowi skierować Szczura w stronę Gniazda z maksymalną prędkością. Jeśli sygnały są pościgiem, jedyną szansą pozostaje dotarcie do ludzi.

### Notatka redakcyjna

Ta warstwa celowo nie rozstrzyga jeszcze, czy „Kot” jest stworzeniem, systemem czy nazwą procedury. Wszystkie sześć węzłów podnosi stawkę, ale pozostawia graczowi konkretne działanie: śledztwo, izolację, kontakt, ucieczkę albo ryzyko biologiczne. Kolejny etap powinien rozwinąć pozostałe dwa wybory z każdego z tych sześciu węzłów, zanim historia zacznie prowadzić do wspólnych punktów z kanonem.
