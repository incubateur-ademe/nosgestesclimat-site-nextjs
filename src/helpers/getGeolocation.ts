'use server'

import { RegionFromGeolocation } from '@/publicodes-state/types'
import axios from 'axios'
import { headers } from 'next/headers'

export async function getGeolocation(): Promise<RegionFromGeolocation> {
  const headersList = headers()

  // This function is called by the server, so we need a specific way to get the current URL
  let currentUrl = headersList.get('x-url') || ''

  if (!currentUrl) {
    const host = headersList.get('host') || 'localhost:3000'
    const proto = headersList.get('x-forwarded-proto') || 'http'
    currentUrl = `${proto}://${host}`
  }

  return await axios
    .get(`${currentUrl}/api/geolocation`)
    .then((res) => res.data)
}
