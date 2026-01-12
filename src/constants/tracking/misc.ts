// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { trackEvent } from '@/utils/analytics/trackEvent'

export const trackIframeVisit = (url: string) => {
  trackEvent(['trackEvent', 'Misc', 'Iframe visit', `Iframe visit from ${url}`])
}

export const trackIframeInteraction = (url: string) => {
  trackEvent([
    'trackEvent',
    'Misc',
    'Iframe interaction',
    `Iframe interaction from ${url}`,
  ])
}

export const trackLocale = (locale: string) => {
  trackEvent(['trackEvent', 'Misc', 'Language', `Locale used ${locale}`])
}

export const trackRegion = (region: string) => {
  trackEvent(['trackEvent', 'Misc', 'Region', `Region used: ${region}`])
}

export const trackDownloadRavijenChart = () => {
  trackEvent(['trackEvent', 'Misc', 'Download Ravijen chart'])
}

export const trackClickRegionBanner = () => {
  trackEvent(['trackEvent', 'Misc', 'Click Region Banner'])
}

export const trackSplitTesting = (branch: string) => {
  trackEvent(['trackEvent', 'Misc', 'Split testing', `User on branch ${branch}`])
}

// Banner
export const trackBannerClick = () => {
  trackEvent(['trackEvent', 'Bannière', 'Click lien'])
}

// Category filter
export const trackCategoryFilter = (category: DottedName, path: string) => {
  trackEvent(['trackEvent', path, 'Category filter', `Click Filter ${category}`], {
    eventName: 'Actions click category filter',
    properties: { category },
  })
}

// User account fake door
export const trackUserAccountFakeDoorAccept = () => {
  trackEvent(['trackEvent', 'Compte utilisateur', 'Click Je crée mon compte'])
}

export const trackUserAccountFakeDoorRefuse = () => {
  trackEvent([
    'trackEvent',
    'Compte utilisateur',
    'Click Je ne préfère pas créer de compte',
  ])
}

// Cookies
export const trackCookiesAccept = () => {
  trackEvent(['trackEvent', 'Cookies', 'Click accepter tout'], {
    eventName: 'Cookies click accepter tout',
  })
}

export const trackCookiesRefuse = () => {
  trackEvent(['trackEvent', 'Cookies', 'Click tout refuser'], {
    eventName: 'Cookies click tout refuser',
  })
}

export const trackCookiesCustomChoice = () => {
  trackEvent(['trackEvent', 'Cookies', 'Click choix personnalisés'], {
    eventName: 'Cookies click choix personnalisés',
  })
}

export const trackCookiesCustomChoiceSave = () => {
  trackEvent(['trackEvent', 'Cookies', 'Enregistrer choix personnalisés'], {
    eventName: 'Cookies enregistrer choix personnalisés',
  })
}
