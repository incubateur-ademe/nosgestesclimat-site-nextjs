'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useCheckIfUserHasAlreadyParticipated } from '@/hooks/organisations/useCheckIfUserHasAlreadyParticipated'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useUser } from '@/publicodes-state'

export default function ButtonStart() {
  const { hideTutorial, user } = useUser()
  const { getLinkToNextInfosPage } = useInfosPage()

  const { pollSlug } = useOrganisationQueryParams()

  const { data } = useCheckIfUserHasAlreadyParticipated({
    pollSlug: pollSlug ?? '',
    userId: user?.userId,
  })

  const { hasUserAlreadyParticipated } = data ?? {}

  if (hasUserAlreadyParticipated) return null

  return (
    <ButtonLink
      href={getLinkToNextInfosPage({ curPage: 'tutoriel' })}
      data-cypress-id="skip-tutorial-button"
      onClick={() => hideTutorial('testIntro')}>
      <Trans>C'est parti ! →</Trans>
    </ButtonLink>
  )
}
