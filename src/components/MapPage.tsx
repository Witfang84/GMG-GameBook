import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  type NodeProps,
} from '@xyflow/react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { createStoryGraph, type StoryNode, type StoryNodeData } from '../domain/storyGraph'
import { story } from '../domain/story'
import '@xyflow/react/dist/style.css'

const graph = createStoryGraph(story)

const nodeLabels: Record<StoryNodeData['kind'], string> = {
  opening: 'Kanon',
  round: 'Runda',
  option: 'Opcja',
  submission: 'Zgłoszenie',
  unassigned: 'Relacja',
}

function StoryNodeCard({ data }: NodeProps<StoryNode>) {
  const nodeClassName = [
    'story-node',
    `story-node-${data.kind}`,
    data.canonical ? 'is-canonical' : '',
    data.selected ? 'is-selected' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (data.kind === 'option') {
    return (
      <div className={nodeClassName}>
        <Handle type="target" position={Position.Left} />
        <div className="story-node-kicker">Opcja</div>
        {data.authorName && <span className="story-node-option-author">{data.authorName}</span>}
        <strong>{data.optionLabel}</strong>
        {data.text && <p>{data.text}</p>}
        <Handle type="source" position={Position.Right} />
      </div>
    )
  }

  if (data.kind === 'submission' || (data.kind === 'round' && data.canonical)) {
    return (
      <div className={nodeClassName}>
        <Handle type="target" position={Position.Left} />
        {data.canonical && <div className="story-node-kicker">Kanon</div>}
        <strong className="story-node-author">{data.authorName}</strong>
        {data.text && <p className="story-node-full-text">{data.text}</p>}
        <Handle type="source" position={Position.Right} />
      </div>
    )
  }

  return (
    <div className={nodeClassName}>
      <Handle type="target" position={Position.Left} />
      <div className="story-node-kicker">
        <span>{data.canonical ? 'Kanon' : nodeLabels[data.kind]}</span>
      </div>
      {data.title && <strong>{data.title}</strong>}
      <span className="story-node-subtitle">{data.subtitle}</span>
      {data.text && <p>{data.text}</p>}
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

const nodeTypes = { story: StoryNodeCard }

export function MapPage() {
  return (
    <section className="map-page">
      <header className="map-header">
        <div>
          <p className="eyebrow">Wszystkie ścieżki</p>
          <h1>Mapa zgłoszeń</h1>
          <p>Drzewo historii od paragrafu otwierającego przez opcje rund do wszystkich nadesłanych tekstów.</p>
        </div>
        <div className="map-summary">
          <strong>{story.openingSubmissions.length + story.submissions.length}</strong>
          <span>zgłoszeń na mapie</span>
        </div>
      </header>

      <div className="map-layout">
        <div className="map-canvas-shell">
          <div className="map-canvas" aria-label="Interaktywna mapa zgłoszeń">
            <ReactFlow
              nodes={graph.nodes}
              edges={graph.edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.18, minZoom: 0.15, maxZoom: 1 }}
              nodesConnectable={false}
              nodesDraggable
              elementsSelectable
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#cfc2ad" gap={24} size={1} />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>
        </div>
      </div>
      <Link className="map-back-link" to="/kanon">
        Przeczytaj kanon <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </section>
  )
}
