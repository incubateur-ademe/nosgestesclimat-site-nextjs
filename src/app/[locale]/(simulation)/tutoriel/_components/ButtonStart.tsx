'use client'

import Trans from '@/components/translation/Trans'
import { tutorielClickSuivant } from '@/constants/tracking/pages/tutoriel'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useMemo } from 'react'
import { useFetchPublicPoll } from '../../../../hooks/organisations/polls/useFetchPublicPoll'

export default function ButtonStart() {
  const { hideTutorial } = useUser()
  const { getLinkToNextInfosPage } = useInfosPage()

  const { data: poll } = useFetchPublicPoll()

  const startTime = useMemo(() => Date.now(), [])

  if (poll?.simulations.hasParticipated) return null

  return (
    <ButtonLink
      href={getLinkToNextInfosPage({ curPage: 'tutoriel' })}
      data-cypress-id="skip-tutorial-button"
      onClick={() => {
        hideTutorial('testIntro')

        const endTime = Date.now()
        const timeSpentOnPage = endTime - startTime
        trackEvent(tutorielClickSuivant(timeSpentOnPage))
      }}>
      <Trans>C'est parti ! →</Trans>
    </ButtonLink>
  )
}
