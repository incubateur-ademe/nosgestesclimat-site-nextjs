import { RegionFromGeolocation } from '@/publicodes-state/types'
import axios from 'axios'

export async function getGeolocation(): Promise<RegionFromGeolocation> {
  return await axios
    .get(
      `${
        process.env.VERCEL_ENV === 'preview' ||
        process.env.VERCEL_ENV === 'production'
          ? 'https'
          : 'http'
      }://${process.env.VERCEL_URL || 'localhost:3000'}/api/geolocation`
    )
    .then((res) => res.data)
}
