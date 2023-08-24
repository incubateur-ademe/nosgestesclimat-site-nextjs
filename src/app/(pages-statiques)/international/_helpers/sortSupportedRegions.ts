import { Region, RegionCode, RegionParams } from '@/types/international'

export const sortSupportedRegions = (
  // TODO : fix type
  supportedRegions: any[],
  currentLang: string
) =>
  Object.fromEntries(
    Object.entries(supportedRegions).sort((a: any, b: any) => {
      const nameA = (
        a[1][currentLang as RegionCode] as RegionParams
      )?.nom.toUpperCase() // ignore upper and lowercase

      const nameB = (
        b[1][currentLang as RegionCode] as RegionParams
      )?.nom.toUpperCase() // ignore upper and lowercase

      if (nameA < nameB) {
        return -1
      }

      if (nameA > nameB) {
        return 1
      }

      // names must be equal
      return 0
    })
  )
