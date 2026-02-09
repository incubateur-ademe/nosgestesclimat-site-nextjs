import { trackEvents } from '@/utils/analytics/trackEvent'

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
  trackEvents(['trackEvent', 'Accueil', 'Click "Groupes"'])
}

export const trackCreateOrganisationLink = () => {
  trackEvents(['trackEvent', 'Accueil', 'Click "Organisations"'])
}
