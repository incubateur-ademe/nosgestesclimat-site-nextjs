'use client'

import Accordion from '@/design-system/layout/accordion/Accordion'
import { useForm } from '@/publicodes-state'
import AccordionItemWithRule from './categoriesAccordion/AccordionItemWithRule'

export default function CategoriesAccordion() {
  const { categories } = useForm()

  return (
    <Accordion className="mt-8">
      {categories.map((categoryDottedName) => {
        return (
          <AccordionItemWithRule
            key={categoryDottedName}
            dottedName={categoryDottedName}
          />
        )
      })}
    </Accordion>
  )
}
