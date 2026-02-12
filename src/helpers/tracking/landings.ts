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
export const getLandingClickCTAStart = (pathname: string, action: string) => [
  'trackEvent',
  getLandingCategory(pathname),
  action,
  'Click Passer le test',
]

export const getLandingClickCTAResume = (pathname: string, action: string) => [
  'trackEvent',
  getLandingCategory(pathname),
  action,
  'Click Reprendre le test',
]

export const getLandingClickCTAResults = (pathname: string, action: string) => [
  'trackEvent',
  getLandingCategory(pathname),
  action,
  'Click Voir les résultats',
]
export const getLandingClickCTARestart = (pathname: string, action: string) => [
  'trackEvent',
  getLandingCategory(pathname),
  action,
  'Click Recommencer',
]

// Did you know slider
export const getLandingDidYouKnowSliderValue = (number: number) =>
  `Passer le test écran ${number}`

export const getLandingDidYouKnowSlider = (pathname: string, value: string) => [
  'trackEvent',
  getLandingCategory(pathname),
  'Click bannière le saviez vous',
  value,
]

// Post thumbnail
export const getLandingClickPostThumbnail = (
  pathname: string,
  action: string
) => ['trackEvent', getLandingCategory(pathname), action]

// Model info
export const getLandingClickModelDocumentation = (pathname: string) => [
  'trackEvent',
  getLandingCategory(pathname),
  'Click documentation',
]

// Nouveautés
export const getLandingClickNouveautes = (pathname: string) => [
  'trackEvent',
  getLandingCategory(pathname),
  'Click nouveautés',
]

// PostHog specific helpers
export const getLandingClickCTAStartPosthog = (pathname: string) => ({
  eventName: `Click Passer le test`,
  properties: { category: getLandingCategory(pathname) },
})

export const getLandingClickCTAResumePosthog = (pathname: string) => ({
  eventName: `Click Reprendre le test`,
  properties: { category: getLandingCategory(pathname) },
})

export const getLandingClickCTAResultsPosthog = (pathname: string) => ({
  eventName: `Click Voir les résultats`,
  properties: { category: getLandingCategory(pathname) },
})

export const getLandingClickCTARestartPosthog = (pathname: string) => ({
  eventName: `Click Recommencer`,
  properties: { category: getLandingCategory(pathname) },
})

export const getLandingDidYouKnowSliderPosthog = (
  pathname: string,
  value: string
) => ({
  eventName: 'Click bannière le saviez vous',
  properties: {
    category: getLandingCategory(pathname),
    value,
  },
})
