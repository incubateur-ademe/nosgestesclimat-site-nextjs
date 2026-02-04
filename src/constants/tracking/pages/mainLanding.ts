import { trackEvent, trackEvents } from '@/utils/analytics/trackEvent'

export const trackLearnMoreCarbonLink = () => {
  trackEvents(['trackEvent', 'Accueil', 'Click "En savoir plus LP carbone"'], {
    eventName: 'Accueil click en savoir plus LP carbone',
  })
}

export const trackLearnMoreWaterLink = () => {
  trackEvents(['trackEvent', 'Accueil', 'Click "En savoir plus LP eau"'], {
    eventName: 'Accueil click en savoir plus LP eau',
  })
}

export const trackCreateGroupLink = () => {
  trackEvent(['trackEvent', 'Accueil', 'Click "Groupes"'])
}

export const trackCreateOrganisationLink = () => {
  trackEvent(['trackEvent', 'Accueil', 'Click "Organisations"'])
}
