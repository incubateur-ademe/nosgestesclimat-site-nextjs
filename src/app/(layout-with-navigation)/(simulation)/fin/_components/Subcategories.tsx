import { useSortedSubcategoriesByFootprint } from '@/hooks/useSortedSubcategoriesByFootprint'
import Subcategory from './subcategories/Subcategory'

export default function Subcategories() {
  const { sortedSubcategories } = useSortedSubcategoriesByFootprint()

  const firstThreeSubcategories = sortedSubcategories.slice(0, 3)

  return (
    <>
      {firstThreeSubcategories.map((subcategory, index) => (
        <Subcategory
          key={subcategory}
          subcategory={subcategory}
          index={index}
        />
      ))}
    </>
  )
}
