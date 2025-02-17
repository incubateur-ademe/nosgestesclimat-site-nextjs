'use client'

import TransClient from '@/components/translation/trans/TransClient'
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
              <TransClient>Sans titre</TransClient>
            </span>
          </>
        )}
      </h3>

      <p className="mb-8 text-sm font-light">
        <TransClient>Créée le </TransClient>
        {dayjs(poll.createdAt).format('DD/MM/YYYY')}
      </p>

      <div className="mb-12">
        <p className="text-primary-700 mb-0 text-xl font-bold">
          {poll.simulations.finished}{' '}
        </p>

        <p className="text-default text-base font-light">
          {poll.simulations.finished > 1 ? (
            <TransClient>Simulations terminées</TransClient>
          ) : (
            <TransClient>Simulation terminée</TransClient>
          )}
        </p>
      </div>

      <ButtonLink
        className="w-full"
        href={`/organisations/${orgaSlug}/campagnes/${poll?.slug}`}>
        <TransClient>Voir le détail</TransClient>
      </ButtonLink>
    </div>
  )
}
