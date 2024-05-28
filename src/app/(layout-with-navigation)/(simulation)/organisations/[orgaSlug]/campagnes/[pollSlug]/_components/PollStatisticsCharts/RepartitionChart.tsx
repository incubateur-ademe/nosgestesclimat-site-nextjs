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
  color?: string
}

export default function RepartitionChart({
  items,
  className,
  maxValue,
  id,
  color,
}: Props) {
  return (
    <div
      className={twMerge(
        'relative h-[48px] overflow-hidden rounded-xl border border-gray-300 bg-white px-2',
        className
      )}>
      {items.map(({ value, shouldBeHighlighted }, index) => (
        <>
          <BarItem
            key={`repartition-chart-item-${index}`}
            value={value}
            shouldBeHighlighted={shouldBeHighlighted}
            maxValue={maxValue}
            className={color ?? 'bg-primary-700'}
            id={`tooltip-repartition-chart-${id}-${index}`}
          />

          <Tooltip
            className="z-20"
            id={`tooltip-repartition-chart-${id}-${index}`}
          />
        </>
      ))}
    </div>
  )
}
