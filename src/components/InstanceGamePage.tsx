import {
  ArrowDown,
  ArrowUp,
  Check,
  Home,
  RotateCcw,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPlayableNode, playableStory, type PlayableNode, type PlayableOption } from '../domain/playableStory'
import { story } from '../domain/story'

function CockpitButton({
  label,
  onClick,
  disabled = false,
  active = false,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  active?: boolean
}) {
  return (
    <button
      type="button"
      className={`cockpit-button${active ? ' is-active' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {label === 'GÓRA' && <ArrowUp size={17} aria-hidden="true" />}
      {label === 'DÓŁ' && <ArrowDown size={17} aria-hidden="true" />}
      {label === 'ZATWIERDŹ' && <Check size={17} aria-hidden="true" />}
      {label === 'RESET' && <RotateCcw size={15} aria-hidden="true" />}
      <span>{label}</span>
    </button>
  )
}

function ChoiceList({
  node,
  selectedIndex,
  onSelect,
}: {
  node: PlayableNode
  selectedIndex: number | null
  onSelect: (index: number) => void
}) {
  return (
    <div className="game-choice-list" role="radiogroup" aria-label="Opcje działania">
      {node.options.map((option, index) => (
        <button
          type="button"
          className={`game-choice${selectedIndex === index ? ' is-selected' : ''}`}
          key={option.id}
          onClick={() => onSelect(index)}
          role="radio"
          aria-checked={selectedIndex === index}
        >
          <span className="game-choice-number">{option.label}</span>
          <span className="game-choice-copy">{option.text}</span>
          <span className="game-choice-mark" aria-hidden="true">
            {selectedIndex === index ? '◆' : '◇'}
          </span>
        </button>
      ))}
    </div>
  )
}

export function InstanceGamePage() {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentNodeId, setCurrentNodeId] = useState(playableStory.startNodeId)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedOption, setSelectedOption] = useState<PlayableOption | null>(null)
  const currentNode = getPlayableNode(currentNodeId)
  const isFinalScreen = currentNode?.terminal ?? false
  const progressLabel = `${currentNode?.roundNumber.toString().padStart(2, '0') ?? '--'} / ${playableStory.totalRounds.toString().padStart(2, '0')}`

  const resetGame = () => {
    setHasStarted(false)
    setCurrentNodeId(playableStory.startNodeId)
    setSelectedIndex(null)
    setSelectedOption(null)
  }

  const confirmSelection = () => {
    if (!currentNode || isFinalScreen || selectedIndex === null) return

    const nextOption = currentNode.options[selectedIndex]
    const nextNode = getPlayableNode(nextOption?.nextNodeId ?? '')
    if (!nextOption || !nextNode) return

    setSelectedOption(nextOption)
    setCurrentNodeId(nextNode.id)
    setSelectedIndex(null)
  }

  const moveSelection = (direction: 'up' | 'down') => {
    if (isFinalScreen) return

    setSelectedIndex((current) => {
      if (current === null) return direction === 'up' ? currentNode.options.length - 1 : 0
      return (current + (direction === 'up' ? currentNode.options.length - 1 : 1)) % currentNode.options.length
    })
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        moveSelection('up')
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        moveSelection('down')
      }
      if (event.key === 'Enter') {
        event.preventDefault()
        confirmSelection()
      }
      if (event.key === 'Backspace') {
        event.preventDefault()
        resetGame()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  if (!currentNode) return null

  if (!hasStarted) {
    return (
      <section className="game-page game-start-page">
        <div className="screen-noise" aria-hidden="true" />
        <div className="game-start-card">
          <p className="game-start-kicker">R-16 // INSTANCJA GRY</p>
          <h1>{playableStory.title}</h1>
          <p className="game-start-copy">{story.openingParagraph.text}</p>
          <button
            type="button"
            className="game-start-button"
            onClick={() => setHasStarted(true)}
          >
            <span>Start</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="game-page">
      <div className="screen-noise" aria-hidden="true" />
      <div className="cockpit">
        <div className="cockpit-scene">
          <div className="scene-content">
            <div className="scene-kicker">
              <span>R-16 / {progressLabel}</span>
            </div>

            {selectedOption && (
              <p className="scene-selected-option">{selectedOption.text}</p>
            )}
            <p className="scene-text scene-paragraph">{currentNode.paragraphText}</p>

            {!isFinalScreen && (
              <ChoiceList
                node={currentNode}
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
              />
            )}
          </div>
        </div>

        <aside className="cockpit-console" aria-label="Konsola sterowania">
          <div className="control-deck">
            <div className="direction-pad" aria-label="Nawigacja opcji">
              <CockpitButton label="GÓRA" onClick={() => moveSelection('up')} disabled={isFinalScreen} />
              <CockpitButton label="DÓŁ" onClick={() => moveSelection('down')} disabled={isFinalScreen} />
            </div>
            <div className="action-pad" aria-label="Akcje gry">
              <CockpitButton label="ZATWIERDŹ" onClick={confirmSelection} active={selectedIndex !== null} disabled={isFinalScreen} />
              <CockpitButton label="RESET" onClick={resetGame} />
            </div>
            <Link className="cockpit-button cockpit-home-button" to="/" aria-label="Powrót do strony głównej GMG-GameBook">
              <Home size={16} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}
