'use client'

import ButtonLink from '@/design-system/buttons/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useCurrentSimulation } from '@/publicodes-state'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import RestartIcon from '../icons/RestartIcon'
import Trans from '../translation/trans/TransClient'

export default function DynamicCTAButtons({
  className,
  trackingEvents,
  withRestart = true,
}: {
  className?: string
  trackingEvents: {
    start: () => void
    resume: () => void
    results: () => void
    restart?: () => void
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
              trackingEvents.results()
              return
            }

            if (progression > 0) {
              trackingEvents.resume()
              return
            }

            trackingEvents.start()
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
            onClick={() => {
              const restart = trackingEvents.restart
              if (restart) {
                restart()
              }
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
