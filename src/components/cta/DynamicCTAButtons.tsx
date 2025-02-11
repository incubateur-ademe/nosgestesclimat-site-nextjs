'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getCTAButtonLabel } from '@/helpers/ctaButton/getCTAButtonLabel'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIsClient } from '@/hooks/useIsClient'
import { getProgression } from '@/services/localstorage/ngc.service'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useState } from 'react'
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
  const isClient = useIsClient()

  const { t } = useClientTranslation()

  const { getLinkToSimulateurPage, goToSimulateurPage } = useSimulateurPage()

  // Use the progression from the local storage as component isn't always in the right context
  const progression = getProgression()

  const [isHover, setIsHover] = useState(false)

  // Hack to force Client side rendering
  const [label, setLabel] = useState(t('Passer le test'))

  useEffect(() => {
    setLabel(getCTAButtonLabel({ progression }))
  }, [progression])

  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-2 md:items-start lg:flex-row lg:flex-nowrap">
      <ButtonLink
        size="xl"
        className={twMerge(
          'transition-all duration-300 hover:bg-primary-900',
          isClient ? 'opacity-100' : 'opacity-0',
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
              ? 'bg-rainbow animate-rainbow-fast !bg-clip-text !text-transparent duration-1000'
              : '',
            'leading-none'
          )}>
          <Trans>{label}</Trans>
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
          <RestartIcon className="mr-2 fill-primary-700" />

          <Trans>Recommencer</Trans>
        </ButtonLink>
      )}
    </div>
  )
}
