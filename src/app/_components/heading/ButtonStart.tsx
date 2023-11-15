'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import {
  matomoEventParcoursTestNouveau,
  matomoEventParcoursTestReprendre,
  matomoEventParcoursTestStart,
} from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function ButtonStart() {
  const { tutorials, getCurrentSimulation, initSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const isSimulationStarted = currentSimulation?.foldedSteps?.length

  return (
    <div className="relative flex flex-col gap-6">
      <ButtonLink
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
          className="whitespace-nowrap md:absolute md:left-1/2 md:top-[125%] md:-translate-x-1/2 md:text-lg"
          onClick={() => {
            trackEvent(matomoEventParcoursTestNouveau)
            initSimulation()
          }}
          href={tutorials.testIntro ? '/simulateur/bilan' : '/tutoriel'}>
          Commencer un nouveau test
        </Link>
      ) : (
        ''
      )}
    </div>
  )
}
