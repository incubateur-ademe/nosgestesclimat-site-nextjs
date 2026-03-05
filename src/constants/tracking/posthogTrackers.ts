import type { DottedName, NodeValue } from '@incubateur-ademe/nosgestesclimat'

interface PosthogProps {
  question?: DottedName | null
  action?: DottedName
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
  category?: string
  subcategory?: string
  url?: string
  tab?: string
  status?: 'authenticated' | 'unauthenticated'
}

// Form

export const captureClickFormNav = ({
  question,
  answer,
  timeSpentOnQuestion,
  actionType,
}: PosthogProps) => {
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

export const captureClickSuggestion = ({
  question,
  answer,
  label,
}: PosthogProps) => {
  return {
    eventName: 'click form suggestion',
    properties: {
      question,
      answer: answer,
      suggestion: label,
    },
  }
}

export const captureClickInfo = ({ question, state }: PosthogProps) => {
  return {
    eventName: 'click form info',
    properties: {
      question,
      state,
    },
  }
}
export const captureSubQuestion = ({ question, state }: PosthogProps) => {
  return {
    eventName: 'click form sub-question',
    properties: {
      question,
      state,
    },
  }
}

export const captureSimulationFirstQuestionSeen = ({
  question,
}: PosthogProps) => {
  return {
    eventName: 'simulation first question seen',
    properties: {
      question,
    },
  }
}

export const captureSimulationStarted = ({ question }: PosthogProps) => {
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
}: PosthogProps) => {
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

export const captureIframeVisit = ({ url }: PosthogProps) => {
  return {
    eventName: 'iframe visit',
    properties: {
      referrerUrl: url,
    },
  }
}

export const captureIframeInteraction = ({ url }: PosthogProps) => {
  return {
    eventName: 'iframe interaction',
    properties: {
      referrerUrl: url,
    },
  }
}

// Orga

export const captureClickFunFactsPlus = {
  eventName: 'click poll fun facts plus',
}

export const captureDownloadFunFactsPlus = {
  eventName: 'download poll fun facts plus',
}

export const captureDownloadPollQRCode = {
  eventName: 'download poll QR code',
}

export const captureClickPollSettings = {
  eventName: 'click poll settings',
}

export const captureExportPollData = {
  eventName: 'export poll data',
}

// Language / Region

export const captureLocale = ({ locale }: PosthogProps) => {
  return {
    eventName: 'Locale used',
    properties: {
      language: locale,
    },
  }
}

export const captureRegion = ({ region }: PosthogProps) => {
  return {
    eventName: 'Region used',
    properties: {
      region,
    },
  }
}

// Footer

export const captureFooterClickLanguage = ({ locale }: PosthogProps) => ({
  eventName: 'Footer click Language',
  properties: {
    locale,
  },
})

export const captureFooterNewsletterClick = () =>
  JSON.stringify({
    eventName: 'click footer newsletter cta',
  })

export const captureFooterClickLogo = () =>
  JSON.stringify({ eventName: 'click footer logo' })

export const captureFooterClickQuiSommesNous = () =>
  JSON.stringify({ eventName: 'click footer qui sommes-nous' })

export const captureFooterClickPlanSite = () =>
  JSON.stringify({ eventName: 'click footer plan du site' })

export const captureFooterClickContact = () =>
  JSON.stringify({ eventName: 'click footer contact' })

export const captureFooterClickInternational = () =>
  JSON.stringify({ eventName: 'click footer international' })

export const captureFooterClickStats = () =>
  JSON.stringify({ eventName: 'click footer statistiques' })

export const captureFooterClickDiffusion = () =>
  JSON.stringify({ eventName: 'click footer diffusion' })

export const captureFooterClickOrganisations = () =>
  JSON.stringify({ eventName: 'click footer organisations' })

export const captureFooterClickAmbassadeurs = () =>
  JSON.stringify({ eventName: 'click footer ambassadeurs' })

export const captureFooterClickBlog = () =>
  JSON.stringify({ eventName: 'click footer blog' })

export const captureFooterClickDocumentation = () =>
  JSON.stringify({ eventName: 'click footer documentation' })

export const captureFooterClickFAQ = () =>
  JSON.stringify({ eventName: 'click footer faq' })

export const captureFooterClickNouveautes = () =>
  JSON.stringify({ eventName: 'click footer nouveautes' })

export const captureFooterClickImpactco2 = () =>
  JSON.stringify({ eventName: 'click footer impact co2' })

// Actions

export const captureActionClickSortingButton = {
  eventName: 'Actions click bouton tri',
}

export const captureTrackingCategoryFilter = ({ category }: PosthogProps) => ({
  // /!\ This event is also sent for "relais"
  eventName: 'Actions click category filter',
  properties: {
    category,
  },
})

export const captureActionsClickStart = {
  eventName: 'Actions click Démarrer',
}

export const captureActionsClickYes = ({ action }: PosthogProps) => ({
  eventName: 'Actions click Yes',
  properties: {
    action,
  },
})

export const captureActionsClickNo = ({ action }: PosthogProps) => ({
  eventName: 'Actions click No',
  properties: {
    action,
  },
})

export const captureActionsOpenAction = ({ action }: PosthogProps) => ({
  eventName: 'Actions click open stats',
  properties: {
    action,
  },
})

export const captureActionsClickAdeme = {
  eventName: 'Actions click Agir ADEME',
}

export const captureActionsClickUnderstandCalculation = ({
  action,
}: PosthogProps) => ({
  eventName: 'Actions click understand calculation',
  properties: {
    action,
  },
})

// Fin

export const captureEndClickCategory = ({ category }: PosthogProps) => ({
  eventName: 'Fin click Category',
  properties: {
    category,
  },
})

export const captureEndClickActions = ({ subcategory }: PosthogProps) => ({
  eventName: 'Fin click Actions',
  properties: {
    subcategory,
  },
})

export const captureEndClickDomesticWater = {
  eventName: 'Fin click Eau domestique',
}

// Landing

export const captureLearnMoreCarbonLink = {
  eventName: 'Accueil click En savoir plus LP carbone',
}

export const captureLearnMoreWaterLink = {
  eventName: 'Accueil click En savoir plus LP eau',
}

export const captureCreateGroupLink = {
  eventName: 'Accueil click Groupes',
}

// Compte U (server)

export const captureClickMonEspaceTabServer = ({ tab }: PosthogProps) =>
  JSON.stringify({
    eventName: 'click tab mon espace',
    properties: { tab },
  })

export const captureClickMySpaceNoResultsStartTest = JSON.stringify({
  eventName: 'click mon espace pas de résultats',
})

export const captureLoginComplete = {
  eventName: 'Connexion - Verification code validé',
}

export const captureSignupComplete = {
  eventName: 'Mon Espace - Inscription - Verification code validé',
}

// User Account

export const captureClickHeaderMonEspaceAuthenticatedServer = {
  eventName: 'click header mon espace',
  properties: {
    status: 'authenticated',
  },
}

export const captureClickHeaderAccessMySpaceAuthenticatedServer = {
  eventName: 'click header accéder à mon espace',
  properties: {
    status: 'authenticated',
  },
}

export const captureClickHeaderLogoutAuthenticatedServer = {
  eventName: 'click header logout',
  properties: {
    status: 'authenticated',
  },
}

export const captureClickHeaderMonEspaceUnauthenticatedServer = JSON.stringify({
  eventName: 'click header mon espace',
  properties: {
    status: 'unauthenticated',
  },
})

export const captureClickDashboardGroupPageNoGroupsCreate = {
  eventName: 'click dashboard group page create group',
}

export const captureClickDashboardGroupPageCreateOrganisation = {
  eventName: 'click dashboard group page create organisation',
}

export const captureClickLatestResultsViewDetail = JSON.stringify({
  eventName: 'click latest results view detail',
})

export const captureClickResultsListResultViewDetail = {
  eventName: 'click results list result view detail',
}

export const captureClickShareSimulationButton = {
  eventName: 'click share simulation button',
}

export const captureClickCategorySelector = ({ category }: PosthogProps) => ({
  eventName: 'click category selector',
  properties: {
    category,
  },
})

export const captureClickCategorySelectorMobile = ({
  category,
}: PosthogProps) => ({
  eventName: 'click category selector mobile',
  properties: {
    category,
  },
})

export const captureClickUpdateUserEmail = {
  eventName: 'click update user email',
}

export const captureClickUpdateUserNewsletters = {
  eventName: 'click update newsletters',
}
