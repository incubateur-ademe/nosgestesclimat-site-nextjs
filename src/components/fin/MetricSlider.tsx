'use client'

import { carboneMetric, eauMetric } from '@/constants/model/metric'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Trans from '../translation/trans/TransClient'
import CarboneTotalChart from './metricSlider/CarboneTotalChart'
import MetricCard from './metricSlider/MetricCard'
import WaterTotalChart from './metricSlider/WaterTotalChart'

type Props = {
  carboneTotal?: number
  waterTotal?: number
  isStatic?: boolean
  isSharePage?: boolean
}
export default function MetricSlider({
  carboneTotal,
  waterTotal,
  isStatic,
  isSharePage,
}: Props) {
  const [isSticky, setIsSticky] = useState(false)

  const { currentMetric } = useCurrentMetric()

  const { t } = useClientTranslation()

  const myElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isStatic) {
      return
    }

    const handleStickyness = () => {
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

    window.addEventListener('scroll', handleStickyness)

    return () => {
      window.removeEventListener('scroll', handleStickyness)
    }
  }, [isStatic])

  return (
    <div
      className={twMerge(
        isStatic
          ? ''
          : 'pointer-events-none sticky top-0 z-40 -mx-4 mb-4 md:mx-0 md:h-96'
      )}
      ref={myElementRef}>
      <div
        className={twMerge(
          'relative mx-auto -mt-0.5 flex w-full gap-0 overflow-hidden px-0 transition-all duration-300',
          isSticky
            ? 'mt-2 h-28 overflow-hidden lg:h-32'
            : 'h-28 md:h-72 lg:h-80'
        )}>
        <MetricCard
          isSharePage={isSharePage}
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
          isSharePage={isSharePage}
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
      {!isSharePage && (
        <p
          className={twMerge(
            'text-default mt-2 inline-block w-full text-center text-xs transition-opacity duration-300 md:text-sm',
            isSticky ? 'opacity-0' : ''
          )}>
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
