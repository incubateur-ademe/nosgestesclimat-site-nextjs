import { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import supportedRegions from '@incubateur-ademe/nosgestesclimat/public/supportedRegions.json' assert { type: 'json' }
import { NextRequest, NextResponse } from 'next/server'
import countries from './countries.json'
import ue_country_codes from './ue_country_codes.json'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const detectedCountryCode = request.geo?.country

  if (!detectedCountryCode) {
    return NextResponse.json({ undefined })
  }

  const isNotSupportedUECountry =
    await getIsNotSupportedUECountry(detectedCountryCode)

  if (isNotSupportedUECountry) {
    return NextResponse.json({ country: { name: 'Europe', code: 'EU' } })
  }

  const country = countries.find(
    (country) => country.code === detectedCountryCode
  )

  return NextResponse.json({ country })
}

function getIsNotSupportedUECountry(countryCode: string): boolean {
  // Type assertion should be fixed. The type of supportedRegions is not inferred correctly but should be dealed with when importing the file.
  const nonSupportedUECountryCodes = ue_country_codes.filter(
    (code) => !(supportedRegions as SupportedRegions)[code]
  )
  return nonSupportedUECountryCodes.includes(countryCode)
}
