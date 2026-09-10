# Gry paragrafowe — raport kontekstowy

**Data opracowania:** 10 września 2026 r.  
**Cel:** zebranie podstawowych informacji przydatnych przy projektowaniu i rozwijaniu GMG-GameBook.

## Streszczenie

Gra paragrafowa (ang. *gamebook*, *choose-your-own-adventure*, *pick-a-path*) to opowieść podzielona na ponumerowane lub nazwane fragmenty, pomiędzy którymi odbiorca przechodzi dzięki wyborom. W wersji papierowej wybór prowadzi do wskazanego paragrafu lub strony; w wersji cyfrowej — do kolejnego węzła, ekranu albo sceny. Kluczową cechą jest możliwość przejścia różnymi ścieżkami do różnych rozwinięć i zakończeń, a nie samo czytanie tekstu w kolejności liniowej.

Najważniejszy wniosek projektowy brzmi: liczba rozgałęzień nie jest dobrym celem sama w sobie. Wybór powinien być zrozumiały, mieć sens w sytuacji przedstawionej w tekście i powodować odczuwalną różnicę — natychmiastową, późniejszą, mechaniczną lub dotyczącą interpretacji postaci. Badania nad interaktywną narracją wskazują, że poczucie sprawczości rośnie wtedy, gdy dostępne działania prowadzą do znacząco różnych stanów sytuacji, a nie tylko do kosmetycznie zmienionych wersji tego samego tekstu ([Cardona-Rivera i in., 2014](https://doi.org/10.1609/aiide.v10i1.12716)).

## 1. Czym jest gra paragrafowa

### Definicja

Gra paragrafowa jest interaktywną formą fikcji, w której:

1. tekst dzieli się na odrębne fragmenty — paragrafy, sceny lub węzły;
2. fragmenty są połączone odsyłaczami lub wyborami;
3. odbiorca podejmuje decyzje wpływające na dalszy przebieg;
4. istnieje więcej niż jedna możliwa ścieżka, a zwykle także więcej niż jedno zakończenie.

W literaturze przedmiotu gamebook definiuje się jako narrację podzieloną na sekcje połączone odsyłaczami, prowadzącymi do alternatywnych ścieżek i wielu zakończeń ([Studying Gamebooks: A Framework for Analysis](https://analoggamestudies.org/2023/09/studying-gamebooks-a-framework-for-analysis/)). Minimalna struktura może składać się z jednego początku, jednego punktu rozgałęzienia i dwóch zakończeń.

Termin „gra paragrafowa” jest używany w Polsce szerzej niż wyłącznie dla książek papierowych. Współczesne odpowiedniki cyfrowe obejmują interaktywną fikcję, gry choice-based, interaktywne opowiadania oraz część powieści wizualnych. Nie każda interaktywna fikcja jest jednak grą paragrafową: parserowa gra tekstowa, w której gracz wpisuje dowolne komendy i porusza się po symulowanym świecie, należy do szerszego obszaru interactive fiction, ale nie musi mieć struktury wyboru kolejnych paragrafów.

### Cechy odróżniające od zwykłego opowiadania

- **Odbiorca jest uczestnikiem:** nie tylko poznaje historię, ale wybiera działanie lub postawę bohatera.
- **Tekst ma strukturę sieci:** numer kolejnego fragmentu lub link zastępuje kolejność stron.
- **Autor projektuje przestrzeń możliwości:** z góry określa dostępne ścieżki, warunki i konsekwencje.
- **Każde przejście jest wykonaniem jednej z możliwości:** projekt może zawierać wiele ścieżek, ale pojedyncze przejście pokazuje tylko jedną z nich. Dobrze ilustruje to model drzewa możliwych dróg oraz jednej drogi faktycznie wybranej przez gracza ([Frontiers in Education, 2023](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2023.1335605/full)).
- **„Gra” może być prosta lub rozbudowana:** od samego wyboru dalszego paragrafu po statystyki, ekwipunek, walkę, testy umiejętności, zasoby i zagadki.

### Główne odmiany

| Odmiana | Na czym polega | Typowy efekt wyboru |
| --- | --- | --- |
| Czysto narracyjna | Wybór kieruje do innego fragmentu historii | inna scena, relacja, informacja lub zakończenie |
| Choice-based / CYOA | Gra składa się z serii jawnych decyzji | alternatywne sceny, często kilka równorzędnych zakończeń |
| Przygodowa / RPG | Oprócz wyborów działa system reguł | test, walka, utrata zdrowia, przedmiot, blokada lub odblokowanie drogi |
| Eksploracyjna | Gracz wybiera kolejność odwiedzania miejsc lub zdarzeń | pętle, powroty, odkrywanie warunkowych scen |
| Współtworzona | Kolejne fragmenty lub opcje powstają z udziałem społeczności | głosowanie, selekcja i budowanie wspólnego kanonu |

## 2. Zasady działania gier paragrafowych

### Podstawowy model: węzły i przejścia

Najprościej potraktować grę jako graf narracyjny:

```text
[Paragraf A]
     ├── wybór 1 ──> [Paragraf B]
     └── wybór 2 ──> [Paragraf C]
                           └── wybór ──> [Zakończenie]
```

- **Węzeł** zawiera tekst, stan sceny i dostępne opcje.
- **Krawędź** jest wyborem lub warunkowym przejściem do następnego węzła.
- **Stan** przechowuje informacje, które mogą zmienić dostępne opcje albo treść: np. `maKlucz`, `zaufanieDoKapitana`, `zdrowie`, `czas`.
- **Terminal** jest zakończeniem lub innym miejscem, w którym dana ścieżka się kończy.

W książce węzeł jest paragrafem, a krawędź odsyłaczem typu „przejdź do paragrafu 42”. W aplikacji węzeł może być rekordem danych, a krawędź przyciskiem lub linkiem. Narzędzia takie jak ink i Twine pokazują, że cyfrowa wersja może dodatkowo przechowywać zmienne, wykonywać warunki i zmieniać tekst na podstawie wcześniejszych decyzji ([dokumentacja ink](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md), [manual Harlowe/Twine](https://twine2.neocities.org/)).

### Typowy przebieg rozgrywki

1. Gracz otrzymuje kontekst: miejsce, cel, zagrożenie lub problem.
2. Czyta fragment opisujący sytuację.
3. Dostaje ograniczoną liczbę zrozumiałych opcji.
4. Wybiera działanie, wypowiedź, kierunek albo sposób rozwiązania problemu.
5. System aktualizuje stan i przechodzi do następnego fragmentu.
6. Tekst pokazuje skutek wyboru — od razu albo w późniejszej scenie.
7. Proces trwa do osiągnięcia zakończenia, celu, porażki albo kolejnego ważnego punktu decyzyjnego.

### Reguły i mechaniki

W prostym gamebooku jedyną regułą może być: „wybierz opcję i przejdź do wskazanego fragmentu”. Bardziej rozbudowana gra może stosować:

- **testy losowe:** rzut kością, losowanie albo generator liczb;
- **testy statystyk:** np. `siła + rzut >= trudność`;
- **zasoby:** zdrowie, czas, pieniądze, paliwo, morale;
- **ekwipunek i flagi:** posiadanie przedmiotu lub wykonanie wcześniejszego działania odblokowuje przejście;
- **relacje:** decyzje zmieniają zaufanie, lojalność lub dostęp do informacji;
- **warunki i konsekwencje:** system sprawdza stan i wyświetla odpowiedni wariant tekstu;
- **pętle:** powrót do wcześniejszej lokacji lub sceny z innym stanem;
- **zagadki:** gracz musi wykorzystać informacje, przedmioty albo logiczne przesłanki;
- **zakończenia:** zwycięstwo, porażka, częściowy sukces, zakończenie otwarte lub kilka równorzędnych finałów.

Warianty z walką, testami umiejętności i ekwipunkiem były szczególnie ważne dla rozwoju gamebooków RPG w latach 80. ([Marco Arnaudo, *Studying Gamebooks*](https://analoggamestudies.org/2023/09/studying-gamebooks-a-framework-for-analysis/)). Mechanika nie jest jednak obowiązkowa — o paragrafowej strukturze decyduje przede wszystkim połączenie fragmentów i wybór ścieżki.

### Drzewo, graf i ponowne łączenie gałęzi

Wizualnie gra może przypominać drzewo, ale w praktyce lepiej myśleć o niej jak o grafie. Gdy każda decyzja tworzy całkowicie osobną dalszą historię, liczba fragmentów rośnie wykładniczo. Dlatego gałęzie często:

- rozchodzą się na krótki czas i wracają do wspólnego węzła;
- zmieniają stan, a późniejszy tekst reaguje na tę zmianę;
- otwierają lub zamykają sceny poboczne;
- prowadzą do tego samego wydarzenia, ale z innym kontekstem, kosztem lub relacją.

Dokumentacja ink opisuje właśnie strukturę, w której wybory mogą się rozgałęziać, łączyć ponownie i zapętlać, przy jednoczesnym śledzeniu stanu historii ([ink, Writing with Ink](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md)). To praktyczny sposób na zachowanie różnorodności bez konieczności pisania osobnej, wielogodzinnej gry dla każdej kombinacji wyborów.

## 3. Dobre praktyki budowania gier paragrafowych

### A. Zacznij od doświadczenia gracza

Najpierw określ, co gracz ma przeżywać: napięcie, ciekawość, poczucie odpowiedzialności, humor, grozę, sprawdzanie hipotez czy wspólnotowe autorstwo. Dopiero potem dobierz reguły i format. Takie odwrócenie kolejności — doświadczenie, następnie mechanika, na końcu medium — rekomenduje podejście player-centric opisane w badaniach nad projektowaniem gamebooków ([Frontiers in Education, 2023](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2023.1335605/full)).

Przed pisaniem warto ustalić:

- kim jest odbiorca i ile czasu ma na jedną sesję;
- czy gracz kieruje sobą, ustaloną postacią, czy całą drużyną;
- czy celem jest wygrana, odkrycie historii, odegranie postaci, czy wspólne dopisywanie kanonu;
- jakie typy decyzji są najważniejsze dla tej konkretnej gry.

### B. Projektuj wybory, nie tylko rozgałęzienia

Dobry wybór spełnia większość z poniższych warunków:

1. wynika z aktualnej sytuacji i nie jest przypadkowym menu;
2. opcje są opisane jako różne zamiary lub działania, a nie tylko „A”, „B”, „C”;
3. gracz rozumie wystarczająco dużo, aby podjąć świadomą decyzję;
4. opcje są kuszące z różnych powodów albo mają realny koszt;
5. konsekwencja jest odczuwalna i pasuje do wybranej intencji;
6. wybór może coś zmienić w świecie, relacji, informacji, zasobie lub sposobie dojścia do finału.

Badanie Cardona-Rivery i współautorów wykazało, że uczestnicy odczuwali większą sprawczość przy wyborach prowadzących do odmiennych stanów sytuacji niż przy wyborach różniących się wyłącznie powierzchownie ([publikacja AAAI](https://ojs.aaai.org/index.php/AIIDE/article/view/12716)). W praktyce nie każdy wybór musi zmieniać główny finał, ale każdy ważny wybór powinien zostawić ślad albo ujawnić coś istotnego o bohaterze i świecie.

### C. Informuj o zasadach i konsekwencjach

Gracz powinien wiedzieć:

- co dokładnie może wybrać;
- czy wybór jest nieodwracalny;
- jakie zasoby i statystyki są aktywne;
- dlaczego opcja jest niedostępna;
- kiedy i w jaki sposób jego wcześniejsza decyzja wpłynęła na tekst.

Nie trzeba ujawniać wszystkich konsekwencji. Warto jednak utrzymać uczciwość: jeśli gracz wybiera „zaryzykuj i otwórz właz”, wynik może być nieprzewidywalny, ale powinien wynikać z wcześniej zbudowanego ryzyka, a nie z arbitralnej kary.

### D. Ograniczaj eksplozję treści

Nie próbuj tworzyć pełnej, niezależnej gałęzi po każdej decyzji. Stosuj świadomie:

- krótkie odnogi z odmiennym skutkiem;
- ponowne łączenie gałęzi po zmianie stanu;
- zmienne i warunkowe warianty zdań;
- sceny poboczne odblokowywane flagą;
- kilka punktów kulminacyjnych, do których można dojść różnymi drogami.

To pozwala zachować poczucie wpływu przy rozsądnym koszcie produkcji. Dokumentacja ink podkreśla możliwość ponownego łączenia przepływu i śledzenia stanu, a nie tylko budowania coraz większego drzewa ([ink, wersja 1.0](https://www.inklestudios.com/2021/02/22/ink-version-1)).

### E. Utrzymuj spójny model stanu

Każda zmienna powinna mieć nazwę, zakres i jasno określony wpływ. Pomocny jest katalog stanu:

| Zmienna | Typ | Kiedy się zmienia | Na co wpływa |
| --- | --- | --- | --- |
| `zaufanie` | liczba 0–5 | decyzje wobec załogi | dostęp do informacji i wariant relacji |
| `maJajo` | prawda/fałsz | zdobycie lub utrata ładunku | finał wyprawy |
| `czas` | liczba | podróż i odpoczynek | presja oraz dostępne sceny |

Dobrą praktyką jest oddzielenie stanu globalnego od zmiennych tymczasowych używanych tylko wewnątrz jednego fragmentu. Manual Twine/Harlowe zwraca uwagę, że zmienne służą do zapamiętywania postępów i statusu gracza, a zmienne tymczasowe ograniczają przypadkowy wpływ kodu na inne fragmenty ([manual Harlowe/Twine](https://twine2.neocities.org/)).

### F. Pisz krótkie, funkcjonalne paragrafy

Każdy fragment powinien mieć jedno zadanie: wprowadzić sytuację, rozwinąć konflikt, dać informację, przeprowadzić konsekwencję albo zamknąć scenę. Czytelność poprawiają:

- wyraźny cel sceny;
- konkretne opcje po opisie sytuacji;
- konsekwencja pokazana przed kolejnym wyborem;
- unikanie długiego tekstu bez punktu decyzji;
- odróżnienie narracji, wypowiedzi i instrukcji systemowych;
- stałe nazewnictwo postaci, przedmiotów, flag i paragrafów.

Druga osoba („wchodzisz”, „widzisz”) dobrze wspiera identyfikację z bohaterem, ale nie jest wymogiem. Ważniejsza jest konsekwencja perspektywy oraz jasne określenie, czy gracz wybiera działanie bohatera, czy tylko jego nastawienie.

### G. Zachowuj pętlę: decyzja → skutek → informacja zwrotna

Po wyborze gracz powinien możliwie szybko zobaczyć, że system go zarejestrował. Informacja zwrotna może mieć postać:

- nowego faktu lub zmienionej sceny;
- reakcji postaci niezależnej;
- zmiany statystyki albo zasobu;
- odblokowania lub zablokowania opcji;
- śladu wracającego w późniejszym fragmencie;
- innego tonu lub szczegółu opisu.

Im późniejsza konsekwencja, tym bardziej warto wcześniej zasugerować, że wybór został zapamiętany. Inaczej gracz może uznać, że decyzja nie miała znaczenia.

### H. Buduj wyzwania uczciwie

Jeśli gra ma testy lub zagadki:

- zapowiedz rodzaj wyzwania i jego stawkę;
- daj graczowi informacje potrzebne do podjęcia decyzji;
- unikaj sytuacji, w której poprawna odpowiedź jest możliwa wyłącznie metodą prób i błędów;
- rozważ częściowy sukces zamiast natychmiastowej śmierci;
- nie pozwalaj, aby los całkowicie unieważnił rozsądny wybór bez odpowiedniego uzasadnienia;
- pokazuj, co zmienił wynik testu.

W grach z zasobami dobrym punktem wyjścia jest kilka prostych, obserwowalnych reguł zamiast wielu nieprzejrzystych modyfikatorów.

### I. Testuj graf, tekst i stany

Testy powinny obejmować trzy poziomy:

1. **Graf:** każdy link prowadzi do istniejącego fragmentu; nie ma niezamierzonych ślepych uliczek, nieskończonych pętli ani niedostępnych zakończeń.
2. **Logika:** warunki, statystyki, ekwipunek i reset gry działają poprawnie.
3. **Narracja:** każdy fragment jest zrozumiały bez znajomości niewybranej ścieżki, a konsekwencje są spójne z wcześniejszymi decyzjami.

W praktyce warto przejść każdą główną ścieżkę, przygotować testowe zapisy z różnymi kombinacjami flag i poprosić osoby z zewnątrz o zagranie bez podpowiedzi autora. Narzędzia do tworzenia interaktywnej fikcji mogą wspierać debugowanie: Twine ma tryby i fragmenty debugowe do podglądu oraz zmiany stanu, a ink udostępnia debugger czasu działania ([Twine debug headers](https://twine2.neocities.org/), [ink version 1.0](https://www.inklestudios.com/2021/02/22/ink-version-1)).

### J. Traktuj dostępność i interfejs jako część narracji

W wersji cyfrowej interfejs powinien:

- jasno odróżniać tekst przeczytany od dostępnych wyborów;
- zachować możliwość obsługi klawiaturą i widoczny fokus;
- nie polegać wyłącznie na kolorze;
- umożliwiać powrót, zapis i restart zgodnie z zamierzoną filozofią gry;
- nie ukrywać ważnej informacji w zbyt małym lub zbyt dekoracyjnym elemencie;
- sygnalizować wybór i przejście bez animacji utrudniających czytanie.

W grze współtworzonej warto dodatkowo rozróżnić tekst kanoniczny, propozycje oraz opcję wybraną przez społeczność. To chroni czytelność historii i pozwala zrozumieć, jaki jest status każdego fragmentu.

## Wnioski dla GMG-GameBook

Na podstawie obecnej struktury repozytorium można opisać projekt jako wariant **współtworzonej paragrafówki**: społeczność proponuje kolejne opcje i teksty, następnie wybrana opcja oraz zwycięskie zgłoszenie budują jeden kanoniczny ciąg. W kodzie odpowiadają temu m.in. `Round`, `Option`, `Submission` i `CanonEntry` w `src/domain/story.ts`.

Z tego wynikają następujące zasady projektowe:

- **Rozdziel dwa grafy:** graf wszystkich propozycji i relacji rundy oraz graf kanonu, czyli wybranej ścieżki. Dzięki temu odrzucone opcje pozostają częścią historii procesu, ale nie mieszają się z głównym tekstem.
- **Traktuj rundę jako węzeł decyzyjny:** ma tekst kontekstu, zestaw opcji, zgłoszenia społeczności i jedną decyzję kanoniczną.
- **Zachowaj ślad autorstwa:** przy każdym fragmencie pokazuj autora, wybraną opcję i status, ponieważ w tym projekcie proces powstawania jest częścią doświadczenia.
- **Waliduj spójność danych:** runda powinna mieć właściwe opcje, najwyżej jedną wybraną opcję i najwyżej jedno zwycięskie zgłoszenie; kanon nie powinien zawierać duplikatów ani zgłoszeń niezwiązanych z wybraną opcją.
- **Nie zakładaj klasycznego systemu RPG bez decyzji projektowej:** obecny model opiera się na wyborze społeczności i narracji, a nie na statystykach czy losowości. Mechaniki można dodać później, ale powinny wspierać doświadczenie, a nie komplikować model danych.
- **Dbaj o czytelny kanon:** główny widok może być liniowym archiwum wybranej ścieżki, natomiast widok mapy/grafu powinien pokazywać alternatywy i proces selekcji.

Najbardziej naturalnym następnym krokiem projektowym jest ustalenie, czy GMG-GameBook ma pozostać przede wszystkim archiwum wspólnie wybranego kanonu, czy ma również oferować osobne, grywalne przechodzenie alternatywnymi ścieżkami. Pierwszy wariant wymaga głównie przejrzystego procesu rund i historii decyzji; drugi — dodatkowo modelu stanu, warunków, zakończeń oraz testów wszystkich możliwych przejść.

## Proponowana checklista

- [ ] Czy początek jasno określa sytuację, cel i stawkę?
- [ ] Czy każda opcja jest działaniem lub stanowiskiem, a nie losowym przyciskiem?
- [ ] Czy wybory prowadzą do różnic, które gracz może zauważyć?
- [ ] Czy tekst pamięta ważne decyzje i pokazuje ich konsekwencje?
- [ ] Czy liczba gałęzi jest możliwa do napisania, utrzymania i przetestowania?
- [ ] Czy istnieją jasne zasady dla statystyk, zasobów i warunków?
- [ ] Czy każde zakończenie jest zamierzone i opisane jako rezultat wcześniejszej gry?
- [ ] Czy można przejść każdą ścieżkę bez błędnych linków i sprzeczności?
- [ ] Czy gracz rozumie status kanonu, propozycji i wybranej opcji?
- [ ] Czy interfejs wspiera czytanie, nawigację klawiaturą i widoczną informację zwrotną?

## Źródła

- [Analog Game Studies — *Studying Gamebooks: A Framework for Analysis*](https://analoggamestudies.org/2023/09/studying-gamebooks-a-framework-for-analysis/)
- [Frontiers in Education — *Gamebooks and branching narratives in education*](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2023.1335605/full)
- [Cardona-Rivera i in. — *Foreseeing Meaningful Choices*, AAAI AIIDE](https://ojs.aaai.org/index.php/AIIDE/article/view/12716)
- [inkle — *Writing with Ink*](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md)
- [inkle — *ink version 1.0 release*](https://www.inklestudios.com/2021/02/22/ink-version-1)
- [Twine / Harlowe — manual](https://twine2.neocities.org/)
- [Science Fiction Encyclopedia — *Gamebook*](https://sf-encyclopedia.com/entry/gamebook)
