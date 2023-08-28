import { SupportedRegionType, SuppportedRegions } from '@/types/international'

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
