import { ArrowUpRight, BookOpen, Map as MapIcon, Terminal, Settings2 } from 'lucide-react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
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

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={`app-shell${isHome ? ' home-shell' : ''}`}>
      {isHome ? null : (
        <header className="site-header">
          <Link className="wordmark" to="/" aria-label={`${story.contest.title} - strona główna`}>
            <span className="wordmark-mark">SN16</span>
            <span>{story.contest.title}</span>
          </Link>
          <nav aria-label="Główna nawigacja">
            <NavLink to="/kanon">Kanon</NavLink>
            <NavLink to="/rundy">Rundy</NavLink>
            <NavLink to="/zgloszenia">Archiwum</NavLink>
            <NavLink to="/mapa">Mapa</NavLink>
          </nav>
        </header>
      )}
      <main>{children}</main>
      {isHome ? null : (
        <footer className="site-footer">
          <span>Wspólna opowieść, zachowane wszystkie ścieżki.</span>
          <span>Stan konkursu: {story.contest.status === 'open' ? 'otwarty' : 'zamknięty'}</span>
        </footer>
      )}
    </div>
  )
}

function HomePage() {
  const latestRound = story.rounds.at(-1)
  const isOpen = story.contest.status === 'open'
  const roundNumber = latestRound?.number.toString().padStart(2, '0') ?? '--'
  const deadline = latestRound?.submissionDeadline
    ? formatDate(latestRound.submissionDeadline)
    : 'DO USTALENIA'

  return (
    <div className="home-screen">
      <div className="screen-noise" aria-hidden="true" />
      <header className="console-header">
        <Link className="console-prompt" to="/" aria-label="Szczur numer 16, strona główna">
          <Terminal size={15} strokeWidth={2.5} aria-hidden="true" />
          <span>&gt; SZCZUR_NR_16 // KONSOLA ZAŁOGANTA</span>
        </Link>
        <span className={`console-status${isOpen ? ' is-active' : ''}`}>
          STATUS: {isOpen ? 'AKTYWNY' : 'ZAMKNIĘTY'}
        </span>
      </header>

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

      <footer className="home-footer">
        <span>VER_SYS_1.0</span>
        <span>ZALOGOWANY ZAŁOGANT: WITFANG</span>
      </footer>
    </div>
  )
}

function CanonPage() {
  const entries = getCanonicalEntries(story)
  const latestRound = story.rounds.at(-1)

  return (
    <section className="reading-layout">
      <header className="reading-header">
        <p className="eyebrow">Oficjalna linia opowieści</p>
        <h1>Kanon</h1>
        <p>Wszystkie zwycięskie paragrafy, w kolejności, w której stały się historią.</p>
      </header>

      <article className="canon-entry canon-opening">
        <div className="entry-meta"><span>Runda 1</span><span>{story.openingParagraph.authorName}</span></div>
        <p>{story.openingParagraph.text}</p>
      </article>

      {entries.map((entry) => {
        const paragraph = getSubmission(story, entry.paragraphId)
        const round = story.rounds.find((item) => item.id === paragraph?.roundId)
        const option = round ? getSelectedOption(story, round.id) : undefined

        if (!paragraph || !round || !option) return null

        return (
          <div className="canon-step" key={entry.sequenceNumber}>
            {round.prompt && (
              <article className="canon-entry">
                <div className="entry-meta"><span>Paragraf {round.number - 1}</span></div>
                <p>{round.prompt}</p>
              </article>
            )}
            <div className="chosen-option">
              <span>Runda {round.number} · wybrana opcja {option.label}</span>
              <strong>{option.text}</strong>
            </div>
            <article className="canon-entry">
              <div className="entry-meta"><span>Paragraf {entry.sequenceNumber}</span><span>{paragraph.authorName}</span></div>
              <p>{paragraph.text}</p>
            </article>
          </div>
        )
      })}

      <aside className="canon-pending">
        <span>Teraz</span>
        <div>
          <strong>Runda {latestRound?.number}</strong>
          <p>
            {latestRound && getSelectedOption(story, latestRound.id)
              ? 'Wybrana opcja czeka na zwycięski paragraf.'
              : 'Czekamy na wybór ścieżki.'}
          </p>
        </div>
        <Link to="/mapa">Zobacz na mapie <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </aside>
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
