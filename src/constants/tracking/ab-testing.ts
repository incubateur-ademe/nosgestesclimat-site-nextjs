export const abTestingVisitOriginal = [
  'trackEvent',
  'AB Testing',
  'Visit original version',
]

export const getAbTestingVisitVariation = (variation: string) => [
  'trackEvent',
  'AB Testing',
  `Visit ${variation} version`,
]
