import { SIMULATOR_PATH } from './paths'

let serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3001'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const sameOrigin = new URL(serverUrl).origin.endsWith(new URL(siteUrl).origin)

if (!sameOrigin) {
  serverUrl = siteUrl + '/api/server'
}

export const SERVER_URL = serverUrl

export const AUTHENTICATION_URL = serverUrl + '/authentication/v1'

export const GROUP_URL = serverUrl + '/groups/v1'

export const ORGANISATION_URL = serverUrl + '/organisations/v1'

export const SIMULATION_URL = serverUrl + '/simulations/v1'

export const VERIFICATION_CODE_URL = serverUrl + '/verification-codes/v1'

export const MODELE_URL = serverUrl + '/modele/v1'

export const INTEGRATION_URL = serverUrl + '/integrations/v1'

export const USER_URL = serverUrl + '/users/v1'

export const NEWSLETTER_URL = serverUrl + '/newsletters/v1'

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
