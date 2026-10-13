'use server'

import { MODELE_URL } from '@/constants/urls/main'
import { NotFoundError } from '@/helpers/server/error'
import { fetchServer } from '@/helpers/server/fetchServer'
import {
  DEFAULT_REGION,
  supportedRegions,
  type Region,
} from '@/helpers/server/model/models'
import logger from '@/logger/logger.server'

export const getGeolocation = logger.withSpan(
  'site.action.getGeolocation',
  async ({ logger }): Promise<Region> => {
    try {
      const geo = await fetchServer<{ code: string; region: string }>(
        `${MODELE_URL}/geolocation`
      )
      if (geo.code in supportedRegions) {
        return geo.code as Region
      }
      if (geo.region === 'Europe') {
        return 'EU'
      }
      return DEFAULT_REGION
    } catch (e) {
      // Un visiteur dont l'adresse n'est pas un IPv4 prend la région par défaut :
      // nominal, donc un log `info` d'audit et le motif en attribut.
      const reason = e instanceof NotFoundError ? e.reason : undefined

      logger.info('Geolocation unavailable, defaulting the region', {
        ...(reason && { reason }),
      })
      return DEFAULT_REGION
    }
  }
)
