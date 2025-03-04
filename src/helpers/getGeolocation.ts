'use server'

import type { RegionFromGeolocation } from '@/publicodes-state/types'
import axios from 'axios'

export async function getGeolocation(): Promise<RegionFromGeolocation> {
  return await axios
    .get(
      `${
        process.env.NEXT_URL ? process.env.NEXT_URL : 'http://localhost:3000'
      }/api/geolocation`
    )
    .then((res) => res.data)
}
