'use server'

import type { RegionFromGeolocation } from '@/publicodes-state/types'
import axios from 'axios'

export async function getGeolocation(): Promise<RegionFromGeolocation> {
  return await axios
    .get(
      (process.env.NODE_ENV === 'production') ?
      `https://${process.env.NEXT_PUBLIC_SERVER_URL}/api/geolocation` :
      'http://localhost:3000/api/geolocation'
    )
    .then((res) => res.data)
}
