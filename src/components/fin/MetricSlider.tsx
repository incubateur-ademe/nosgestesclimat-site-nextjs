import { carboneMetric, eauMetric } from '@/constants/metric'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
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

  const { currentMetric } = useCurrentMetric()

  const { t } = useClientTranslation()

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
        isStatic ? '' : 'pointer-events-none sticky top-2 z-40 mb-4 md:h-96'
      )}
      ref={myElementRef}>
      <div
        className={twMerge(
          'relative mx-auto -mt-0.5 flex w-full gap-2 overflow-hidden px-0 transition-all duration-300 md:gap-4',
          isSticky
            ? 'mt-2 h-28 overflow-hidden lg:h-32'
            : 'h-28 md:h-72 lg:h-80'
        )}>
        <MetricCard
          metric={carboneMetric}
          metricTitle={{
            desktop: <Trans>Mon empreinte carbone</Trans>,
            mobile: <Trans>Empreinte carbone</Trans>,
          }}
          isSticky={isSticky}
          aria-label={
            currentMetric === carboneMetric
              ? t('Empreinte carbone, sélectionné, voir le détail ci-dessous')
              : t('Empreinte carbone, voir le détail ci-dessous')
          }>
          <div className="w-full flex-1 px-4">
            <CarboneTotalChart isSmall={isSticky} total={carboneTotal} />
          </div>
        </MetricCard>

        <MetricCard
          metric={eauMetric}
          metricTitle={{
            desktop: <Trans>Mon empreinte eau</Trans>,
            mobile: <Trans>Empreinte eau</Trans>,
          }}
          isSticky={isSticky}
          aria-label={
            currentMetric === eauMetric
              ? t('Empreinte eau, sélectionné, voir le détail ci-dessous')
              : t('Empreinte eau, voir le détail ci-dessous')
          }>
          <WaterTotalChart isSmall={isSticky} total={waterTotal} />
        </MetricCard>
      </div>

      {!isSticky && (
        <p className="mt-2 inline-block w-full text-center text-xs text-default md:text-sm">
          <Emoji>💡</Emoji>{' '}
          <Trans>
            Affichez le détail de votre empreinte carbone ou eau en cliquant sur
            les cartes ci-dessus.
          </Trans>
        </p>
      )}
    </div>
  )
}
