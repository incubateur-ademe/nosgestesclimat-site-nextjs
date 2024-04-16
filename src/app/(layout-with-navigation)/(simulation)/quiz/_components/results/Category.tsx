import HorizontalBarChartItem from '@/components/charts/HorizontalBarChartItem'
import Trans from '@/components/translation/Trans'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { useRule } from '@/publicodes-state'
import { twMerge } from 'tailwind-merge'

type Props = {
  index: number
  choice: string
  isHeaviest: boolean
  maxValue: number
}

const backgroundClasses = {
  isHeaviest: 'bg-secondary-100 border-secondary-700 border rounded-xl',
  isNotHeaviest: 'bg-white border-gray-300 border-b',
}

export default function Category({
  index,
  choice,
  isHeaviest,
  maxValue,
}: Props) {
  const { title, icons, numericValue } = useRule(choice)

  const { formattedValue, unit } = formatCarbonFootprint(numericValue)

  return (
    <div
      className={twMerge(
        'relative w-full p-4 pr-0',
        backgroundClasses[isHeaviest ? 'isHeaviest' : 'isNotHeaviest']
      )}>
      <HorizontalBarChartItem
        percentageOfTotalValue={(numericValue / maxValue) * 100}
        minTitleWidth={17}
        index={index}
        title={title}
        icons={icons?.slice(0, 2)} // No idea why we need to remove the last character on some icons
        displayValue={
          <span>
            <strong>{formattedValue}</strong> <Trans>{unit}</Trans>
          </span>
        }
      />
    </div>
  )
}
