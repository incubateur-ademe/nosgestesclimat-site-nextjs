'use client'
import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import RestartIcon from '../icons/RestartIcon'
import Trans from '../translation/trans/TransClient'
import CTAButtonsPlaceholder from './CTAButtonsPlaceholder'

export default function ClientCTAButtons({
  className,
  trackingEvents,
  withRestart = true,
  isAuthenticated,
}: {
  className?: string
  trackingEvents: {
    start: string[]
    resume: string[]
    results: string[]
    restart?: string[]
  }
  withRestart?: boolean
  isAuthenticated: boolean
}) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  const { t } = useClientTranslation()

  const { progression } = useCurrentSimulation()
  const { simulations, initSimulation } = useUser()

  const [isHover, setIsHover] = useState(false)

  const userIsAuthenticatedAndHasMultipleSimulations =
    isAuthenticated && simulations.length > 1

  const showBothButtons =
    withRestart &&
    // Progression 1 > not authenticated user
    (progression === 1 || userIsAuthenticatedAndHasMultipleSimulations)

  const mainButtonLabel = useMemo(() => {
    if (userIsAuthenticatedAndHasMultipleSimulations) {
      return t('Voir mes résultats')
    }
    return linkToSimulateurPageLabel
  }, [
    userIsAuthenticatedAndHasMultipleSimulations,
    linkToSimulateurPageLabel,
    t,
  ])

  const mainButtonHref = useMemo(() => {
    if (
      userIsAuthenticatedAndHasMultipleSimulations ||
      (isAuthenticated && progression === 1)
    ) {
      return MON_ESPACE_PATH
    }

    return getLinkToSimulateurPage()
  }, [
    userIsAuthenticatedAndHasMultipleSimulations,
    progression,
    getLinkToSimulateurPage,
    isAuthenticated,
  ])

  if (!isHydrated) {
    return <CTAButtonsPlaceholder className={className} />
  }

  const handleMainButtonClick = () => {
    if (progression === 1 || userIsAuthenticatedAndHasMultipleSimulations) {
      trackEvent(trackingEvents?.results)
      return
    }

    if (progression > 0) {
      trackEvent(trackingEvents?.resume)
      return
    }

    trackEvent(trackingEvents?.start)
  }

  const handleRestartClick = () => {
    if (progression === 1) {
      initSimulation()
    }
  }

  const ContainerTag = showBothButtons ? 'ul' : 'div'
  const MainButtonContainerTag = showBothButtons ? 'li' : 'div'

  return (
    <ContainerTag className="flex flex-col flex-wrap items-center justify-center gap-2 md:items-start lg:flex-row lg:flex-nowrap">
      <MainButtonContainerTag>
        <ButtonLink
          size="xl"
          className={twMerge(
            'hover:bg-primary-900 transition-all duration-300',
            className
          )}
          href={mainButtonHref}
          data-testid="do-the-test-link"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={handleMainButtonClick}>
          <span
            className={twMerge(
              isHover
                ? 'bg-rainbow animate-rainbow-fast bg-clip-text! text-transparent! duration-1000 motion-reduce:animate-none'
                : '',
              'leading-none'
            )}>
            <Trans>{mainButtonLabel}</Trans>
          </span>
        </ButtonLink>
      </MainButtonContainerTag>

      {showBothButtons && (
        <li>
          <ButtonLink
            size="xl"
            color="secondary"
            className="leading-none"
            trackingEvent={
              progression !== 1
                ? trackingEvents?.resume
                : trackingEvents?.restart
            }
            onClick={handleRestartClick}
            href={getLinkToSimulateurPage({
              newSimulation: progression === 1,
            })}>
            {progression !== 1 ? (
              <Trans>Reprendre mon test</Trans>
            ) : (
              <>
                <RestartIcon className="fill-primary-700 mr-2" />
                <Trans>Recommencer</Trans>
              </>
            )}
          </ButtonLink>
        </li>
      )}
    </ContainerTag>
  )
}
