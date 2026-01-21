// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { trackEvent } from '@/utils/analytics/trackEvent'

export const trackAmisCreationEtapeVotreGroupeSuivant = () => {
  trackEvent(['trackEvent', 'Amis Creation', 'Step 1 - Click Suivant'])
}

export const trackAmisCreationVosInformationsRetour = () => {
  trackEvent(['trackEvent', 'Amis Creation', 'Step 1 - Click Retour'])
}

export const trackAmisCreationEtapeVosInformationsSuivant = () => {
  trackEvent(['trackEvent', 'Amis Creation', 'Step 2 - Click Suivant'], {
    eventName: 'Classements create group',
  })
}

export const trackAmisCreationVotreGroupeRetour = () => {
  trackEvent(['trackEvent', 'Amis Creation', 'Step 2 - Click Retour'])
}
