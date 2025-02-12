import { useSortedSubcategoriesByFootprint } from '@/hooks/useSortedSubcategoriesByFootprint'
import { useSortedUiCategoriesByFootprint } from '@/hooks/useSortedUiCategoriesByFootprint'
import AgirSecondaryBlock from '../AgirSecondaryBlock'
import OtherWays from './OtherWays'
import Subcategory from './subcategories/Subcategory'

export default function Subcategories() {
  const { sortedSubcategories } = useSortedSubcategoriesByFootprint()

  const { sortedUiCategories } = useSortedUiCategoriesByFootprint()

  const firstThreeSubcategories = (
    sortedUiCategories.length > 0 ? sortedUiCategories : sortedSubcategories
  ).slice(0, 3)

  return (
    <>
      {firstThreeSubcategories.map((subcategory, index) => (
        <Subcategory
          key={subcategory}
          subcategory={subcategory}
          index={index}
        />
      ))}
      <AgirSecondaryBlock />
      <OtherWays />
    </>
  )
}
