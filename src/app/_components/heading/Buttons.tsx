'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import {
  matomoEventParcoursTestNouveau,
  matomoEventParcoursTestReprendre,
  matomoEventParcoursTestStart,
} from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useIsClient } from '@/hooks/useIsClient'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function Buttons() {
  const { tutorials, getCurrentSimulation, initSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const isSimulationStarted = currentSimulation?.foldedSteps?.length

  const isClient = useIsClient()
  return (
    <div className="relative">
      <ButtonLink
        className={`transition-opacity duration-500 ${
          isClient ? 'opacity-100' : 'opacity-0'
        }`}
        href={tutorials.testIntro ? '/simulateur/bilan' : '/tutoriel'}
        data-cypress-id="do-the-test-link"
        onClick={() => {
          if (isSimulationStarted) {
            trackEvent(matomoEventParcoursTestReprendre)
            return
          }

          trackEvent(matomoEventParcoursTestStart)
        }}
        size="lg">
        {isSimulationStarted ? (
          <Trans>Reprendre mon test</Trans>
        ) : (
          <Trans>Passer le test →</Trans>
        )}
      </ButtonLink>
      {isSimulationStarted ? (
        <Link
          className={`absolute left-1/2 top-full -translate-x-1/2 translate-y-6 whitespace-nowrap transition-opacity delay-200 duration-1000 md:text-lg ${
            isClient ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => {
            trackEvent(matomoEventParcoursTestNouveau)
            initSimulation()
          }}
          href={tutorials.testIntro ? '/simulateur/bilan' : '/tutoriel'}>
          <Trans>Commencer un nouveau test</Trans>
        </Link>
      ) : null}
    </div>
  )
}
