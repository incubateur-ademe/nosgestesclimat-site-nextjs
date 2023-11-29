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

export default function Buttons() {
  const { tutorials, getCurrentSimulation, initSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const isSimulationStarted = currentSimulation?.foldedSteps?.length

  return (
    <>
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
          className="md:text-lg"
          onClick={() => {
            trackEvent(matomoEventParcoursTestNouveau)
            initSimulation()
          }}
          href={tutorials.testIntro ? '/simulateur/bilan' : '/tutoriel'}>
          <Trans>Commencer un nouveau test</Trans>
        </Link>
      ) : (
        <Link className="md:text-lg" href="/documentation">
          <Trans>Notre méthode</Trans>
        </Link>
      )}
    </>
  )
}
