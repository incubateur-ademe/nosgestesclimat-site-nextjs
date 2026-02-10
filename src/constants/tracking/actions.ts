import { trackEvents } from '@/utils/analytics/trackEvent'

export const trackingActionClickCTAMenu = 'CTA Click Menu'

export const trackingActionClickCTA = 'CTA Click'

export const trackingActionClickPageBottom = 'Click CTA bas de page'

export const trackingActionClickPostThumbnail = 'Click article'

export const trackActionClickSortingButton = () => {
  trackEvents(['trackEvent', 'Actions', 'Click bouton tri'], {
    eventName: 'Actions click bouton tri',
  })
}
