import { defaultInitialRegion } from '@/constants/defaultRegion'
import type { RegionFromGeolocation } from '@/publicodes-state/types'
import type { SupportedRegions } from '@abc-transitionbascarbone/near-modele'
import supportedRegions from '@abc-transitionbascarbone/near-modele/public/supportedRegions.json'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import countries from './countries.json'
import ue_country_codes from './ue_country_codes.json'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const detectedCountryCode = request.geo?.country

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
