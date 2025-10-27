import { twMerge } from 'tailwind-merge'
import TargetNumberServer from './TargetNumberServer'

export default function GaugeServer({
  total,
  locale,
}: {
  total: number
  locale: string
}) {
  const isOutOfRange = total > 12000

  return (
    <div className={twMerge('relative h-8 w-full lg:h-12')} aria-hidden="true">
      <div
        className="border-primary-100 relative h-full w-full overflow-hidden rounded-full border-2 lg:h-10"
        style={{ backgroundColor: '#f96f81' }}
        role="presentation">
        <div
          className="bg-total-chart absolute top-0 right-0 bottom-0 left-0 origin-left"
          style={{ transform: `scaleX(${isOutOfRange ? 0.5 : 1})` }}
          aria-hidden="true"
        />
      </div>
      <div className="absolute bottom-full left-0 text-xs" aria-hidden="true">
        0
      </div>
      {!isOutOfRange ? (
        <div
          className="absolute right-0 bottom-full text-xs"
          aria-hidden="true">
          12
        </div>
      ) : null}

      <TargetNumberServer locale={locale} />
    </div>
  )
}
