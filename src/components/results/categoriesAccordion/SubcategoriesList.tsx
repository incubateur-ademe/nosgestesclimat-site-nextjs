import type { SubcategoryDisplayData } from '@/helpers/getCategoriesDisplayData'
import SubcategoryItem from './subcategoriesList/SubcategoryItem'

interface Props {
  subcategories: SubcategoryDisplayData[]
  colorName: string
}

export default function SubcategoriesList({ subcategories, colorName }: Props) {
  return (
    <ul>
      {subcategories.map((subcategory, index) => (
        <SubcategoryItem
          key={subcategory.dottedName}
          subcategory={subcategory}
          colorName={colorName}
          index={index}
        />
      ))}
    </ul>
  )
}
