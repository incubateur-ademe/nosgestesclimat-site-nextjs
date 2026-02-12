import type { SubcategoryDisplayData } from '@/helpers/getCategoriesDisplayData'
import SubcategoryItem from './subcategoriesList/SubcategoryItem'

interface Props {
  subcategories: SubcategoryDisplayData[]
  bgBarClassName: string
}

export default function SubcategoriesList({
  subcategories,
  bgBarClassName,
}: Props) {
  return (
    <ul>
      {subcategories.map((subcategory, index) => (
        <SubcategoryItem
          key={subcategory.dottedName}
          subcategory={subcategory}
          bgBarClassName={bgBarClassName}
          index={index}
        />
      ))}
    </ul>
  )
}
