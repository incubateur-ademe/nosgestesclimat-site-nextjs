import InfoTooltipIcon from '@/app/(simulation)/(large-layout)/organisations/[orgaSlug]/campagnes/[pollSlug]/_components/pollStatisticsFilters/InfoTooltipIcon'
import { carboneMetric, eauMetric } from '@/constants/metric'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Trans from '../translation/Trans'
import CarboneTotalChart from './metricSlider/CarboneTotalChart'
import MetricCard from './metricSlider/MetricCard'
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
  const [isSticky, setIsSticky] = useState(false)

  const myElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isStatic) {
      return
    }

    const handleScroll = () => {
      if (myElementRef.current) {
        const { top } = myElementRef.current.getBoundingClientRect()
        // We need a value > 0 because of an iOS issue
        if (top <= 10) {
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
      className={twMerge(
        isStatic ? '' : 'pointer-events-none sticky top-2 z-40 mb-4 h-96'
      )}
      ref={myElementRef}>
      <div
        className={twMerge(
          'relative mx-auto -mt-0.5 flex w-full overflow-hidden px-0 transition-all duration-300',
          isSticky ? 'mt-2 h-20 overflow-hidden lg:h-[6rem]' : 'h-72 lg:h-80'
        )}>
        <MetricCard
          metric={carboneMetric}
          metricTitle={<Trans>Mon empreinte carbone</Trans>}
          isSticky={isSticky}>
          <div className="w-full flex-1 px-4">
            <CarboneTotalChart isSmall={isSticky} total={carboneTotal} />
          </div>
        </MetricCard>

        <MetricCard
          metric={eauMetric}
          metricTitle={<Trans>Mon empreinte eau</Trans>}
          isSticky={isSticky}>
          <WaterTotalChart isSmall={isSticky} total={waterTotal} />
        </MetricCard>
      </div>

      {!isSticky && (
        <p className="mt-2 flex items-center justify-center gap-2 text-center text-sm text-default">
          <InfoTooltipIcon className="inline-block" />
          <Trans>
            Affichez le détail de votre bilan carbone et eau en cliquant sur les
            cartes ci-dessus
          </Trans>
        </p>
      )}
    </div>
  )
}
