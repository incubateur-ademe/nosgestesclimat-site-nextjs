'use client'

import Accordion from '@/design-system/layout/Accordion'
import { useForm, useRule } from '@/publicodes-state'
import AccordionItemWithRule from './categoriesAccordion/AccordionItemWithRule'

export default function CategoriesAccordion() {
  const { categories } = useForm()

  const { numericValue: maxCategoryValue } = useRule(categories?.[0] ?? '')

  return (
    <Accordion className="mt-8">
      {categories.map((categoryDottedName, index) => {
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
