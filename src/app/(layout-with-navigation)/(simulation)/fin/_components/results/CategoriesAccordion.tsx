'use client'

import Accordion from '@/design-system/layout/Accordion'
import { useRule } from '@/publicodes-state'
import AccordionItemWithRule from './categoriesAccordion/AccordionItemWithRule'

type Props = {
  sortedCategories: string[]
}

export default function CategoriesAccordion({ sortedCategories }: Props) {
  const { numericValue: maxCategoryValue } = useRule(
    sortedCategories?.[0] ?? ''
  )

  return (
    <Accordion className="mt-8">
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
