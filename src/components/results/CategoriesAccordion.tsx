'use client'

import Accordion from '@/design-system/layout/Accordion'
import { useSortedCategoriesByFootprint } from '@/hooks/useSortedCategoriesByFootprint'
import { useRule } from '@/publicodes-state'
import AccordionItemWithRule from './categoriesAccordion/AccordionItemWithRule'

export default function CategoriesAccordion() {
  const { sortedCategories } = useSortedCategoriesByFootprint()

  const { numericValue: maxCategoryValue } = useRule(
    sortedCategories?.[0] ?? ''
  )

  return (
    <Accordion>
      {sortedCategories.map((categoryDottedName, index) => {
        return (
          <AccordionItemWithRule
            key={categoryDottedName}
            dottedName={categoryDottedName}
            maxValue={maxCategoryValue}
            index={index}
          />
        )
      })}
    </Accordion>
  )
}
