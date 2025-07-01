import type { DottedName, NodeValue } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  question?: DottedName | null
  label?: string
  answer?: DottedName | NodeValue | string
  timeSpentOnQuestion?: number
  timeSpentOnSimulation?: number
  bilanCarbone?: number
  bilanEau?: number
  actionType?: 'précédent' | 'suivant' | 'passer'
  state?: 'opened' | 'closed'
}

export const captureClickFormNav = ({
  question,
  answer,
  timeSpentOnQuestion,
  actionType,
}: Props) => {
  return {
    eventName: 'click form nav',
    properties: {
      actionType,
      question,
      answer,
      timeSpentOnQuestion,
    },
  }
}

export const captureClickSuggestion = ({ question, answer, label }: Props) => {
  return {
    eventName: 'click form suggestion',
    properties: {
      question,
      answer: answer,
      suggestion: label,
    },
  }
}

export const captureClickInfo = ({ question, state }: Props) => {
  return {
    eventName: 'click form info',
    properties: {
      question,
      state,
    },
  }
}
export const captureSubQuestion = ({ question, state }: Props) => {
  return {
    eventName: 'click form sub-question',
    properties: {
      question,
      state,
    },
  }
}

export const captureSimulationStarted = ({ question }: Props) => {
  return {
    eventName: 'simulation started',
    properties: {
      question,
    },
  }
}

export const captureSimulationCompleted = ({
  bilanCarbone,
  bilanEau,
  timeSpentOnSimulation,
}: Props) => {
  return {
    eventName: 'simulation completed',
    properties: {
      bilanCarbone,
      bilanEau,
      timeSpentOnSimulation,
    },
  }
}

export const captureIframeVisit = (url: string) => {
  return {
    eventName: 'iframe visit',
    properties: {
      referrerUrl: url,
    },
  }
}

export const captureIframeInteraction = (url: string) => {
  return {
    eventName: 'iframe visit',
    properties: {
      referrerUrl: url,
    },
  }
}
