// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

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

export const trackingCategoryFilterPosthog = (category: DottedName) => ({
  eventName: 'Actions click category filter',
  properties: {
    category,
  },
})
