type TrackingData = {
  matomo: (string | null)[]
  posthog?: {
    eventName: string
    properties?: Record<string, string | number | boolean | null | undefined>
  }
}

export const learnMoreCarbonLink = (): TrackingData => ({
  matomo: ['trackEvent', 'Accueil', 'Click "En savoir plus LP carbone"'],
  posthog: {
    eventName: 'Accueil click en savoir plus LP carbone',
  },
})

export const learnMoreWaterLink = (): TrackingData => ({
  matomo: ['trackEvent', 'Accueil', 'Click "En savoir plus LP eau"'],
  posthog: {
    eventName: 'Accueil click en savoir plus LP eau',
  },
})

export const createGroupLink = (): TrackingData => ({
  matomo: ['trackEvent', 'Accueil', 'Click "Groupes"'],
})

export const createOrganisationLink = (): TrackingData => ({
  matomo: ['trackEvent', 'Accueil', 'Click "Organisations"'],
})
