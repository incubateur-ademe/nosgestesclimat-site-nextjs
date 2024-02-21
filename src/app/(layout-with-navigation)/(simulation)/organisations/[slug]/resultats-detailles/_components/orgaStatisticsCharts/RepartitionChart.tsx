import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { twMerge } from 'tailwind-merge'
import BarItem from './repartitionChart/BarItem'

type Props = {
  items: {
    value: number
    shouldBeHighlighted?: boolean
  }[]
  className?: string
  maxValue: number
  id: string
}

export default function RepartitionChart({
  items,
  className,
  maxValue,
  id,
}: Props) {
  return (
    <div
      className={twMerge(
        'relative h-[48px] overflow-hidden rounded-lg border border-gray-300 bg-white px-2',
        className
      )}>
      {items.map(({ value, shouldBeHighlighted }, index) => (
        <BarItem
          key={`repartition-chart-item-${index}`}
          value={value}
          shouldBeHighlighted={shouldBeHighlighted}
          maxValue={maxValue}
          id={`tooltip-repartition-chart-${id}`}
        />
      ))}
      <Tooltip id={`tooltip-repartition-chart-${id}`} />
    </div>
  )
}
