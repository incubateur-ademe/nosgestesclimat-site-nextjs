import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import { NextRequest, NextResponse } from 'next/server'
import countries from './countries.json'
import ue_country_codes from './ue_country_codes.json'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const detectedCountryCode = request.geo?.country

  if (!detectedCountryCode) {
    return undefined
  }

  if (await isNotSupportedUECountry(detectedCountryCode)) {
    return NextResponse.json({ name: 'Europe', code: 'EU' })
  }

  const country = countries.find(
    (country) => country.code === detectedCountryCode
  )

  return NextResponse.json({ country })
}

async function isNotSupportedUECountry(countryCode: string): Promise<boolean> {
  const supportedRegions = await getSupportedRegions()

  const nonSupportedUECountryCodes = ue_country_codes.filter(
    (code) => !supportedRegions[code]
  )
  return nonSupportedUECountryCodes.includes(countryCode)
}
