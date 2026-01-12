// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

type TrackingData = {
  matomo: (string | null)[]
  posthog?: {
    eventName: string
    properties?: Record<string, string | number | boolean | null | undefined>
  }
}

export const amisCreationEtapeVotreGroupeSuivant = (): TrackingData => ({
  matomo: ['trackEvent', 'Amis Creation', 'Step 1 - Click Suivant'],
})

export const amisCreationVosInformationsRetour = (): TrackingData => ({
  matomo: ['trackEvent', 'Amis Creation', 'Step 1 - Click Retour'],
})

export const amisCreationEtapeVosInformationsSuivant = (): TrackingData => ({
  matomo: ['trackEvent', 'Amis Creation', 'Step 2 - Click Suivant'],
  posthog: {
    eventName: 'Classements create group',
  },
})

export const amisCreationVotreGroupeRetour = (): TrackingData => ({
  matomo: ['trackEvent', 'Amis Creation', 'Step 2 - Click Retour'],
})
