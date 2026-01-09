'use client'

import ButtonLink from '@/design-system/buttons/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useCurrentSimulation } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import RestartIcon from '../icons/RestartIcon'
import Trans from '../translation/trans/TransClient'

export default function DynamicCTAButtons({
  className,
  trackingEvents,
  posthogTrackingEvents,
  withRestart = true,
}: {
  className?: string
  trackingEvents: {
    start: string[]
    resume: string[]
    results: string[]
    restart?: string[]
  }
  posthogTrackingEvents?: {
    start?: {
      eventName: string
      properties?: Record<string, string | number | boolean | null | undefined>
    }
    resume?: {
      eventName: string
      properties?: Record<string, string | number | boolean | null | undefined>
    }
    results?: {
      eventName: string
      properties?: Record<string, string | number | boolean | null | undefined>
    }
    restart?: {
      eventName: string
      properties?: Record<string, string | number | boolean | null | undefined>
    }
  }
  withRestart?: boolean
}) {
  const {
    getLinkToSimulateurPage,
    goToSimulateurPage,
    linkToSimulateurPageLabel,
  } = useSimulateurPage()

  const { progression } = useCurrentSimulation()

  const [isHover, setIsHover] = useState(false)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const ContainerTag = withRestart && progression > 0 ? 'ul' : 'div'
  const MainButtonContainerTag = withRestart && progression > 0 ? 'li' : 'div'

  if (!isClient) {
    return null
  }

  return (
    <ContainerTag className="flex flex-col flex-wrap items-center justify-center gap-2 md:items-start lg:flex-row lg:flex-nowrap">
      <MainButtonContainerTag>
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
              if (posthogTrackingEvents?.results) {
                trackPosthogEvent(posthogTrackingEvents.results)
              }
              return
            }

            if (progression > 0) {
              trackEvent(trackingEvents?.resume)
              if (posthogTrackingEvents?.resume) {
                trackPosthogEvent(posthogTrackingEvents.resume)
              }
              return
            }

            trackEvent(trackingEvents?.start)
            if (posthogTrackingEvents?.start) {
              trackPosthogEvent(posthogTrackingEvents.start)
            }
          }}>
          <span
            className={twMerge(
              isHover
                ? 'bg-rainbow animate-rainbow-fast bg-clip-text! text-transparent! duration-1000'
                : '',
              'leading-none'
            )}>
            <Trans>{linkToSimulateurPageLabel}</Trans>
          </span>
        </ButtonLink>
      </MainButtonContainerTag>

      {withRestart && progression > 0 && (
        <li>
          <ButtonLink
            size="xl"
            color="secondary"
            className="leading-none"
            trackingEvent={trackingEvents?.restart}
            onClick={() => {
              goToSimulateurPage({ noNavigation: true, newSimulation: {} })
            }}
            href={getLinkToSimulateurPage({ newSimulation: true })}>
            <RestartIcon className="fill-primary-700 mr-2" />

            <Trans>Recommencer</Trans>
          </ButtonLink>
        </li>
      )}
    </ContainerTag>
  )
}
