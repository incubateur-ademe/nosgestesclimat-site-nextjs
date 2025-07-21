'use client'

import Trans from '@/components/translation/trans/TransClient'
import { tutorielClickSuivant } from '@/constants/tracking/pages/tutoriel'
import { POLL_START_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Loader from '@/design-system/layout/Loader'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const TEST_INTRO_TUTO_KEY = 'testIntro'

export default function ButtonStart({ label }: { label?: React.ReactNode }) {
  const { hideTutorial, tutorials } = useUser()

  const searchParams = useSearchParams()?.toString()

  const { progression, updateCurrentSimulation, polls } = useCurrentSimulation()

  const { getLinkToSimulateurPage } = useSimulateurPage()

  // When component renders, user has seen the tutorial
  useEffect(() => {
    if (!tutorials[TEST_INTRO_TUTO_KEY]) {
      hideTutorial(TEST_INTRO_TUTO_KEY)
    }
  }, [hideTutorial, tutorials])

  const { data: poll, isLoading } = useFetchPublicPoll()

  useEffect(() => {
    if (poll && !polls?.includes(poll.slug)) {
      updateCurrentSimulation({ pollToAdd: poll.slug })
    }
  }, [poll, updateCurrentSimulation, polls])

  const startTime = useMemo(() => Date.now(), [])

  // Allow user to choose to keep his/her current
  const shouldRedirectToChoicePage = poll && progression === 1

  if (poll?.simulations.hasParticipated) return null

  return (
    <ButtonLink
      href={
        shouldRedirectToChoicePage
          ? `${POLL_START_PATH}?${searchParams}`
          : getLinkToSimulateurPage()
      }
      data-cypress-id="skip-tutorial-button"
      aria-disabled={isLoading}
      className="min-w-[167px]!"
      onClick={() => {
        if (isLoading) {
          return
        }

        const endTime = Date.now()
        const timeSpentOnPage = endTime - startTime
        trackEvent(tutorielClickSuivant(timeSpentOnPage))
      }}>
      {isLoading ? (
        <Loader size="sm" />
      ) : label ? (
        label
      ) : (
        <>
          <Trans>C'est parti !</Trans> <span aria-hidden="true">→</span>
        </>
      )}
    </ButtonLink>
  )
}
