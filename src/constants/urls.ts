const secure = process.env.NODE_ENV === 'development' ? '' : 's'
const protocol = `http${secure}://`

export const SERVER_URL =
  protocol + (process.env.NEXT_PUBLIC_SERVER_URL || 'localhost:3001')

export const SIMULATION_URL = SERVER_URL + '/simulation/'

export const EMAIL_SIMULATION_URL = SERVER_URL + '/email-simulation/'

export const GROUP_URL = SERVER_URL + '/group'

export const SAVE_SIMULATION_URL = SERVER_URL + '/simulations/create'

export const getPreviewUrl = (PRNumber: string | number) => {
  if (PRNumber === 'nightly') {
    return `https://preprod--ecolab-data.netlify.app`
  }
  return `https://deploy-preview-${PRNumber}--ecolab-data.netlify.app`
}

export const HIDE_CTA_PATHS = [
  '/fin',
  '/simulateur/bilan',
  '/tutoriel',
  '/infos',
  '/organisations/infos',
  '/organisations/connexion',
  '/organisations/creer',
  '/organisations/demander-demo',
]
