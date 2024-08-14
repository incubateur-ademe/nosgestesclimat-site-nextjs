import CarboneTotalChart from '@/components/fin/CarboneTotalChart'
import WaterTotalChart from '@/components/fin/WaterTotalChart'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import TabNavigation from './metricSlider/TabNavigation'

export default function MetricSlider() {
  const { currentMetric } = useCurrentMetric()

  const [isSticky, setIsSticky] = useState(false)

  const myElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
  }, [])

  return (
    <div
      className="pointer-events-none sticky top-0 z-50 h-96"
      ref={myElementRef}>
      <TabNavigation />
      <div
        className={twMerge(
          'relative mx-auto -mt-0.5 w-full overflow-hidden rounded-b-xl rounded-tr-xl border-2 border-primary-50 bg-gray-100 px-0 transition-all duration-300',
          isSticky ? 'h-20 lg:h-[5.5rem]' : 'h-72 lg:h-80'
        )}>
        {currentMetric === 'carbone' && (
          <div className={twMerge('relative !flex h-full flex-col')}>
            <div className="h-full w-full px-4">
              <CarboneTotalChart isSmall={isSticky} />
            </div>
          </div>
        )}
        {currentMetric === 'eau' && (
          <div className={twMerge('relative !flex h-full flex-col')}>
            <WaterTotalChart isSmall={isSticky} />
          </div>
        )}
      </div>
    </div>
  )
}
