import { SIMULATOR_PATH } from './paths'

let serverUrl

const serverOrigin = new URL(process.env.NEXT_PUBLIC_SERVER_URL!).origin
const clientOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL!).origin

if (!serverOrigin.endsWith(clientOrigin)) {
  serverUrl = process.env.NEXT_PUBLIC_SITE_URL + '/api/server'
} else {
  serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
}
if (serverUrl && !serverUrl.startsWith('http')) {
  serverUrl = `https://${serverUrl}`
}

export const AUTHENTICATION_URL = serverUrl + '/authentication/v1'

export const GROUP_URL = serverUrl + '/groups/v1'

export const NEWSLETTER_URL = serverUrl + '/newsletters/v1'

export const ORGANISATION_URL = serverUrl + '/organisations/v1'

export const SIMULATION_URL = serverUrl + '/simulations/v1'

export const VERIFICATION_CODE_URL = serverUrl + '/verification-codes/v1'

export const MODELE_URL = serverUrl + '/modele/v1'

export const INTEGRATION_URL = serverUrl + '/integrations/v1'

export const USER_URL = serverUrl + '/users/v1'

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
