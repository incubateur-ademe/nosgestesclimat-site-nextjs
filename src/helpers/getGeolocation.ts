import { RegionFromGeolocation } from '@/publicodes-state/types'

export async function getGeolocation(): Promise<RegionFromGeolocation> {
  const region = await fetch(
    `${
      process.env.VERCEL_ENV === 'preview' ||
      process.env.VERCEL_ENV === 'production'
        ? 'https'
        : 'http'
    }://${process.env.VERCEL_URL || 'localhost:3000'}/api/geolocation`
  )
    .then((res) => res.json())
    .then(
      (res: {
        country: {
          code: string
          name: string
        }
      }) => res.country
    )

  return region
}
