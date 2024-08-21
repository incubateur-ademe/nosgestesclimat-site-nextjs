'use client'

import { defaultMetric } from '@/constants/metric'
import Accordion from '@/design-system/layout/Accordion'
import { useSortedCategoriesByFootprint } from '@/hooks/useSortedCategoriesByFootprint'
import { useRule } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'
import AccordionItemWithRule from './categoriesAccordion/AccordionItemWithRule'

type Props = {
  metric?: Metric
}
export default function CategoriesAccordion({ metric = defaultMetric }: Props) {
  const { sortedCategories } = useSortedCategoriesByFootprint({ metric })

  const { numericValue: maxCategoryValue } = useRule(
    sortedCategories?.[0] ?? '',
    metric
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
            metric={metric}
          />
        )
      })}
    </Accordion>
  )
}
