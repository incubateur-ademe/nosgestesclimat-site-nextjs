import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export const trackingCategoryFilterPosthog = (category: DottedName) => ({
  eventName: 'Actions click category filter',
  properties: {
    category,
  },
})
