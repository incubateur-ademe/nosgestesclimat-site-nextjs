'use client'

import Accordion from '@/design-system/layout/accordion/Accordion'
import { useForm, useTempEngine } from '@/publicodes-state'
import SubcategoriesList from './subcategoriesList/SubcategoriesList'

export default function CategoriesAccordion() {
  const { categories } = useForm()

  const { getRuleObject } = useTempEngine()

  return (
    <Accordion
      className="mt-8"
      items={categories.map((categoryName) => {
        const categoryObject = getRuleObject(categoryName)
        console.log(categoryName)
        return {
          title: categoryObject?.title,
          icons: categoryObject?.rawNode.icônes,
          category: categoryName,
          content: <SubcategoriesList category={categoryName} />,
          isReadOnly: categoryName === 'services sociétaux',
        }
      })}
    />
  )
}
