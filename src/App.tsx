import { ArrowUpRight, BookOpen, ChevronRight, Map as MapIcon, Terminal, Telescope } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import {
  getCanonicalEntries,
  getSelectedOption,
  getSubmission,
  story,
} from './domain/story'
import { worldEntries } from './domain/world'
import { MapPage } from './components/MapPage'
import ratAsset from './assets/szczur-16-blueprint 1.png'
import './App.css'
import '@xyflow/react/dist/style.css'

const formatCountdown = (deadline?: string) => {
  if (!deadline) return '--:--:--'

  const remainingSeconds = Math.max(0, Math.floor((new Date(deadline).getTime() - Date.now()) / 1000))
  const days = Math.floor(remainingSeconds / 86400)
  const hours = Math.floor((remainingSeconds % 86400) / 3600)
  const minutes = Math.floor((remainingSeconds % 3600) / 60)
  const seconds = remainingSeconds % 60
  const pad = (value: number) => value.toString().padStart(2, '0')

  return `${pad(days)}D ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

function DeadlineCountdown({ deadline }: { deadline?: string }) {
  const [countdown, setCountdown] = useState(() => formatCountdown(deadline))

  useEffect(() => {
    const updateCountdown = () => setCountdown(formatCountdown(deadline))
    const timerId = window.setInterval(updateCountdown, 1000)

    updateCountdown()
    return () => window.clearInterval(timerId)
  }, [deadline])

  return <span aria-live="polite">{countdown}</span>
}

function ConsoleHeader({ standalone = false }: { standalone?: boolean }) {
  const isOpen = story.contest.status === 'open'
  const currentRound = story.rounds.at(-1)
  const roundLabel = currentRound?.number.toString().padStart(2, '0') ?? '--'

  return (
    <header className={`console-header${standalone ? ' app-console-header' : ''}`}>
      <Link className="console-prompt" to="/" aria-label="Szczur numer 16, strona główna">
        <Terminal size={15} strokeWidth={2.5} aria-hidden="true" />
        <span>&gt; SZCZUR_NR_16 // KONSOLA ZAŁOGANTA</span>
      </Link>
      <span className={`console-status${isOpen ? ' is-active' : ''}`}>
        STATUS: Runda_{roundLabel} // do końca: <DeadlineCountdown deadline={currentRound?.submissionDeadline} />
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

const breadcrumbLabels: Record<string, string> = {
  '/kanon': 'KANON',
  '/rundy': 'RUNDY',
  '/zgloszenia': 'ARCHIWUM ZGŁOSZEŃ',
  '/mapa': 'MAPA ZGŁOSZEŃ',
  '/swiat': 'KATALOG ŚWIATA',
}

function Breadcrumbs() {
  const location = useLocation()
  const currentLabel = breadcrumbLabels[location.pathname]

  if (!currentLabel) return null

  return (
    <nav className="breadcrumbs" aria-label="Okruszki nawigacji">
      <Link to="/">GŁÓWNA DYREKTYWA</Link>
      <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
      <span aria-current="page">{currentLabel}</span>
    </nav>
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
      {!isHome && <Breadcrumbs />}
      <main>{children}</main>
      {isHome ? null : <ConsoleFooter standalone />}
    </div>
  )
}

function HomePage() {
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
        <Link className="console-panel" to="/swiat">
          <div className="panel-heading">
            <span>[ ŚWIAT ]</span>
            <Telescope size={16} aria-hidden="true" />
          </div>
          <div className="panel-content">
            <strong>POZNAJ ŚWIAT</strong>
            <span>ISTOTY, BOHATEROWIE I ARTEFAKTY LABIRYNTU</span>
          </div>
        </Link>
      </section>

      <ConsoleFooter />
    </div>
  )
}

function WorldPage() {
  return (
    <section className="world-page">
      <div className="screen-noise" aria-hidden="true" />
      <header className="world-header">
        <div>
          <h1>KATALOG ŚWIATA</h1>
          <p>Elementy, osoby i przedmioty napotkane przez załogę Szczura nr 16 w Nieskończonym Labiryncie.</p>
        </div>
        <span className="world-index">{worldEntries.length.toString().padStart(2, '0')} REKORDY</span>
      </header>

      <div className="world-grid">
        {worldEntries.map((entry) => (
          <article className="world-entry" key={entry.id}>
            <header className="world-entry-header">
              <span>{entry.category}</span>
              <span>{entry.id}</span>
            </header>
            <h2>{entry.name}</h2>
            <p>{entry.description}</p>
            <dl className="world-entry-facts">
              {entry.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
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
        <Route path="/swiat" element={<WorldPage />} />
      </Routes>
    </Layout>
  )
}

export default App
