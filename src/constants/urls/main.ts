import { SIMULATOR_PATH } from './paths'

const secure = process.env.NODE_ENV === 'development' ? '' : 's'
const protocol = `http${secure}://`

export const SERVER_URL =
  protocol + (process.env.NEXT_PUBLIC_SERVER_URL || 'localhost:3001')

export const AUTHENTICATION_URL = SERVER_URL + '/authentication/v1'

export const GROUP_URL = SERVER_URL + '/groups/v1'

export const NEWSLETTER_URL = SERVER_URL + '/newsletters/v1'

export const ORGANISATION_URL = SERVER_URL + '/organisations/v1'

export const SIMULATION_URL = SERVER_URL + '/simulations/v1'

export const VERIFICATION_CODE_URL = SERVER_URL + '/verification-codes/v1'

export const MODELE_URL = SERVER_URL + '/modele/v1'

export const INTEGRATION_URL = SERVER_URL + '/integrations/v1'

export const getPreviewUrl = (PRNumber: string | number) => {
  return `https://nosgestesclimat-dev.s3.fr-par.scw.cloud/model/${PRNumber}`
}

export const HIDE_CTA_PATHS = [
  '/fin',
  SIMULATOR_PATH,
  '/tutoriel',
  '/infos',
  '/organisations/infos',
  '/organisations/connexion',
  '/organisations/creer',
  '/organisations/demander-demo',
]
