'use client'

import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import type { UserServer } from '@/helpers/server/model/user'
import { fetchUser } from '@/helpers/user/fetchUser'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
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
    start: string[]
    resume: string[]
    results: string[]
    restart?: string[]
  }
  withRestart?: boolean
}) {
  const {
    getLinkToSimulateurPage,
    goToSimulateurPage,
    linkToSimulateurPageLabel,
  } = useSimulateurPage()

  const { t } = useClientTranslation()

  const { data: authenticatedUser } = useQuery<UserServer>({
    queryKey: ['user', 'me'],
    queryFn: () => fetchUser(),
  })

  const { progression } = useCurrentSimulation()
  const { simulations } = useUser()

  const [isHover, setIsHover] = useState(false)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true)
  }, [])

  const userIsAuthenticatedAndHasMultipleSimulations =
    !!authenticatedUser && simulations.length > 1

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
      (!!authenticatedUser && progression === 1)
    ) {
      return MON_ESPACE_PATH
    }

    return getLinkToSimulateurPage()
  }, [
    userIsAuthenticatedAndHasMultipleSimulations,
    progression,
    getLinkToSimulateurPage,
    authenticatedUser,
  ])

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
    // Do not create a new simulation if there's an unfinished one
    if (progression !== 1) {
      goToSimulateurPage({ newSimulation: undefined, noNavigation: true })
      return
    }
    goToSimulateurPage({ noNavigation: true, newSimulation: {} })
  }

  const ContainerTag = showBothButtons ? 'ul' : 'div'
  const MainButtonContainerTag = showBothButtons ? 'li' : 'div'

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
          href={mainButtonHref}
          data-cypress-id="do-the-test-link"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={handleMainButtonClick}>
          <span
            className={twMerge(
              isHover
                ? 'bg-rainbow animate-rainbow-fast bg-clip-text! text-transparent! duration-1000'
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
