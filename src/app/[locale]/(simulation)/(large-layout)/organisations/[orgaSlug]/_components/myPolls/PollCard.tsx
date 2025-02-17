'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
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

  return (
    <div className="bg-primary-50 h-full rounded-xl p-6">
      <h3 className="mb-2 text-xl">
        {poll.name ?? (
          <>
            <span className="mr-3 text-gray-600 italic">
              <Trans locale={locale}>Sans titre</Trans>
            </span>
          </>
        )}
      </h3>

      <p className="mb-8 text-sm font-light">
        <Trans locale={locale}>Créée le </Trans>
        {dayjs(poll.createdAt).format('DD/MM/YYYY')}
      </p>

      <div className="mb-12">
        <p className="text-primary-700 mb-0 text-xl font-bold">
          {poll.simulations.finished}{' '}
        </p>

        <p className="text-default text-base font-light">
          {poll.simulations.finished > 1 ? (
            <Trans locale={locale}>Simulations terminées</Trans>
          ) : (
            <Trans locale={locale}>Simulation terminée</Trans>
          )}
        </p>
      </div>

      <ButtonLink
        className="w-full"
        href={`/organisations/${orgaSlug}/campagnes/${poll?.slug}`}>
        <Trans locale={locale}>Voir le détail</Trans>
      </ButtonLink>
    </div>
  )
}
