// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { trackEvents } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import {
  captureIframeInteraction,
  captureIframeVisit,
  captureLocale,
  captureRegion,
} from './posthogTrackers'

export const trackIframeVisit = (url: string) => {
  trackEvents(
    ['trackEvent', 'Misc', 'Iframe visit', `Iframe visit from ${url}`],
    captureIframeVisit(url)
  )
}

export const trackIframeInteraction = (url: string) => {
  trackEvents(
    [
      'trackEvent',
      'Misc',
      'Iframe interaction',
      `Iframe interaction from ${url}`,
    ],
    captureIframeInteraction(url)
  )
}

export const trackLocale = (locale: string) => {
  trackEvents(
    ['trackEvent', 'Misc', 'Language', `Locale used ${locale}`],
    captureLocale({ locale })
  )
}

export const trackRegion = (region: string) => {
  trackEvents(
    ['trackEvent', 'Misc', 'Region', `Region used: ${region}`],
    captureRegion({ region })
  )
}

export const trackDownloadRavijenChart = () => {
  trackEvents(['trackEvent', 'Misc', 'Download Ravijen chart'])
}

export const trackClickRegionBanner = () => {
  trackEvents(['trackEvent', 'Misc', 'Click Region Banner'])
}

export const trackSplitTesting = (branch: string) => {
  trackEvents([
    'trackEvent',
    'Misc',
    'Split testing',
    `User on branch ${branch}`,
  ])
}

// Banner
export const trackBannerClick = () => {
  trackEvents(['trackEvent', 'Bannière', 'Click lien'])
}

// Category filter
export const trackCategoryFilter = (category: DottedName, path: string) => {
  trackEvents(
    ['trackEvent', path, 'Category filter', `Click Filter ${category}`],
    {
      eventName: 'Actions click category filter',
      properties: { category },
    }
  )
}

// User account fake door
export const trackUserAccountFakeDoorAccept = () => {
  trackEvents(['trackEvent', 'Compte utilisateur', 'Click Je crée mon compte'])
}

export const trackUserAccountFakeDoorRefuse = () => {
  trackEvents([
    'trackEvent',
    'Compte utilisateur',
    'Click Je ne préfère pas créer de compte',
  ])
}

// Cookies
export const trackCookiesAccept = () => {
  trackEvents(['trackEvent', 'Cookies', 'Click accepter tout'], {
    eventName: 'Cookies click accepter tout',
  })
}

export const trackCookiesRefuse = () => {
  trackEvents(['trackEvent', 'Cookies', 'Click tout refuser'], {
    eventName: 'Cookies click tout refuser',
  })
}

export const trackCookiesCustomChoice = () => {
  trackEvents(['trackEvent', 'Cookies', 'Click choix personnalisés'], {
    eventName: 'Cookies click choix personnalisés',
  })
}

export const trackCookiesCustomChoiceSave = () => {
  trackEvents(['trackEvent', 'Cookies', 'Enregistrer choix personnalisés'], {
    eventName: 'Cookies enregistrer choix personnalisés',
  })
}
