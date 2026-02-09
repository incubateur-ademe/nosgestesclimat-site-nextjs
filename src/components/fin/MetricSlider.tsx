'use client'

import { carboneMetric, eauMetric } from '@/constants/model/metric'
import { trackEndClickFootprint } from '@/constants/tracking/pages/end'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Trans from '../translation/trans/TransClient'
import CarboneTotalChart from './metricSlider/CarboneTotalChart'
import MetricCard from './metricSlider/MetricCard'
import WaterTotalChart from './metricSlider/WaterTotalChart'

interface Props {
  carboneTotal?: number
  waterTotal?: number
  isStatic?: boolean
  isSharePage?: boolean
  className?: string
}
export default function MetricSlider({
  carboneTotal,
  waterTotal,
  isStatic,
  isSharePage,
  className,
}: Props) {
  const [isSticky, setIsSticky] = useState(false)

  const { t } = useClientTranslation()

  const { currentMetric, setCurrentMetric } = useCurrentMetric()

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

  useEffect(() => {
    const metricString =
      currentMetric === carboneMetric
        ? t('common.metric.carbon', 'carbone')
        : t('common.metric.water', 'eau')

    document.title = t(
      'endpage.title.custom',
      'Mes empreintes carbone et eau, empreinte {{metric}} sélectionnée - Nos Gestes Climat',
      {
        metric: metricString,
      }
    )
  }, [t, currentMetric])

  return (
    <div
      className={twMerge(
        isStatic
          ? ''
          : 'pointer-events-none sticky top-0 z-40 -mx-4 mb-4 md:mx-0 md:h-96',
        className
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
        aria-orientation="horizontal"
        tabIndex={0}
        aria-label={t('common.metric.choice', 'Choix de la métrique')}
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

            trackEndClickFootprint(nextMetric)

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
          isSharePage={isSharePage}
          metric={carboneMetric}
          metricTitle={{
            desktop: t(
              'results.metricSlider.carbon.desktop.title',
              'Mon empreinte carbone'
            ),
            mobile: t(
              'results.metricSlider.carbon.desktop.mobile',
              'Empreinte carbone'
            ),
          }}
          isSticky={isSticky}
          tabId="tab-metric-carbone"
          panelId="panel-metric-carbone"
          onKeyDown={() => {
            // Let the tablist parent handle the keydown
          }}>
          <div className="w-full flex-1 px-4">
            <CarboneTotalChart isSmall={isSticky} total={carboneTotal} />
          </div>
        </MetricCard>

        <MetricCard
          isSharePage={isSharePage}
          metric={eauMetric}
          metricTitle={{
            desktop: t(
              'results.metricSlider.water.desktop.title',
              'Mon empreinte eau'
            ),
            mobile: t(
              'results.metricSlider.water.desktop.mobile',
              'Empreinte eau'
            ),
          }}
          isSticky={isSticky}
          tabId="tab-metric-eau"
          panelId="panel-metric-eau"
          onKeyDown={() => {
            // Let the tablist parent handle the keydown
          }}>
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
