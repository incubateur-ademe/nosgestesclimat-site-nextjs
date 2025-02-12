'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useLocale } from '@/hooks/useLocale'
import { useCurrentSimulation } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import RestartIcon from '../icons/RestartIcon'
import Trans from '../translation/Trans'

export default function DynamicCTAButtons({
  className,
  trackingEvents,
  withRestart = true,
}: {
  className?: string
  trackingEvents: {
    start: string[]
    resume: string[]
    results: string[]
    restart?: string[]
  }
  withRestart?: boolean
}) {
  const { progression } = useCurrentSimulation()

  const locale = useLocale()

  const {
    getLinkToSimulateurPage,
    linkToSimulateurPageLabel,
    goToSimulateurPage,
  } = useSimulateurPage()

  const [isHover, setIsHover] = useState(false)

  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-2 md:items-start lg:flex-row lg:flex-nowrap">
      <ButtonLink
        size="xl"
        className={twMerge(
          'hover:bg-primary-900 transition-all duration-300',
          className
        )}
        href={getLinkToSimulateurPage()}
        data-cypress-id="do-the-test-link"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          if (progression === 1) {
            trackEvent(trackingEvents?.results)
            return
          }

          if (progression > 0) {
            trackEvent(trackingEvents?.resume)
            return
          }

          trackEvent(trackingEvents?.start)
        }}>
        <span
          className={twMerge(
            isHover
              ? 'bg-rainbow animate-rainbow-fast bg-clip-text! text-transparent! duration-1000'
              : '',
            'leading-none'
          )}>
          <Trans locale={locale}>{linkToSimulateurPageLabel}</Trans>
        </span>
      </ButtonLink>

      {withRestart && progression > 0 && (
        <ButtonLink
          size="lg"
          color="text"
          trackingEvent={trackingEvents?.restart}
          onClick={() => {
            goToSimulateurPage({ noNavigation: true, newSimulation: {} })
          }}
          href={getLinkToSimulateurPage({ newSimulation: true })}>
          <RestartIcon className="fill-primary-700 mr-2" />

          <Trans locale={locale}>Recommencer</Trans>
        </ButtonLink>
      )}
    </div>
  )
}
