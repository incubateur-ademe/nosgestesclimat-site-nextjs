import { Region, RegionParams } from '@/types/international'

export const sortSupportedRegions = (
  // TODO : fix type
  supportedRegions: any[],
  currentLang: string
) =>
  Object.fromEntries(
    Object.entries(supportedRegions).sort(
      (a: Partial<Region>, b: Partial<Region>) => {
        const nameA = (
          (a as Array<any>)[1][currentLang] as RegionParams
        )?.nom.toUpperCase() // ignore upper and lowercase

        const nameB = (
          (b as Array<any>)[1][currentLang] as RegionParams
        )?.nom.toUpperCase() // ignore upper and lowercase

        if (nameA < nameB) {
          return -1
        }

        if (nameA > nameB) {
          return 1
        }

        // names must be equal
        return 0
      }
    )
  )
