import type { DottedName, NodeValue } from '@incubateur-ademe/nosgestesclimat'

interface Props {
  question?: DottedName | null
  label?: string
  answer?: NodeValue | string
  timeSpentOnQuestion?: number
  timeSpentOnSimulation?: number
  bilanCarbone?: number
  bilanEau?: number
  actionType?: 'précédent' | 'suivant' | 'passer'
  state?: 'opened' | 'closed'
  locale?: string //should be Locale
  region?: string
}

// Form

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

export const captureSimulationFirstQuestionSeen = ({ question }: Props) => {
  return {
    eventName: 'simulation first question seen',
    properties: {
      question,
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

// Iframe

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
    eventName: 'iframe interaction',
    properties: {
      referrerUrl: url,
    },
  }
}

// Orga

export const captureClickFunFactsPlus = () => {
  return {
    eventName: 'click poll fun facts plus',
    properties: {
      module: 'poll board',
    },
  }
}

export const captureDownloadFunFactsPlus = () => {
  return {
    eventName: 'download poll fun facts plus',
    properties: {
      module: 'poll board',
    },
  }
}

export const captureDownloadPollQRCode = () => {
  return {
    eventName: 'download poll QR code',
    properties: {
      module: 'poll dashboard',
    },
  }
}

export const captureClickPollSettings = () => {
  return {
    eventName: 'click poll settings',
    properties: {
      module: 'poll dashboard',
    },
  }
}

export const captureExportPollData = () => {
  return {
    eventName: 'export poll data',
    properties: {
      module: 'poll dashboard',
    },
  }
}

// Language / Region

export const captureLocale = ({ locale }: Props) => {
  return {
    eventName: 'Locale used',
    properties: {
      language: locale,
    },
  }
}

export const captureRegion = ({ region }: Props) => {
  return {
    eventName: 'Region used',
    properties: {
      region,
    },
  }
}
