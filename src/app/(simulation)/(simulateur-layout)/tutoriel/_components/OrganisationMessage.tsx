'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useCheckIfUserHasAlreadyParticipated } from '@/hooks/organisations/useCheckIfUserHasAlreadyParticipated'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useUser } from '@/publicodes-state'

export default function OrganisationMessage() {
  const { user } = useUser()
  const { pollSlug } = useOrganisationQueryParams()

  const { data } = useCheckIfUserHasAlreadyParticipated({
    pollSlug: pollSlug ?? '',
    userId: user?.userId,
  })

  const { hasUserAlreadyParticipated, organisationSlug } = data ?? {}

  if (!hasUserAlreadyParticipated) return null

  return (
    <div className="flex flex-col items-end gap-2">
      <p className="mb-0 text-sm text-gray-500">
        <Trans>Vous avez déja participé à ce sondage.</Trans>
      </p>

      <ButtonLink
        href={`/organisations/${organisationSlug}/resultats-detailles`}>
        <Trans>Voir mes résultats</Trans>
      </ButtonLink>
    </div>
  )
}
