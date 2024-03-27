// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

export const trackingInteraction = ['trackEvent', 'misc', 'Clicked somewhere']

export const trackingIframe = (url: string) => [
  'trackEvent',
  'misc',
  'Iframe visit',
  url,
]

export const trackingDownloadRavijenChart = [
  'trackEvent',
  'misc',
  'Download Ravijen chart',
]
