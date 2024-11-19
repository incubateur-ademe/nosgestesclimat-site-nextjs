import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { filterExtremes } from '@/helpers/organisations/filterExtremes'
import type { OrganisationPoll } from '@/types/organisations'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'

type Props = {
  poll: OrganisationPoll
  index: number
}

export default function PollCard({ poll }: Props) {
  const { orgaSlug } = useParams()

  if (!poll) return null

  const simulationsWithoutExtremes = filterExtremes(poll.simulations)

  return (
    <div className="rounded-xl bg-primary-50 p-6">
      <h3 className="mb-2 text-xl">
        {poll.name ?? (
          <>
            <span className="mr-3 italic text-gray-600">
              <Trans>Sans titre</Trans>
            </span>
          </>
        )}
      </h3>

      <p className="mb-8 text-sm font-light">
        <Trans>Créée le </Trans>
        {dayjs(poll.createdAt).format('DD/MM/YYYY')}
      </p>

      <div className="mb-12">
        <p className="mb-0 text-xl font-bold text-primary-700">
          {simulationsWithoutExtremes?.length}{' '}
        </p>

        <p className="text-base font-light text-default">
          {simulationsWithoutExtremes?.length > 1 ? (
            <Trans>Simulations terminées</Trans>
          ) : (
            <Trans>Simulation terminée</Trans>
          )}
        </p>
      </div>

      <ButtonLink
        className="w-full"
        href={`/organisations/${orgaSlug}/campagnes/${poll?.slug}`}>
        <Trans>Voir le détail</Trans>
      </ButtonLink>
    </div>
  )
}
