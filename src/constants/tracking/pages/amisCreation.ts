// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { trackEvents } from '@/utils/analytics/trackEvent'

export const trackAmisCreationEtapeVotreGroupeSuivant = () => {
  trackEvents(['trackEvent', 'Amis Creation', 'Step 1 - Click Suivant'])
}

export const trackAmisCreationVosInformationsRetour = () => {
  trackEvents(['trackEvent', 'Amis Creation', 'Step 1 - Click Retour'])
}

export const trackAmisCreationEtapeVosInformationsSuivant = () => {
  trackEvents(['trackEvent', 'Amis Creation', 'Step 2 - Click Suivant'], {
    eventName: 'Classements create group',
  })
}

export const trackAmisCreationVotreGroupeRetour = () => {
  trackEvents(['trackEvent', 'Amis Creation', 'Step 2 - Click Retour'])
}

export const trackAmisCreationConnexionComplete = () => {
  trackEvents(['trackEvent', 'Amis Creation', 'Verification code validé'], {
    eventName: 'Verification code validé',
  })
}

// Old-style exports for server components that still use the old pattern
export const amisCreationConnexionRetour = [
  'trackEvent',
  'Amis Creation',
  'Step 1 - Click Retour',
]

export const amisCreationVotreGroupeRetour = [
  'trackEvent',
  'Amis Creation',
  'Step 2 - Click Retour',
]

export const amisCreationConnexionComplete = [
  'trackEvent',
  'Amis Creation',
  'Verification code validé',
]

export const captureAmisCreationConnexionComplete = {
  eventName: 'Verification code validé',
}
