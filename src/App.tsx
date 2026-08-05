import { ArrowUpRight, BookOpen, Map as MapIcon, Terminal, Settings2 } from 'lucide-react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import {
  getCanonicalEntries,
  getSelectedOption,
  getSubmission,
  story,
} from './domain/story'
import { MapPage } from './components/MapPage'
import ratAsset from './assets/szczur-16-blueprint 1.png'
import './App.css'
import '@xyflow/react/dist/style.css'

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

function ConsoleHeader({ standalone = false }: { standalone?: boolean }) {
  const isOpen = story.contest.status === 'open'

  return (
    <header className={`console-header${standalone ? ' app-console-header' : ''}`}>
      <Link className="console-prompt" to="/" aria-label="Szczur numer 16, strona główna">
        <Terminal size={15} strokeWidth={2.5} aria-hidden="true" />
        <span>&gt; SZCZUR_NR_16 // KONSOLA ZAŁOGANTA</span>
      </Link>
      <span className={`console-status${isOpen ? ' is-active' : ''}`}>
        STATUS: {isOpen ? 'AKTYWNY' : 'ZAMKNIĘTY'}
      </span>
    </header>
  )
}

function ConsoleFooter({ standalone = false }: { standalone?: boolean }) {
  return (
    <footer className={`home-footer${standalone ? ' app-console-footer' : ''}`}>
      <span>VER_SYS_1.0</span>
      <span>ZALOGOWANY ZAŁOGANT: WITFANG</span>
    </footer>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isCanon = location.pathname === '/kanon'
  const usesHomeShell = isHome || isCanon

  return (
    <div className={`app-shell${usesHomeShell ? ' home-shell' : ''}${isCanon ? ' canon-shell' : ''}`}>
      {isHome ? null : <ConsoleHeader standalone />}
      <main>{children}</main>
      {isHome ? null : <ConsoleFooter standalone />}
    </div>
  )
}

function HomePage() {
  const latestRound = story.rounds.at(-1)
  const roundNumber = latestRound?.number.toString().padStart(2, '0') ?? '--'
  const deadline = latestRound?.submissionDeadline
    ? formatDate(latestRound.submissionDeadline)
    : 'DO USTALENIA'

  return (
    <div className="home-screen">
      <div className="screen-noise" aria-hidden="true" />
      <ConsoleHeader />

      <section className="directive-hero" aria-labelledby="directive-title">
        <div className="rat-art">
          <img className="rat-image" src={ratAsset} alt="Biomechaniczny Szczur numer 16" />
        </div>
        <h1 id="directive-title">GŁÓWNA DYREKTYWA</h1>
        <p className="directive-copy">
          PODĄŻAJ ZA SZCZUREM 16 PRZEZ NIESKOŃCZONY LABIRYNT.<br />
          UNIKAJ KOTA.
        </p>
      </section>

      <section className="console-panels" aria-label="Moduły konsoli">
        <Link className="console-panel" to="/kanon">
          <div className="panel-heading">
            <span>[ PLIKI ]</span>
            <BookOpen size={16} aria-hidden="true" />
          </div>
          <div className="panel-content">
            <strong>CZYTAJ KANON</strong>
            <span>TO CO KAŻDY ZAŁOGANT WIEDZIEĆ POWINIEN</span>
          </div>
        </Link>
        <Link className="console-panel" to="/mapa">
          <div className="panel-heading">
            <span>[ DANE ]</span>
            <MapIcon size={16} aria-hidden="true" />
          </div>
          <div className="panel-content">
            <strong>DRZEWO HISTORII</strong>
            <span>ZASŁUŻENI W BOJU I ODZNACZENI ZAŁOGANCI</span>
          </div>
        </Link>
        <div className="console-panel console-panel-system">
          <div className="panel-heading">
            <span>[ SYSTEM ]</span>
            <Settings2 size={16} aria-hidden="true" />
          </div>
          <dl className="system-readout">
            <div><dt>RUNDA:</dt><dd>{roundNumber}</dd></div>
            <div><dt>TERMIN:</dt><dd>{deadline}</dd></div>
            <div><dt>DO KOŃCA:</dt><dd>16_BIO</dd></div>
          </dl>
        </div>
      </section>

      <ConsoleFooter />
    </div>
  )
}

function CanonPage() {
  const entries = getCanonicalEntries(story)
  const latestRound = story.rounds.at(-1)
  const pendingOptions = latestRound
    ? story.options.filter((option) => option.roundId === latestRound.id)
    : []

  return (
    <section className="canon-page">
      <div className="screen-noise" aria-hidden="true" />
      <header className="canon-header">
        <div>
          <h1>KANON</h1>
          <p>Oficjalny zapis zwycięskich paragrafów Szczura nr 16. Każdy rekord prowadzi do następnej decyzji załogi.</p>
        </div>
      </header>

      <div className="canon-stream">
        <article className="canon-record canon-record-opening">
          <header className="canon-record-header">
            <span className="canon-record-id">KOLEJKA 1</span>
            <span>PARAGRAF OTWIERAJĄCY</span>
            <span>{story.openingParagraph.authorName}</span>
          </header>
          <p>{story.openingParagraph.text}</p>
        </article>

        {entries.map((entry) => {
          const paragraph = getSubmission(story, entry.paragraphId)
          const round = story.rounds.find((item) => item.id === paragraph?.roundId)
          const option = round ? getSelectedOption(story, round.id) : undefined

          if (!paragraph || !round || !option) return null

          return (
            <div className="canon-sequence-step" key={entry.sequenceNumber}>
              <div className="canon-sequence-rail" aria-hidden="true">
                <span>{entry.sequenceNumber.toString().padStart(2, '0')}</span>
              </div>
              <div className="canon-sequence-content">
                {round.prompt && (
                  <article className="canon-transition canon-prompt">
                    <header className="canon-transition-header">
                      <span>KONTEKST</span>
                      <span>TERMOS</span>
                    </header>
                    <p>{round.prompt}</p>
                  </article>
                )}
                <div className="canon-choice">
                  <span>OPCJA {option.label}</span>
                  <strong>{option.text}</strong>
                </div>
                <article className="canon-record">
                  <header className="canon-record-header">
                      <span>ZWYCIĘSKI PARAGRAF</span>
                    <span>{paragraph.authorName}</span>
                  </header>
                  <p>{paragraph.text}</p>
                </article>
              </div>
            </div>
          )
        })}

        <aside className="canon-pending">
          <div className="canon-pending-summary">
            <strong>RUNDA {latestRound?.number ?? '--'} // OCZEKUJE</strong>
            <p>Wybierz jedną z trzech opcji.</p>
          </div>
          <div className="canon-pending-options" aria-label="Opcje do wyboru">
            {pendingOptions.map((option) => (
              <div className="canon-pending-option" key={option.id}>
                <strong>OPCJA {option.label}</strong>
                <p>{option.text}</p>
              </div>
            ))}
          </div>
          <Link to="/mapa">Otwórz mapę <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </aside>
      </div>
    </section>
  )
}

function ComingSoonPage({ title }: { title: string }) {
  return (
    <section className="placeholder-page">
      <p className="eyebrow">W przygotowaniu</p>
      <h1>{title}</h1>
      <p>Ten widok zostanie dodany w kolejnym kroku implementacji.</p>
      <Link className="text-link" to="/kanon">Przeczytaj kanon <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </section>
  )
}

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kanon" element={<CanonPage />} />
        <Route path="/rundy" element={<ComingSoonPage title="Rundy" />} />
        <Route path="/zgloszenia" element={<ComingSoonPage title="Archiwum zgłoszeń" />} />
        <Route path="/mapa" element={<MapPage />} />
      </Routes>
    </Layout>
  )
}

export default App
