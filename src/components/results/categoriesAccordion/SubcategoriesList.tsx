import type { SubcategoryDisplayData } from '@/helpers/getCategoriesDisplayData'
import type { TFunction } from 'i18next'
import SubcategoryItem from './subcategoriesList/SubcategoryItem'

interface Props {
  subcategories: SubcategoryDisplayData[]
  bgBarClassName: string
  t: TFunction
}

export default function SubcategoriesList({
  subcategories,
  bgBarClassName,
  t,
}: Props) {
  return (
    <ul>
      {subcategories.map((subcategory, index) => (
        <SubcategoryItem
          key={subcategory.dottedName}
          subcategory={subcategory}
          bgBarClassName={bgBarClassName}
          index={index}
          t={t}
        />
      ))}
    </ul>
  )
}
