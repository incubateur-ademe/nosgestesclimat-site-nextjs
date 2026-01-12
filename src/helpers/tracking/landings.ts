interface TrackingData {
  matomo: (string | null)[]
  posthog?: {
    eventName: string
    properties?: Record<string, string | number | boolean | null | undefined>
  }
}

function getLandingCategory(pathname: string) {
  switch (pathname) {
    case '/empreinte-eau':
      return 'LP eau'
    case '/empreinte-carbone':
      return 'LP carbone'
    case '/':
    default:
      return 'Accueil'
  }
}

// Click CTA
export const getLandingClickCTAStart = (
  pathname: string,
  action: string
): TrackingData => ({
  matomo: [
    'trackEvent',
    getLandingCategory(pathname),
    action,
    'Click Passer le test',
  ],
  posthog: {
    eventName: 'Landing CTA click',
    properties: {
      page: getLandingCategory(pathname),
      action: 'Passer le test',
    },
  },
})

export const getLandingClickCTAResume = (
  pathname: string,
  action: string
): TrackingData => ({
  matomo: [
    'trackEvent',
    getLandingCategory(pathname),
    action,
    'Click Reprendre le test',
  ],
  posthog: {
    eventName: 'Landing CTA click',
    properties: {
      page: getLandingCategory(pathname),
      action: 'Reprendre le test',
    },
  },
})

export const getLandingClickCTAResults = (
  pathname: string,
  action: string
): TrackingData => ({
  matomo: [
    'trackEvent',
    getLandingCategory(pathname),
    action,
    'Click Voir les résultats',
  ],
  posthog: {
    eventName: 'Landing CTA click',
    properties: {
      page: getLandingCategory(pathname),
      action: 'Voir les résultats',
    },
  },
})

export const getLandingClickCTARestart = (
  pathname: string,
  action: string
): TrackingData => ({
  matomo: [
    'trackEvent',
    getLandingCategory(pathname),
    action,
    'Click Recommencer',
  ],
  posthog: {
    eventName: 'Landing CTA click',
    properties: {
      page: getLandingCategory(pathname),
      action: 'Recommencer',
    },
  },
})

// Did you know slider
export const getLandingDidYouKnowSliderValue = (number: number) =>
  `Passer le test écran ${number}`

export const getLandingDidYouKnowSlider = (
  pathname: string,
  value: string,
  slideNumber?: number
): TrackingData => ({
  matomo: [
    'trackEvent',
    getLandingCategory(pathname),
    'Click bannière le saviez vous',
    value,
  ],
  posthog: {
    eventName: 'Landing click bannière le saviez-vous',
    properties: {
      page: getLandingCategory(pathname),
      slide: slideNumber,
    },
  },
})

// Post thumbnail
export const getLandingClickPostThumbnail = (
  pathname: string,
  action: string
): TrackingData => ({
  matomo: ['trackEvent', getLandingCategory(pathname), action],
})

// Model info
export const getLandingClickModelDocumentation = (
  pathname: string
): TrackingData => ({
  matomo: ['trackEvent', getLandingCategory(pathname), 'Click documentation'],
})

// Nouveautés
export const getLandingClickNouveautes = (pathname: string): TrackingData => ({
  matomo: ['trackEvent', getLandingCategory(pathname), 'Click nouveautés'],
})

export const learnMoreCarbonLink = (): TrackingData => ({
  matomo: ['trackEvent', 'Accueil', 'Click "En savoir plus LP carbone"'],
  posthog: {
    eventName: 'Accueil click en savoir plus LP carbone',
  },
})

export const learnMoreWaterLink = (): TrackingData => ({
  matomo: ['trackEvent', 'Accueil', 'Click "En savoir plus LP eau"'],
  posthog: {
    eventName: 'Accueil click en savoir plus LP eau',
  },
})
