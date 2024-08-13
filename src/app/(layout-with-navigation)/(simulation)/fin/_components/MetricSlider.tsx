import CarboneTotalChart from '@/components/fin/CarboneTotalChart'
import WaterTotalChart from '@/components/fin/WaterTotalChart'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import DesktopTabNavigation from './metricSlider/DesktopTabNavigation'
import SmallTotal from './metricSlider/SmallTotal'

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
    <div ref={myElementRef} className="sticky top-0 z-50 mb-8 w-full">
      <DesktopTabNavigation />
      <div className="h-72 lg:h-80">
        <div
          className={twMerge(
            'relative mx-auto -mt-0.5 w-full overflow-hidden rounded-b-xl rounded-tr-xl border-2 border-primary-50 bg-gray-100 px-0 transition-all delay-100 duration-500',
            isSticky ? '!h-14' : 'h-72 lg:h-80'
          )}>
          {currentMetric === 'carbone' && (
            <div className={twMerge('relative !flex h-full flex-col')}>
              <SmallTotal metric="carbone" isVisible={isSticky} />
              <div className="h-full w-full px-4">
                <CarboneTotalChart isSmall={isSticky} />
              </div>
            </div>
          )}
          {currentMetric === 'eau' && (
            <div className={twMerge('relative !flex h-full flex-col')}>
              <SmallTotal metric="eau" isVisible={isSticky} />
              <WaterTotalChart isSmall={isSticky} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
