'use client'

import Trans from '@/components/translation/Trans'
import {
  matomoEventParcoursTestReprendre,
  matomoEventParcoursTestStart,
} from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function TakeTestLink() {
  const { tutorials, currentSimulationId } = useUser()

  return (
    <ButtonLink
      href={tutorials.testIntro ? '/simulateur/bilan' : '/tutoriel'}
      data-cypress-id="do-the-test-link"
      onClick={() => {
        if (currentSimulationId) {
          trackEvent(matomoEventParcoursTestReprendre)
          return
        }

        trackEvent(matomoEventParcoursTestStart)
      }}
      size="lg"
      className="px-12 ">
      <ProgressCircle progress={0} white className="mr-2" />

      {currentSimulationId ? (
        <Trans>Reprendre mon test</Trans>
      ) : (
        <Trans>Faire le test</Trans>
      )}
    </ButtonLink>
  )
}
