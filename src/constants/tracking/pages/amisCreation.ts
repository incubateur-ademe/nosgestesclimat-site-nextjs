// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { trackEvent, trackEvents } from '@/utils/analytics/trackEvent'

export const trackAmisCreationEtapeVotreGroupeSuivant = () => {
  trackEvent(['trackEvent', 'Amis Creation', 'Step 1 - Click Suivant'])
}

export const trackAmisCreationVosInformationsRetour = () => {
  trackEvent(['trackEvent', 'Amis Creation', 'Step 1 - Click Retour'])
}

export const trackAmisCreationEtapeVosInformationsSuivant = () => {
  trackEvents(['trackEvent', 'Amis Creation', 'Step 2 - Click Suivant'], {
    eventName: 'Classements create group',
  })
}

export const trackAmisCreationVotreGroupeRetour = () => {
  trackEvent(['trackEvent', 'Amis Creation', 'Step 2 - Click Retour'])
}

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

export const amisInvitationConnexionComplete = [
  'trackEvent',
  'Amis Invitation',
  'Verification code validé',
]

export const captureAmisInvitationConnexionComplete = {
  eventName: 'Amis Invitation - Verification code validé',
}
