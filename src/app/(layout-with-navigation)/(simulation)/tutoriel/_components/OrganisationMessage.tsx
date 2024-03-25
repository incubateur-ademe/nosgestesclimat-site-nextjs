'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { useCheckIfUserHasAlreadyParticipated } from '@/hooks/organisations/useCheckIfUserHasAlreadyParticipated'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useUser } from '@/publicodes-state'

export default function OrganisationMessage() {
  const { user } = useUser()
  const { pollSlug } = useOrganisationQueryParams()

  const {
    data: { hasUserAlreadyParticipated, organisationSlug },
  } = useCheckIfUserHasAlreadyParticipated({
    pollSlug: pollSlug ?? '',
    userId: user?.userId,
  })

  if (!hasUserAlreadyParticipated) return null

  return (
    <p>
      <Trans>Vous avez déja participé à ce sondage.</Trans>
      <Link href={`/organisations/${organisationSlug}/resultats-detailles`}>
        <Trans>Voir mes résultats</Trans>
      </Link>
    </p>
  )
}
