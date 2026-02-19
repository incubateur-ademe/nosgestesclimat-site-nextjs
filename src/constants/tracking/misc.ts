// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

const trackingIframeVisit = (url: string) => [
  'trackEvent',
  'Misc',
  'Iframe visit',
  `Iframe visit from ${url}`,
]

const trackingIframeInteraction = (url: string) => [
  'trackEvent',
  'Misc',
  'Iframe interaction',
  `Iframe interaction from ${url}`,
]

export const trackingLocale = (locale: string) => [
  'trackEvent',
  'Misc',
  'Language',
  `Locale used ${locale}`,
]
export const trackingRegion = (region: string) => [
  'trackEvent',
  'Misc',
  'Region',
  `Region used: ${region}`,
]

export const trackingDownloadRavijenChart = [
  'trackEvent',
  'Misc',
  'Download Ravijen chart',
]

export const trackingClickRegionBanner = [
  'trackEvent',
  'Misc',
  'Click Region Banner',
]

// Banner
export const trackingBannerClick = ['trackEvent', 'Bannière', 'Click lien']

// Category filter
export const trackingCategoryFilter = (category: DottedName, path: string) => [
  'trackEvent',
  path,
  'Category filter',
  `Click Filter ${category}`,
]

// Cookies
const trackingCookiesAccept = [
  'trackEvent',
  'Cookies',
  'Click accepter tout',
]

const trackingCookiesRefuse = [
  'trackEvent',
  'Cookies',
  'Click tout refuser',
]

const trackingCookiesCustomChoice = [
  'trackEvent',
  'Cookies',
  'Click choix personnalisés',
]

const trackingCookiesCustomChoiceSave = [
  'trackEvent',
  'Cookies',
  'Enregistrer choix personnalisés',
]
