import { ArrowUpRight, BookOpen, Clock, Map } from 'lucide-react'
import * as React from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import {
  getCanonicalEntries,
  getActiveRound,
  getSelectedOption,
  getSubmission,
  story,
} from './domain/story'
import { MapPage } from './components/MapPage'
import './App.css'

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

const getTimeRemaining = (deadline: string, now: number) => {
  const totalSeconds = Math.max(0, Math.floor((new Date(deadline).getTime() - now) / 1000))

  return {
    expired: totalSeconds === 0,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function DeadlineCountdown({ deadline }: { deadline?: string }) {
  const [now, setNow] = React.useState(() => Date.now())

  React.useEffect(() => {
    if (!deadline) return undefined
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [deadline])

  if (!deadline) return <span className="deadline-missing">Termin do ustalenia</span>

  const remaining = getTimeRemaining(deadline, now)
  if (remaining.expired) return <span className="deadline-missing">Termin minął</span>

  return (
    <span className="deadline-countdown" aria-live="polite">
      <Clock size={17} aria-hidden="true" />
      <strong>{remaining.days}d</strong>
      <strong>{String(remaining.hours).padStart(2, '0')}g</strong>
      <strong>{String(remaining.minutes).padStart(2, '0')}m</strong>
      <strong>{String(remaining.seconds).padStart(2, '0')}s</strong>
    </span>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label={`${story.contest.title} - strona główna`}>
          <span className="wordmark-mark">SN16</span>
          <span>{story.contest.title}</span>
        </Link>
        <nav aria-label="Główna nawigacja">
          <NavLink to="/kanon">Kanon</NavLink>
          <NavLink to="/mapa">Mapa</NavLink>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <span>Wspólna opowieść, zachowane wszystkie ścieżki.</span>
        <span>Stan konkursu: {story.contest.status === 'open' ? 'otwarty' : 'zamknięty'}</span>
      </footer>
    </div>
  )
}

function HomePage() {
  const latestRound = getActiveRound(story) ?? story.rounds.at(-1)
  const canonCount = getCanonicalEntries(story).length + 1
  const selectedOption = latestRound
    ? getSelectedOption(story, latestRound.id)
    : undefined

  return (
    <>
      <section className="home-hero">
        <p className="eyebrow">Konkursowa paragrafówka</p>
        <h1>{story.contest.title}</h1>
        <p className="hero-copy">{story.contest.description}</p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/kanon">
            <BookOpen size={18} aria-hidden="true" /> Czytaj kanon
          </Link>
          <Link className="text-link" to="/mapa">
            Zobacz drzewo historii <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="hero-rule" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="status-band" aria-labelledby="status-heading">
        <div>
          <p className="eyebrow">Teraz trwa</p>
          <h2 id="status-heading">Runda {latestRound?.number}: wybór ścieżki</h2>
        </div>
        <p>
          {selectedOption
            ? `Wybrano opcję ${selectedOption.label}. `
            : 'Wybierz jedną z trzech opcji. '}
          Zgłoszenia można dodawać do{' '}
          {latestRound?.submissionDeadline ? formatDate(latestRound.submissionDeadline) : 'ustalenia'}.
        </p>
        <DeadlineCountdown deadline={latestRound?.submissionDeadline} />
      </section>

      <section className="path-overview" aria-labelledby="overview-heading">
        <div className="section-intro">
          <p className="eyebrow">Oficjalna ścieżka</p>
          <h2 id="overview-heading">Kanon rośnie fragment po fragmencie.</h2>
          <p>
            Oceniający wybiera tekst, a grupa decyduje, w którą stronę historia pójdzie dalej.
          </p>
        </div>
        <div className="stat-grid">
          <article>
            <strong>{canonCount}</strong>
            <span>fragmenty w kanonie</span>
          </article>
          <article>
            <strong>{story.openingSubmissions.length + story.submissions.length}</strong>
            <span>zachowanych zgłoszeń</span>
          </article>
          <article>
            <strong>{story.rounds.length}</strong>
            <span>rozegrane rundy</span>
          </article>
        </div>
      </section>

      <section className="explore-grid" aria-label="Przejdź do widoku">
        <Link className="explore-link" to="/mapa">
          <Map size={22} aria-hidden="true" />
          <span><strong>Mapa historii</strong>Zobacz wszystkie rozgałęzienia.</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </>
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
