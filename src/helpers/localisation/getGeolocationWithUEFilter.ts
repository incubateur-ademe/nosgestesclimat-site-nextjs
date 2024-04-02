import { RegionFromGeolocation } from '@/publicodes-state/types'
import { getSupportedRegions } from '../modelFetching/getSupportedRegions'

export default async function getGeolocationWithUEFilter(
  region: RegionFromGeolocation
): Promise<RegionFromGeolocation> {
  const UE_country_codes = [
    'BE',
    'EL',
    'LT',
    'PT',
    'BG',
    'ES',
    'LU',
    'RO',
    'CZ',
    'FR',
    'HU',
    'SI',
    'DK',
    'HR',
    'MT',
    'SK',
    'DE',
    'IT',
    'NL',
    'FI',
    'EE',
    'CY',
    'AT',
    'SE',
    'IE',
    'LV',
    'PL',
  ]
  const supportedRegions = await getSupportedRegions()

  const nonSupportedUECountryCodes = UE_country_codes.filter(
    (code) => !supportedRegions[code]
  )

  if (nonSupportedUECountryCodes.includes(region?.code)) {
    region = {
      code: 'UE',
      name: 'europe',
    }
  }

  return region
}
