export const clickContactEvent = ['trackEvent', 'FAQ', 'Click contact us']

export const trackingFAQClick = (questionId: string) => [
  'trackEvent',
  'FAQ',
  'Question Click',
  `FAQ question clicked: ${questionId}`,
]
