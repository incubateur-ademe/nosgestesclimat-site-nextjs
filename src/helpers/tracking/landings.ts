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
