'use server'

import { RegionFromGeolocation } from '@/publicodes-state/types'
import axios from 'axios'
import { headers } from 'next/headers'

export async function getGeolocation(): Promise<RegionFromGeolocation> {
  const headersList = headers()

  const currentUrl = headersList.get('x-url') || 'http://localhost:3000'

  return await axios
    .get(`${currentUrl}/api/geolocation`)
    .then((res) => res.data)
}
