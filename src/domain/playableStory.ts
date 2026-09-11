import {
  getCanonicalEntries,
  getRoundOptions,
  getRoundSubmissions,
  getSubmission,
  story,
  type Option,
} from './story'
import { continuationInstance } from './continuationStory'
import { authoredAlternateNodes } from './authoredAlternateNodes'

export type PlayableOption = {
  id: string
  label: '1' | '2' | '3'
  text: string
  canonical: boolean
  nextNodeId: string
}

export type PlayableNode = {
  id: string
  roundNumber: number
  paragraphText: string
  options: PlayableOption[]
  terminal?: boolean
}

const getSourceParagraphText = (paragraphId: string) => {
  if (paragraphId === story.openingParagraph.id) return story.openingParagraph.text

  const openingSubmission = story.openingSubmissions.find(
    (submission) => submission.id === paragraphId,
  )

  return openingSubmission?.text ?? getSubmission(story, paragraphId)?.text ?? ''
}

const canonicalEntries = getCanonicalEntries(story)
const canonicalRounds = story.rounds.map((round, index) => {
  const canonicalEntry = canonicalEntries.find(
    (entry) => entry.sequenceNumber === round.number,
  )
  const outcomeParagraph = canonicalEntry
    ? getSubmission(story, canonicalEntry.paragraphId)
    : undefined

  if (!canonicalEntry || !outcomeParagraph) {
    throw new Error(`Nie można zbudować gry dla rundy ${round.number}.`)
  }

  return {
    id: `canonical-${round.id}`,
    roundNumber: index + 1,
    paragraphText:
      index === 0
        ? round.prompt ?? ''
        : round.prompt ?? getSourceParagraphText(round.parentCanonParagraphId),
    canonicalOptionId: canonicalEntry.chosenOptionId,
    canonicalOutcomeText: outcomeParagraph.text,
    options: getRoundOptions(story, round.id),
  }
})

const alternateOutcomeText = (option: Option) =>
  getRoundSubmissions(story, option.roundId).find(
    (submission) => submission.optionId === option.id,
  )?.text ?? 'Ślad tej decyzji urywa się w archiwum.'

const alternateActionTexts = [
  'Podążasz za najbliższym śladem, zanim zniknie w Labiryncie.',
  'Zabezpieczasz miejsce i nadajesz ostrzeżenie do Gniazda.',
  'Ryzykujesz i szukasz źródła zagrożenia.',
]

const alternateBridgeTexts = [
  'Korytarz zwęża się, lecz ślad prowadzi dalej. Za tobą milknie radio, przed tobą zaczyna się kolejny odcinek Labiryntu.',
  'Odpowiedź z Gniazda nie nadchodzi. Zostaje tylko sygnał, który powtarza się w ścianach i prowadzi cię w głąb.',
  'Źródło zagrożenia nie pozwala się zobaczyć. Zanim zgaśnie światło, dostrzegasz przed sobą kolejne przejście.',
]

const authoredAlternateEntryIds: Record<string, string> = {
  'option-2-1': 'alternate-round-2-option-1',
  'option-2-3': 'alternate-round-2-option-3',
}

const buildAlternateNodes = (
  sourceOption: { id: string; text: string; outcomeText: string },
  startRound: number,
): PlayableNode[] => {
  const nodes: PlayableNode[] = []
  if (startRound >= 11) {
    return [{
      id: `alternate-entry-${sourceOption.id}`,
      roundNumber: 11,
      paragraphText: sourceOption.outcomeText,
      options: [],
      terminal: true,
    }]
  }

  const routeIds = alternateActionTexts.map(
    (_, routeIndex) => `alternate-${sourceOption.id}-${routeIndex}`,
  )

  nodes.push({
    id: `alternate-entry-${sourceOption.id}`,
    roundNumber: startRound,
    paragraphText: sourceOption.outcomeText,
    options: [],
  })

  const entryNode = nodes[0]
  const routeLength = 10 - startRound

  if (routeLength <= 0) {
    entryNode.options = alternateActionTexts.map((text, index) => ({
      id: `alternate-choice-${sourceOption.id}-${index + 1}`,
      label: (index + 1).toString() as '1' | '2' | '3',
      text,
      canonical: false,
      nextNodeId: `${entryNode.id}-ending-${index + 1}`,
    }))
    entryNode.options.forEach((option, index) => {
      nodes.push({
        id: option.nextNodeId,
        roundNumber: 11,
        paragraphText: `Labirynt odpowiada na twój wybór. ${alternateBridgeTexts[index]}`,
        options: [],
        terminal: true,
      })
    })
    return nodes
  }

  routeIds.forEach((routeId, routeIndex) => {
    const routeNodes = Array.from({ length: routeLength }, (_, offset) => {
      const roundNumber = startRound + offset + 1
      const id = `${routeId}-${roundNumber}`
      const isLast = roundNumber === 10

      return {
        id,
        roundNumber,
        paragraphText: alternateBridgeTexts[routeIndex],
        options: alternateActionTexts.map((text, optionIndex) => ({
          id: `${id}-choice-${optionIndex + 1}`,
          label: (optionIndex + 1).toString() as '1' | '2' | '3',
          text,
          canonical: false,
          nextNodeId: isLast ? `${id}-ending-${optionIndex + 1}` : `${routeId}-${roundNumber + 1}`,
        })),
      }
    })

    nodes.push(...routeNodes)
    const lastNode = routeNodes.at(-1)
    if (lastNode) {
      lastNode.options.forEach((option, optionIndex) => {
        nodes.push({
          id: option.nextNodeId,
          roundNumber: 11,
          paragraphText: `Labirynt odpowiada na twój wybór. ${alternateBridgeTexts[(routeIndex + optionIndex) % alternateBridgeTexts.length]}`,
          options: [],
          terminal: true,
        })
      })
    }
  })

  return nodes
}

const nodes: Record<string, PlayableNode> = {}
const canonicalNodeIds = canonicalRounds.map((round) => round.id)
const continuationNodeIds = continuationInstance.rounds.map((round) => `continuation-${round.id}`)
const allNodeIds = [...canonicalNodeIds, ...continuationNodeIds]

canonicalRounds.forEach((round, index) => {
  nodes[round.id] = {
    id: round.id,
    roundNumber: round.roundNumber,
    paragraphText: round.paragraphText,
    options: round.options.map((option) => {
      const isCanonical = option.id === round.canonicalOptionId
      return {
        id: option.id,
        label: option.label,
        text: option.text,
        canonical: isCanonical,
        nextNodeId: isCanonical
          ? index === canonicalNodeIds.length - 1
            ? `canonical-ending-${option.id}`
            : allNodeIds[index + 1]
          : authoredAlternateEntryIds[option.id] ?? `alternate-entry-${option.id}`,
      }
    }),
  }

  const canonicalOption = round.options.find((option) => option.id === round.canonicalOptionId)
  const canonicalOutcome = canonicalOption
    ? getSubmission(story, canonicalEntries.find((entry) => entry.sequenceNumber === index + 2)?.paragraphId ?? '')?.text
    : undefined

  if (canonicalOption && canonicalOutcome) {
    const nextNodeId = index === canonicalNodeIds.length - 1
      ? `canonical-ending-${canonicalOption.id}`
      : allNodeIds[index + 1]

    if (index === canonicalNodeIds.length - 1) {
      nodes[nextNodeId] = {
        id: nextNodeId,
        roundNumber: 11,
        paragraphText: canonicalOutcome,
        options: [],
        terminal: true,
      }
    }
  }
})

canonicalRounds.forEach((round) => {
  round.options
    .filter((option) => option.id !== round.canonicalOptionId)
    .forEach((option) => {
      const entryNodes = buildAlternateNodes(
        {
          id: option.id,
          text: option.text,
          outcomeText: alternateOutcomeText(option),
        },
        round.roundNumber + 1,
      )

      entryNodes.forEach((node) => {
        nodes[node.id] = node
      })
    })
})

// Opracowane redakcyjnie odnogi zastępują generowane teksty zastępcze.
// Ich dalsze wybory prowadzą tymczasowo do istniejącego archiwum alternatyw,
// dopóki kolejne warstwy historii nie zostaną napisane.
authoredAlternateNodes.forEach((node) => {
  nodes[node.id] = node
})

continuationInstance.rounds.forEach((round, index) => {
  const nodeId = continuationNodeIds[index]
  const outcomeParagraph = continuationInstance.paragraphs.find(
    (paragraph) => paragraph.id === round.paragraphId,
  )

  if (!nodeId || !outcomeParagraph) {
    throw new Error(`Nie można zbudować gry dla rundy ${round.number}.`)
  }

  nodes[nodeId] = {
    id: nodeId,
    roundNumber: story.rounds.length + index + 1,
    paragraphText: round.prompt,
    options: round.options.map((option) => ({
      id: option.id,
      label: option.label,
      text: option.text,
      canonical: option.canonical,
      nextNodeId: index === continuationInstance.rounds.length - 1
        ? `continuation-ending-${option.id}`
        : continuationNodeIds[index + 1],
    })),
  }

  round.options.forEach((option) => {
    const nextNodeId = `continuation-ending-${option.id}`
    if (index === continuationInstance.rounds.length - 1) {
      const paragraph = option.canonical
        ? outcomeParagraph.text
        : option.sourceSubmissionIds
            .map((submissionId) => getSubmission(story, submissionId)?.text)
            .find((text): text is string => Boolean(text)) ?? 'Ślad tej decyzji urywa się w archiwum.'
      nodes[nextNodeId] = {
        id: nextNodeId,
        roundNumber: 11,
        paragraphText: paragraph,
        options: [],
        terminal: true,
      }
    }
  })

  round.options
    .filter((option) => !option.canonical)
    .forEach((option) => {
      buildAlternateNodes(
        {
          id: option.id,
          text: option.text,
          outcomeText: option.sourceSubmissionIds
            .map((submissionId) => getSubmission(story, submissionId)?.text)
            .find((text): text is string => Boolean(text)) ?? 'Ślad tej decyzji urywa się w archiwum.',
        },
        story.rounds.length + index + 1,
      ).forEach((node) => {
        nodes[node.id] = node
      })
    })
})

export const playableStory = {
  id: `${story.contest.id}-full-cockpit-v2`,
  title: story.contest.title,
  startNodeId: canonicalNodeIds[0],
  totalRounds: 11,
  nodes,
}

export const getPlayableNode = (nodeId: string) => playableStory.nodes[nodeId]
