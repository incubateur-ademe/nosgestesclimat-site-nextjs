// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

export const amisCreationEtapeVotreGroupeSuivant = [
  'trackEvent',
  'Amis Creation',
  'Step 1 - Click Suivant',
]

export const amisCreationVosInformationsRetour = [
  'trackEvent',
  'Amis Creation',
  'Step 1 - Click Retour',
]

export const amisCreationEtapeVosInformationsSuivant = [
  'trackEvent',
  'Amis Creation',
  'Step 2 - Click Suivant',
]

export const amisCreationVotreGroupeRetour = [
  'trackEvent',
  'Amis Creation',
  'Step 2 - Click Retour',
]

// Posthog tracking for group creation
export const amisCreationCreateGroupPosthog = {
  eventName: 'Classements create group',
}
