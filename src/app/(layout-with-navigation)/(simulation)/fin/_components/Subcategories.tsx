import { useSortedSubcategoriesByFootprint } from '@/hooks/useSortedSubcategoriesByFootprint'
import Subcategory from './subcategories/Subcategory'

export default function Subcategories() {
  const { sortedSubcategories } = useSortedSubcategoriesByFootprint()

  const firstThreeSubcategories = sortedSubcategories.slice(0, 3)

  return (
    <div className="flex flex-col items-start gap-10">
      {firstThreeSubcategories.map((subcategory, index) => (
        <Subcategory
          key={subcategory}
          subcategory={subcategory}
          index={index}
        />
      ))}
    </div>
  )
}
