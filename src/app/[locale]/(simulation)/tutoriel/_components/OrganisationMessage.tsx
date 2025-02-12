'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'

export default function OrganisationMessage() {
  const { data: poll } = useFetchPublicPoll()

  if (!poll || !poll.simulations.hasParticipated) return null

  return (
    <div className="flex flex-col items-end gap-2">
      <p className="mb-0 text-sm text-gray-500">
        <Trans>Vous avez déja participé à ce sondage.</Trans>
      </p>

      <ButtonLink
        href={`/organisations/${poll.organisation.slug}/campagnes/${poll.slug}`}>
        <Trans>Voir mes résultats</Trans>
      </ButtonLink>
    </div>
  )
}
