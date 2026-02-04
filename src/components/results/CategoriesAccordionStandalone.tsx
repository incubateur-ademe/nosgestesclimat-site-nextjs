import HorizontalBarChartItem from '@/components/charts/HorizontalBarChartItem'
import Trans from '@/components/translation/trans/TransClient'
import { defaultMetric } from '@/constants/model/metric'
import Card from '@/design-system/layout/Card'
import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
import type { ComputedResults, Metric } from '@/publicodes-state/types'
import type { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { utils } from 'publicodes'
import SubcategoriesListStandalone from './categoriesAccordionStandalone/SubcategoriesListStandalone'

interface Props {
  rules: Partial<NGCRules>
  computedResults: ComputedResults
  metric?: Metric
}

/**
 * Standalone version of CategoriesAccordion that doesn't use publicodes-state hooks.
 * All data comes from props (computedResults and rules).
 */
export default function CategoriesAccordionStandalone({
  rules,
  computedResults,
  metric = defaultMetric,
}: Props) {
  const categoriesData = computedResults[metric]?.categories ?? {}

  // Sort categories by value (descending)
  const sortedCategories = Object.entries(categoriesData)
    .filter(([, value]) => value > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([dottedName]) => dottedName as DottedName)

  const maxCategoryValue = categoriesData[sortedCategories[0]] ?? 0

  return (
    <div className="flex flex-col">
      {sortedCategories.map((categoryDottedName, index) => {
        const rule = rules[categoryDottedName]
        const title =
          (rule?.titre as string) ?? utils.nameLeaf(categoryDottedName)
        const icons = rule?.['icônes']
        const numericValue = categoriesData[categoryDottedName] ?? 0

        const { formattedValue, unit } = formatFootprint(numericValue, {
          metric,
        })

        const percentageOfTotalValue = (numericValue / maxCategoryValue) * 100

        return (
          <AccordionItem
            key={categoryDottedName}
            title={
              <HorizontalBarChartItem
                percentageOfTotalValue={percentageOfTotalValue}
                index={index}
                title={title}
                icons={icons}
                barColor={getBackgroundColor(categoryDottedName)}
                shouldDisplayValue={false}
                displayValue={
                  <span>
                    <strong className="font-black">{formattedValue}</strong>{' '}
                    <Trans>{unit}</Trans>
                  </span>
                }
              />
            }
            name={title ?? ''}
            ariaLabel={`${title ?? ''} - ${formattedValue} ${unit}`}
            content={
              <Card
                className="mb-4 border-x-0 bg-gray-100"
                style={{
                  boxShadow: '0px 6px 6px -2px rgba(21, 3, 35, 0.05) inset',
                }}>
                <SubcategoriesListStandalone
                  category={categoryDottedName}
                  rules={rules}
                  subcategoriesData={computedResults[metric]?.subcategories}
                  categoryValue={numericValue}
                  metric={metric}
                />
              </Card>
            }
          />
        )
      })}
    </div>
  )
}
