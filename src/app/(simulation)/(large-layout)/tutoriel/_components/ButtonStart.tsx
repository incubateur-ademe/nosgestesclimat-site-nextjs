'use client'

import Trans from '@/components/translation/Trans'
import { tutorielClickSuivant } from '@/constants/tracking/pages/tutoriel'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useCheckIfUserHasAlreadyParticipated } from '@/hooks/organisations/useCheckIfUserHasAlreadyParticipated'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useMemo } from 'react'

export default function ButtonStart() {
  const { hideTutorial, user } = useUser()
  const { getLinkToNextInfosPage } = useInfosPage()

  const { pollSlug } = useOrganisationQueryParams()

  const { data } = useCheckIfUserHasAlreadyParticipated({
    pollSlug: pollSlug ?? '',
    userId: user?.userId,
  })

  const startTime = useMemo(() => Date.now(), [])

  const { hasUserAlreadyParticipated } = data ?? {}

  if (hasUserAlreadyParticipated) return null

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
