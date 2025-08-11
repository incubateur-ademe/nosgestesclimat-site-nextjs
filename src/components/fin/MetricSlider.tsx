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

type Props = { carboneTotal?: number; waterTotal?: number; isStatic?: boolean }
export default function MetricSlider({
  carboneTotal,
  waterTotal,
  isStatic,
}: Props) {
  const [isSticky, setIsSticky] = useState(false)

  const { currentMetric, setCurrentMetric } = useCurrentMetric()

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
          'relative mx-auto -mt-0.5 flex w-full gap-0 px-0 transition-all duration-300',
          isSticky
            ? 'mt-2 h-28 overflow-hidden lg:h-32'
            : 'h-28 md:h-72 lg:h-80'
        )}
        role="tablist"
        aria-label={t('Choix de la métrique') as string}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          const left = 'ArrowLeft'
          const right = 'ArrowRight'
          const home = 'Home'
          const end = 'End'
          const keys = [left, right, home, end]
          if (!keys.includes(e.key)) return

          e.preventDefault()
          const order = [carboneMetric, eauMetric]
          const currentIndex = order.indexOf(currentMetric)
          let nextIndex = currentIndex
          if (e.key === right) nextIndex = (currentIndex + 1) % order.length
          if (e.key === left)
            nextIndex = (currentIndex - 1 + order.length) % order.length
          if (e.key === home) nextIndex = 0
          if (e.key === end) nextIndex = order.length - 1

          const nextMetric = order[nextIndex]
          if (nextMetric !== currentMetric) {
            setCurrentMetric(nextMetric)
            const nextTabId =
              nextMetric === carboneMetric
                ? 'tab-metric-carbone'
                : 'tab-metric-eau'
            requestAnimationFrame(() => {
              const el = document.getElementById(nextTabId)
              el?.focus()
            })

            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        }}>
        <MetricCard
          metric={carboneMetric}
          metricTitle={{
            desktop: <Trans>Mon empreinte carbone</Trans>,
            mobile: <Trans>Empreinte carbone</Trans>,
          }}
          isSticky={isSticky}
          tabId="tab-metric-carbone"
          panelId="panel-metric-carbone"
          onKeyDown={(e: React.KeyboardEvent) => {
            // déléguer au tablist parent
          }}>
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
          tabId="tab-metric-eau"
          panelId="panel-metric-eau"
          onKeyDown={(e: React.KeyboardEvent) => {
            // déléguer au tablist parent
          }}>
          <WaterTotalChart isSmall={isSticky} total={waterTotal} />
        </MetricCard>
      </div>

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
    </div>
  )
}
