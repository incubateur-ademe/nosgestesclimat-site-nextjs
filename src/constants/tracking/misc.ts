// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

type TrackingData = {
  matomo: (string | null)[]
  posthog?: {
    eventName: string
    properties?: Record<string, string | number | boolean | null | undefined>
  }
}

export const trackingIframeVisit = (url: string): TrackingData => ({
  matomo: ['trackEvent', 'Misc', 'Iframe visit', `Iframe visit from ${url}`],
})

export const trackingIframeInteraction = (url: string): TrackingData => ({
  matomo: [
    'trackEvent',
    'Misc',
    'Iframe interaction',
    `Iframe interaction from ${url}`,
  ],
})

export const trackingLocale = (locale: string): TrackingData => ({
  matomo: ['trackEvent', 'Misc', 'Language', `Locale used ${locale}`],
})

export const trackingRegion = (region: string): TrackingData => ({
  matomo: ['trackEvent', 'Misc', 'Region', `Region used: ${region}`],
})

export const trackingDownloadRavijenChart = (): TrackingData => ({
  matomo: ['trackEvent', 'Misc', 'Download Ravijen chart'],
})

export const trackingClickRegionBanner = (): TrackingData => ({
  matomo: ['trackEvent', 'Misc', 'Click Region Banner'],
})

export const trackingSplitTesting = (branch: string): TrackingData => ({
  matomo: ['trackEvent', 'Misc', 'Split testing', `User on branch ${branch}`],
})

// Banner
export const trackingBannerClick = (): TrackingData => ({
  matomo: ['trackEvent', 'Bannière', 'Click lien'],
})

// Category filter
export const trackingCategoryFilter = (
  category: DottedName,
  path: string
): TrackingData => ({
  matomo: ['trackEvent', path, 'Category filter', `Click Filter ${category}`],
  posthog: {
    eventName: 'Actions click category filter',
    properties: { category },
  },
})

// User account fake door
export const trackingUserAccountFakeDoorAccept = (): TrackingData => ({
  matomo: ['trackEvent', 'Compte utilisateur', 'Click Je crée mon compte'],
})

export const trackingUserAccountFakeDoorRefuse = (): TrackingData => ({
  matomo: [
    'trackEvent',
    'Compte utilisateur',
    'Click Je ne préfère pas créer de compte',
  ],
})

// Cookies
export const trackingCookiesAccept = (): TrackingData => ({
  matomo: ['trackEvent', 'Cookies', 'Click accepter tout'],
  posthog: {
    eventName: 'Cookies click accepter tout',
  },
})

export const trackingCookiesRefuse = (): TrackingData => ({
  matomo: ['trackEvent', 'Cookies', 'Click tout refuser'],
  posthog: {
    eventName: 'Cookies click tout refuser',
  },
})

export const trackingCookiesCustomChoice = (): TrackingData => ({
  matomo: ['trackEvent', 'Cookies', 'Click choix personnalisés'],
  posthog: {
    eventName: 'Cookies click choix personnalisés',
  },
})

export const trackingCookiesCustomChoiceSave = (): TrackingData => ({
  matomo: ['trackEvent', 'Cookies', 'Enregistrer choix personnalisés'],
  posthog: {
    eventName: 'Cookies enregistrer choix personnalisés',
  },
})
