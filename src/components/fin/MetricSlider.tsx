import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import CarboneTotalChart from './metricSlider/CarboneTotalChart'
import TabNavigation from './metricSlider/TabNavigation'
import WaterTotalChart from './metricSlider/WaterTotalChart'

type Props = {
  carboneTotal?: number
  waterTotal?: number
  isStatic?: boolean
}
export default function MetricSlider({
  carboneTotal,
  waterTotal,
  isStatic,
}: Props) {
  const { currentMetric } = useCurrentMetric()

  const [isSticky, setIsSticky] = useState(false)

  const myElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isStatic) {
      return
    }

    const handleScroll = () => {
      if (myElementRef.current) {
        const { top } = myElementRef.current.getBoundingClientRect()
        if (top <= 0) {
          setIsSticky(true)
        } else {
          setIsSticky(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isStatic])

  return (
    <div
      className={isStatic ? '' : 'sticky top-0 z-40 h-96'}
      ref={myElementRef}>
      <TabNavigation
        isSticky={isSticky}
        isStatic={isStatic}
        shouldShowWater={!(isStatic && !waterTotal)}
      />
      <div
        className={twMerge(
          'relative mx-auto -mt-0.5 w-full overflow-hidden rounded-b-xl rounded-tr-xl border-2 border-primary-50 bg-gray-100 px-0 transition-all duration-300',
          isSticky ? 'h-20 lg:h-[5.5rem]' : 'h-72 lg:h-80'
        )}>
        {currentMetric === 'carbone' && (
          <div className={twMerge('relative !flex h-full flex-col')}>
            <div className="h-full w-full px-4">
              <CarboneTotalChart isSmall={isSticky} total={carboneTotal} />
            </div>
          </div>
        )}
        {currentMetric === 'eau' && (
          <div className={twMerge('relative !flex h-full flex-col')}>
            <WaterTotalChart
              isSmall={isSticky}
              total={waterTotal}
              isStatic={isStatic}
            />
          </div>
        )}
      </div>
    </div>
  )
}
