'use client'
import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import RestartIcon from '../icons/RestartIcon'
import Trans from '../translation/trans/TransClient'
import CTAButtonsPlaceholder from './CTAButtonsPlaceholder'

export default function ClientCTAButtons({
  className,
  withRestart = true,
  isAuthenticated,
}: {
  className?: string
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
          data-track>
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
            onClick={handleRestartClick}
            data-track
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
