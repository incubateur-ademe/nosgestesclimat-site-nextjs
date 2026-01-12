type TrackingData = {
  matomo: (string | null)[]
  posthog?: {
    eventName: string
    properties?: Record<string, string | number | boolean | null | undefined>
  }
}

export const trackingActionClickCTAMenu = 'CTA Click Menu'

export const trackingActionClickCTA = 'CTA Click'

export const trackingActionClickPageBottom = 'Click CTA bas de page'

// Post thumbnail
export const trackingActionClickPostThumbnail = 'Click article'

export const trackingActionClickSortingButton = (): TrackingData => ({
  matomo: ['trackEvent', 'Actions', 'Click bouton tri'],
  posthog: {
    eventName: 'Actions click bouton tri',
  },
})
