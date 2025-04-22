'use client'

import Trans from '@/components/translation/trans/TransClient'
import { tutorielClickSuivant } from '@/constants/tracking/pages/tutoriel'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Loader from '@/design-system/layout/Loader'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useMemo } from 'react'

export default function ButtonStart() {
  const { hideTutorial } = useUser()
  const { getLinkToNextInfosPage, poll, isLoadingPoll } = useInfosPage()

  const startTime = useMemo(() => Date.now(), [])

  if (poll?.simulations.hasParticipated) return null

  return (
    <ButtonLink
      href={getLinkToNextInfosPage({ curPage: 'tutoriel' })}
      data-cypress-id="skip-tutorial-button"
      aria-disabled={isLoadingPoll}
      className="min-w-[167px]!"
      onClick={() => {
        if (isLoadingPoll) {
          return
        }

        hideTutorial('testIntro')

        const endTime = Date.now()
        const timeSpentOnPage = endTime - startTime
        trackEvent(tutorielClickSuivant(timeSpentOnPage))
      }}>
      {isLoadingPoll ? <Loader size="sm" /> : <Trans>C'est parti ! →</Trans>}
    </ButtonLink>
  )
}
