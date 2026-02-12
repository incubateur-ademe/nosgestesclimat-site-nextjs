import type { SubcategoryDisplayData } from '@/helpers/getCategoriesDisplayData'
import type { Locale } from '@/i18nConfig'
import SubcategoryItem from './subcategoriesList/SubcategoryItem'

interface Props {
  subcategories: SubcategoryDisplayData[]
  bgBarClassName: string
  locale: Locale
}

export default function SubcategoriesList({
  subcategories,
  bgBarClassName,
  locale,
}: Props) {
  return (
    <ul>
      {subcategories.map((subcategory, index) => (
        <SubcategoryItem
          key={subcategory.dottedName}
          subcategory={subcategory}
          bgBarClassName={bgBarClassName}
          index={index}
          locale={locale}
        />
      ))}
    </ul>
  )
}
