import type { Edge, Node } from '@xyflow/react'
import type { OpeningSubmission, StoryData } from './story'
import { getCanonicalEntries, getRoundOptions, getRoundSubmissions } from './story'

export type StoryNodeKind = 'opening' | 'round' | 'option' | 'submission' | 'unassigned'

export interface StoryNodeData extends Record<string, unknown> {
  kind: StoryNodeKind
  title: string
  subtitle: string
  text?: string
  authorName?: string
  roundNumber?: number
  optionLabel?: string
  status?: string
  canonical: boolean
  selected: boolean
  inferred: boolean
}

export interface StoryEdgeData extends Record<string, unknown> {
  canonical: boolean
  inferred: boolean
}

export type StoryNode = Node<StoryNodeData>
export type StoryEdge = Edge<StoryEdgeData>

type StoryNodeGroup = {
  id: string
  data: StoryNodeData
  submissions: Array<{ id: string; data: StoryNodeData }>
}

const nodeWidth = 496
const verticalGap = 16
const horizontalGap = 64

const getColumnX = (column: number) => column * (nodeWidth + horizontalGap)

const getEstimatedHeight = (data: StoryNodeData) => {
  const textLines = data.text
    ? data.text.split('\n').reduce(
        (total, line) => total + Math.max(1, Math.ceil(line.length / 58)),
        0,
      )
    : 0

  if (data.kind === 'submission' || (data.kind === 'round' && data.canonical)) {
    const kickerHeight = data.canonical ? 19 : 0
    return 34 + kickerHeight + 30 + textLines * 22
  }

  const bodyHeight = data.text ? 12 + textLines * 17 : 0
  if (data.kind === 'option') return 34 + 19 + 22 + 12 + bodyHeight + 25
  return 34 + 19 + 22 + 12 + bodyHeight
}

const getStackedPositions = (items: StoryNodeData[]) => {
  const totalHeight = items.reduce((total, item) => total + getEstimatedHeight(item), 0)
    + Math.max(0, items.length - 1) * verticalGap
  let currentY = -totalHeight / 2

  return items.map((item) => {
    const position = currentY
    currentY += getEstimatedHeight(item) + verticalGap
    return position
  })
}

const createSubmissionData = (
  submission: OpeningSubmission | StoryData['submissions'][number],
  roundNumber?: number,
  inferred = false,
): StoryNodeData => ({
  kind: 'submission',
  title: roundNumber ? `Paragraf ${roundNumber}` : 'Kandydat paragrafu otwierającego',
  subtitle: submission.authorName,
  text: submission.text,
  authorName: submission.authorName,
  roundNumber,
  status: submission.status,
  canonical: submission.status === 'winner',
  selected: submission.status === 'winner',
  inferred,
})

const makeEdge = (
  source: string,
  target: string,
  canonical: boolean,
  inferred = false,
): StoryEdge => ({
  id: `${source}-${target}`,
  source,
  target,
  type: canonical ? 'canonical' : 'smoothstep',
  data: { canonical, inferred },
  animated: canonical,
})

export function createStoryGraph(data: StoryData) {
  const canonicalEntries = getCanonicalEntries(data)
  const canonicalParagraphIds = new Set(canonicalEntries.map((entry) => entry.paragraphId))
  const canonicalOptionIds = new Set(canonicalEntries.map((entry) => entry.chosenOptionId))
  const canonicalParents = new Set([
    'opening',
    ...canonicalEntries.map((entry) => entry.paragraphId),
    ...data.openingSubmissions
      .filter((submission) => submission.status === 'winner')
      .map((submission) => submission.id),
  ])
  const nodes: StoryNode[] = []
  const edges: StoryEdge[] = []
  const nodeColumns = new Map<string, number>()

  const openingData = data.openingSubmissions.map((submission) =>
    createSubmissionData(submission, undefined),
  )
  const openingPositions = getStackedPositions(openingData)
  data.openingSubmissions.forEach((submission, index) => {
    nodes.push({
      id: submission.id,
      type: 'story',
      position: {
        x: getColumnX(1),
        y: openingPositions[index],
      },
      data: openingData[index],
    })
    nodeColumns.set(submission.id, 1)
  })

  data.rounds.forEach((round, roundIndex) => {
    const parentColumn = nodeColumns.get(round.parentCanonParagraphId)
      ?? roundIndex * 2 + 1
    const column = parentColumn + 1
    const roundOptions = getRoundOptions(data, round.id)
    const roundSubmissions = getRoundSubmissions(data, round.id)
    const parentIsCanonical = canonicalParents.has(round.parentCanonParagraphId)
    const roundIsCanonical = parentIsCanonical && roundIndex < data.rounds.length
    const showRoundNode = Boolean(round.prompt)
    const optionSourceId = showRoundNode ? round.id : round.parentCanonParagraphId

    if (showRoundNode) {
      nodes.push({
        id: round.id,
        type: 'story',
        position: { x: getColumnX(column), y: 0 },
        data: {
          kind: 'round',
          title: round.id === 'round-2' ? '' : `Runda ${round.number}`,
          subtitle: roundIsCanonical ? 'Termos' : round.status === 'collecting-submissions' ? 'Trwa zbieranie zgłoszeń' : 'Runda rozstrzygnięta',
          text: round.prompt,
          authorName: roundIsCanonical ? 'Termos' : undefined,
          roundNumber: round.number,
          status: round.status,
          canonical: roundIsCanonical,
          selected: false,
          inferred: false,
        },
      })
      nodeColumns.set(round.id, column)

      edges.push(makeEdge(round.parentCanonParagraphId, round.id, roundIsCanonical))
    }

    const optionGroups: StoryNodeGroup[] = roundOptions.map((option) => {
      const optionSubmissions = roundSubmissions.filter((submission) => submission.optionId === option.id)
      const optionIsCanonical = canonicalOptionIds.has(option.id)

      return {
        id: option.id,
        data: {
          kind: 'option' as const,
          title: `Opcja ${option.label}`,
          subtitle: optionIsCanonical ? 'Kanoniczna ścieżka' : 'Alternatywna ścieżka',
          text: option.text,
          optionLabel: option.label,
          roundNumber: round.number,
          authorName: 'Termos',
          selected: Boolean(option.selectedAt),
          canonical: optionIsCanonical,
          inferred: false,
        },
        submissions: optionSubmissions.map((submission) => ({
          id: submission.id,
          data: createSubmissionData(
            submission,
            round.number,
            submission.status !== 'winner' && !canonicalOptionIds.has(submission.optionId),
          ),
        })),
      }
    })

    const unassigned = roundSubmissions.filter((submission) => !submission.optionId)

    const optionColumn = parentColumn + (showRoundNode ? 2 : 1)
    const submissionColumn = optionColumn + 1
    if (unassigned.length > 0) {
      optionGroups.push({
        id: `unassigned-${round.id}`,
        data: {
          kind: 'unassigned' as const,
          title: 'Opcja nieustalona',
          subtitle: 'Relacja wymaga potwierdzenia',
          text: 'Treść zgłoszeń nie wskazuje jednoznacznie jednej z trzech opcji.',
          roundNumber: round.number,
          canonical: false,
          selected: false,
          inferred: false,
        },
        submissions: unassigned.map((submission) => ({
          id: submission.id,
          data: createSubmissionData(submission, round.number),
        })),
      })
    }

    const totalGroupHeight = optionGroups.reduce((total, group) => {
      const submissionHeight = group.submissions.reduce(
        (submissionTotal, submission) => submissionTotal + getEstimatedHeight(submission.data),
        0,
      ) + Math.max(0, group.submissions.length - 1) * verticalGap
      return total + getEstimatedHeight(group.data) + (group.submissions.length > 0 ? verticalGap + submissionHeight : 0)
    }, 0) + Math.max(0, optionGroups.length - 1) * verticalGap
    let groupY = -totalGroupHeight / 2

    optionGroups.forEach((group) => {
      const optionIsCanonical = group.data.canonical
      nodes.push({
        id: group.id,
        type: 'story',
        position: { x: getColumnX(optionColumn), y: groupY },
        data: group.data,
      })
      nodeColumns.set(group.id, optionColumn)
      edges.push(makeEdge(optionSourceId, group.id, optionIsCanonical && roundIsCanonical))

      let submissionY = groupY + getEstimatedHeight(group.data)
      if (group.submissions.length > 0) submissionY += verticalGap

      group.submissions.forEach((submission) => {
        nodes.push({
          id: submission.id,
          type: 'story',
          position: {
            x: getColumnX(submissionColumn),
            y: submissionY,
          },
          data: submission.data,
        })
        nodeColumns.set(submission.id, submissionColumn)
        edges.push(
          makeEdge(
            group.id,
            submission.id,
            optionIsCanonical && canonicalParagraphIds.has(submission.id),
          ),
        )
        submissionY += getEstimatedHeight(submission.data) + verticalGap
      })

      const submissionHeight = group.submissions.reduce(
        (total, submission) => total + getEstimatedHeight(submission.data),
        0,
      ) + Math.max(0, group.submissions.length - 1) * verticalGap
      groupY += getEstimatedHeight(group.data)
        + (group.submissions.length > 0 ? verticalGap + submissionHeight : 0)
        + verticalGap
    })
  })

  edges.sort((firstEdge, secondEdge) => Number(firstEdge.data?.canonical ?? false) - Number(secondEdge.data?.canonical ?? false))

  return { nodes, edges }
}
