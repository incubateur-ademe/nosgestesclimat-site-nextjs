// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export const trackingIframeVisit = (url: string) => [
  'trackEvent',
  'Misc',
  'Iframe visit',
  `Iframe visit from ${url}`,
]

export const trackingIframeInteraction = (url: string) => [
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

export const trackingSplitTesting = (branch: string) => [
  'trackEvent',
  'Misc',
  'Split testing',
  `User on branch ${branch}`,
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
