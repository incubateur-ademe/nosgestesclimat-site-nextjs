'use client'

import TransClient from '@/components/translation/TransClient'
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
  console.log(tutorials)
  return (
    <ButtonLink
      href={tutorials.testIntro ? '/simulateur/bilan' : 'tutoriel'}
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
        <TransClient>Reprendre mon test</TransClient>
      ) : (
        <TransClient>Faire le test</TransClient>
      )}
    </ButtonLink>
  )
}
