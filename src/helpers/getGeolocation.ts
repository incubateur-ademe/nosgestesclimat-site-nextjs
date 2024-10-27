import { RegionFromGeolocation } from '@/publicodes-state/types'
import axios from 'axios'
import { headers } from 'next/headers'

export async function getGeolocation(): Promise<RegionFromGeolocation> {
  const headersList = headers()
  let currentUrl = headersList.get('x-url') || ''

  if (!currentUrl) {
    // Fallback: construct the URL using other available information
    const host = headersList.get('host') || 'localhost:3000'
    const proto = headersList.get('x-forwarded-proto') || 'http'
    currentUrl = `${proto}://${host}`
  }

  console.log('currentUrl', currentUrl)

  return await axios
    .get(`${currentUrl}/api/geolocation`)
    .then((res) => res.data)
}
