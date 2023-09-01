import {
  Region,
  RegionParams,
  SupportedRegionType,
  SuppportedRegions,
} from '@/types/international'

export const sortSupportedRegions = ({
  supportedRegions,
  currentLocale,
}: {
  supportedRegions: SuppportedRegions
  currentLocale: string
}) => {
  return Object.fromEntries(
    Object.entries(supportedRegions)
      // sort function from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      .sort((supportedRegionA, supportedRegionB) => {
        const nameA = (supportedRegionA[1] as unknown as SupportedRegionType)[
          currentLocale
        ]?.nom.toUpperCase() // ignore upper and lowercase
        const nameB = (supportedRegionB[1] as unknown as SupportedRegionType)[
          currentLocale
        ]?.nom.toUpperCase() // ignore upper and lowercase
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
}

export const sortSupportedRegions2 = (
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
