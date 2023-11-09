'use client'

import Trans from '@/components/translation/Trans'
import {
  matomoEventParcoursTestReprendre,
  matomoEventParcoursTestStart,
} from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function ButtonStart() {
  const { tutorials, getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const isSimulationStarted = currentSimulation?.foldedSteps?.length

  return (
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
  )
}
