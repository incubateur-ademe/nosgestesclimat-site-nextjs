<<<<<<< HEAD
import { trackEvents } from '@/utils/analytics/trackEvent'

export const trackingActionClickCTAMenu = 'CTA Click Menu'

||||||| a37acc3a1
export const trackingActionClickCTAMenu = 'CTA Click Menu'

=======
>>>>>>> origin/preprod
export const trackingActionClickCTA = 'CTA Click'

export const trackingActionClickPageBottom = 'Click CTA bas de page'

// Post thumbnail
export const trackingActionClickPostThumbnail = 'Click article'

export const trackActionClickSortingButton = () => {
  trackEvents(['trackEvent', 'Actions', 'Click bouton tri'], {
    eventName: 'Actions click bouton tri',
  })
}
