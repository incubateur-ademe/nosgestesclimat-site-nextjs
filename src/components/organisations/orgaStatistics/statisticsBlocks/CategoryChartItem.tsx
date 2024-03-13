'use client'

import VerticalBarChartItem from '@/components/charts/verticalBarChart/VerticalBarChartItem'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'
import { Tooltip } from 'react-tooltip'

export default function CategoryChartItem({
  category,
  maxValue,
  value,
  index,
}: {
  category: string
  value: number
  maxValue: number
  index: number
}) {
  const { t } = useClientTranslation()

  const { icons, title } = useRule(category)

  const percentageOfMaxValue = 1 - (maxValue - value) / maxValue

  return (
    <>
      <Tooltip id={`category-${category}`} />
      <VerticalBarChartItem
        data-tooltip-id={`category-${category}`}
        data-tooltip-content={t('{{category}}', {
          category: capitalizeString(category),
        })}
        value={String(value)}
        index={index}
        percentage={percentageOfMaxValue}
        ariaLabel={t(
          'La catégorie {{title}} représente {{value}} tonnes de CO2 equivalent.',
          { value, title }
        )}
        title={title ?? ''}
        icons={icons}
      />
    </>
  )
}
