import { trackEvents } from '@/utils/analytics/trackEvent'

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
export const trackLandingClickCTAStart = (pathname: string, action: string) => {
  trackEvents(
    [
      'trackEvent',
      getLandingCategory(pathname),
      action,
      'Click Passer le test',
    ],
    {
      eventName: 'Landing CTA click',
      properties: {
        page: getLandingCategory(pathname),
        action: 'Passer le test',
      },
    }
  )
}

export const trackLandingClickCTAResume = (
  pathname: string,
  action: string
) => {
  trackEvents(
    [
      'trackEvent',
      getLandingCategory(pathname),
      action,
      'Click Reprendre le test',
    ],
    {
      eventName: 'Landing CTA click',
      properties: {
        page: getLandingCategory(pathname),
        action: 'Reprendre le test',
      },
    }
  )
}

export const trackLandingClickCTAResults = (
  pathname: string,
  action: string
) => {
  trackEvents(
    [
      'trackEvent',
      getLandingCategory(pathname),
      action,
      'Click Voir les résultats',
    ],
    {
      eventName: 'Landing CTA click',
      properties: {
        page: getLandingCategory(pathname),
        action: 'Voir les résultats',
      },
    }
  )
}

export const trackLandingClickCTARestart = (
  pathname: string,
  action: string
) => {
  trackEvents(
    ['trackEvent', getLandingCategory(pathname), action, 'Click Recommencer'],
    {
      eventName: 'Landing CTA click',
      properties: {
        page: getLandingCategory(pathname),
        action: 'Recommencer',
      },
    }
  )
}

// Did you know slider
export const getLandingDidYouKnowSliderValue = (number: number) =>
  `Passer le test écran ${number}`

export const trackLandingDidYouKnowSlider = (
  pathname: string,
  value: string,
  slideNumber?: number
) => {
  trackEvents(
    [
      'trackEvent',
      getLandingCategory(pathname),
      'Click bannière le saviez vous',
      value,
    ],
    {
      eventName: 'Landing click bannière le saviez-vous',
      properties: {
        page: getLandingCategory(pathname),
        slide: slideNumber,
      },
    }
  )
}

// Post thumbnail
export const trackLandingClickPostThumbnail = (
  pathname: string,
  action: string
) => {
  trackEvent(['trackEvent', getLandingCategory(pathname), action])
}

// Model info
export const trackLandingClickModelDocumentation = (pathname: string) => {
  trackEvent([
    'trackEvent',
    getLandingCategory(pathname),
    'Click documentation',
  ])
}

// Nouveautés
export const trackLandingClickNouveautes = (pathname: string) => {
  trackEvent(['trackEvent', getLandingCategory(pathname), 'Click nouveautés'])
}

export const trackLearnMoreCarbonLink = () => {
  trackEvents(['trackEvent', 'Accueil', 'Click "En savoir plus LP carbone"'], {
    eventName: 'Accueil click en savoir plus LP carbone',
  })
}

export const trackLearnMoreWaterLink = () => {
  trackEvents(['trackEvent', 'Accueil', 'Click "En savoir plus LP eau"'], {
    eventName: 'Accueil click en savoir plus LP eau',
  })
}
