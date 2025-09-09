import { useIframe } from '@/hooks/useIframe'
import { useSortedSubcategoriesByFootprint } from '@/hooks/useSortedSubcategoriesByFootprint'
import { useSortedUiCategoriesByFootprint } from '@/hooks/useSortedUiCategoriesByFootprint'
import AgirSecondaryBlock from '../JagisSecondaryBlock'
import OtherWays from './OtherWays'
import Subcategory from './subcategories/Subcategory'

export default function Subcategories() {
  const { isFrenchRegion } = useIframe()

  const { sortedSubcategories } = useSortedSubcategoriesByFootprint()

  const { sortedUiCategories } = useSortedUiCategoriesByFootprint()

  const firstThreeSubcategories = (
    sortedUiCategories.length > 0 ? sortedUiCategories : sortedSubcategories
  ).slice(0, 3)

  return (
    <>
      <ol>
        {firstThreeSubcategories.map((subcategory, index) => (
          <li key={subcategory}>
            <Subcategory subcategory={subcategory} index={index} />
          </li>
        ))}
      </ol>
      {isFrenchRegion && <AgirSecondaryBlock />}
      <OtherWays />
    </>
  )
}
