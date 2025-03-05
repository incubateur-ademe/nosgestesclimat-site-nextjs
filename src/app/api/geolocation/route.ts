import { defaultInitialRegion } from '@/constants/defaultRegion'
import type { RegionFromGeolocation } from '@/publicodes-state/types'
import type { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import supportedRegions from '@incubateur-ademe/nosgestesclimat/public/supportedRegions.json'
import { geolocation } from '@vercel/functions'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import countries from './countries.json'
import ue_country_codes from './ue_country_codes.json'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const data = geolocation(request)

  const { country: detectedCountryCode } = data || {}

  if (!detectedCountryCode) {
    return NextResponse.json(defaultInitialRegion)
  }

  const isNotSupportedUECountry =
    getIsNotSupportedUECountry(detectedCountryCode)

  if (isNotSupportedUECountry) {
    return NextResponse.json({ country: { name: 'Europe', code: 'EU' } })
  }

  const country: RegionFromGeolocation =
    countries.find((country) => country.code === detectedCountryCode) ??
    defaultInitialRegion

  return NextResponse.json(country)
}

const nonSupportedUECountryCodes = ue_country_codes.filter(
  (code) => !(supportedRegions as SupportedRegions)[code]
)

function getIsNotSupportedUECountry(countryCode: string): boolean {
  return nonSupportedUECountryCodes.includes(countryCode)
}
