import { ArrowUpRight, LockKeyhole, Radio, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  continuationInstance,
  getContinuationSourceParagraph,
  type ContinuationRound,
} from '../domain/continuationStory'

function RoundRecord({ round }: { round: ContinuationRound }) {
  const selectedOption = round.options.find((option) => option.id === round.selectedOptionId)
  const paragraph = continuationInstance.paragraphs.find((item) => item.id === round.paragraphId)

  if (!selectedOption || !paragraph) return null

  return (
    <section className="continuation-round" aria-labelledby={round.id}>
      <div className="continuation-round-index">{round.number.toString().padStart(2, '0')}</div>
      <div className="continuation-round-body">
        <div className="continuation-round-label">
          <span id={round.id}>Runda {round.number}</span>
          <span>Instancja robocza</span>
        </div>
        <p className="continuation-prompt">{round.prompt}</p>
        <div className="continuation-choice">
          <span>Wybrana ścieżka · opcja {selectedOption.label}</span>
          <strong>{selectedOption.text}</strong>
        </div>
        <article className="continuation-paragraph">
          <header>
            <span>Paragraf {round.number}</span>
            <span>{paragraph.authorName}</span>
          </header>
          {paragraph.text.split('. ').map((sentence, index, sentences) => (
            <span key={paragraph.id + '-' + index}>
              {sentence}{index < sentences.length - 1 ? '. ' : ''}
            </span>
          ))}
        </article>
        <details className="continuation-alternatives">
          <summary>Pokaż planowane odnogi ({round.options.filter((option) => !option.canonical).length})</summary>
          <div>
            {round.options.filter((option) => !option.canonical).map((option) => (
              <article key={option.id}>
                <strong>Opcja {option.label}</strong>
                <p>{option.text}</p>
                <small>Źródła: {option.sourceSubmissionIds.join(', ')}</small>
              </article>
            ))}
          </div>
        </details>
      </div>
    </section>
  )
}

export function ContinuationPage() {
  const sourceParagraph = getContinuationSourceParagraph()

  return (
    <section className="continuation-page">
      <div className="screen-noise" aria-hidden="true" />
      <header className="continuation-header">
        <div>
          <p className="eyebrow">Osobna instancja drzewa</p>
          <h1>{continuationInstance.title}</h1>
          <p>
            Wersja robocza rozwijana poza zamkniętym kanonem ośmiu kolejek. Punkt
            startowy pozostaje referencją, a nie częścią modyfikowanego drzewa.
          </p>
          <Link className="continuation-launch" to="/instancja/gra">
            Uruchom kokpit gry <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="continuation-status">
          <LockKeyhole size={16} aria-hidden="true" />
          <span>ŹRÓDŁO ZABLOKOWANE</span>
        </div>
      </header>

      <div className="continuation-notice">
        <ShieldAlert size={18} aria-hidden="true" />
        <div>
          <strong>Instancja robocza v1</strong>
          <p>
            Oryginalna historia GMG pozostaje zamknięta po 8. kolejce. Teksty
            poniżej są nową linią pracy i mogą zostać później rozgałęzione.
          </p>
        </div>
      </div>

      {sourceParagraph && (
        <article className="continuation-source">
          <header>
            <span>Źródło startowe</span>
            <span>Paragraf 8 · {sourceParagraph.authorName}</span>
          </header>
          <p>{sourceParagraph.text}</p>
          <Link to="/kanon">
            Otwórz zamknięty kanon <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </article>
      )}

      <div className="continuation-divider">
        <Radio size={15} aria-hidden="true" />
        <span>Transmisja kontynuacji od rundy 9</span>
      </div>

      <div className="continuation-stream">
        {continuationInstance.rounds.map((round) => (
          <RoundRecord key={round.id} round={round} />
        ))}
      </div>

      <footer className="continuation-footer">
        <strong>Główna linia instancji kończy się po rundzie 12.</strong>
        <p>
          Alternatywne opcje są zapisane jako zalążki przyszłych linii. Nie
          zmieniają zamkniętego kanonu i nie mają jeszcze własnych paragrafów.
        </p>
      </footer>
    </section>
  )
}
