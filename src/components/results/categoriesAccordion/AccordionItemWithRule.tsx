'use client'

import HorizontalBarChartItem from '@/components/charts/HorizontalBarChartItem'
import Trans from '@/components/translation/Trans'
import { endClickCategory } from '@/constants/tracking/pages/end'
import Card from '@/design-system/layout/Card'
import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
import { useRule, useSimulation } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import SubcategoriesList from './accordionItemWithRule/SubcategoriesList'

export default function AccordionItemWithRule({
  dottedName,
  maxValue,
  index,
}: {
  dottedName: string
  maxValue: number
  index?: number
}) {
  const { title, icons, numericValue } = useRule(dottedName)

  const { subcategories } = useSimulation()

  const { formattedValue, unit } = formatCarbonFootprint(numericValue)

  const percentageOfTotalValue = (numericValue / maxValue) * 100

  return (
    <AccordionItem
      onClick={() => trackEvent(endClickCategory(dottedName))}
      title={
        <HorizontalBarChartItem
          percentageOfTotalValue={percentageOfTotalValue}
          index={index}
          title={title}
          icons={icons}
          barColor={getBackgroundColor(dottedName)}
          displayValue={
            <span>
              <strong className="font-black">{formattedValue}</strong>{' '}
              <Trans>{unit}</Trans>
            </span>
          }
        />
      }
      content={
        <Card
          className="mb-4 border-x-0 bg-gray-100"
          style={{
            boxShadow: '0px 6px 6px -2px rgba(21, 3, 35, 0.05) inset',
          }}>
          <SubcategoriesList
            category={dottedName}
            subcategories={subcategories}
          />
        </Card>
      }
    />
  )
}
