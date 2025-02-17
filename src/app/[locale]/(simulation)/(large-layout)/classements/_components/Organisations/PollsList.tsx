'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { useFetchPolls } from '@/hooks/organisations/polls/useFetchPolls'
import type { Organisation } from '@/types/organisations'
import OrganisationItem from './pollList/OrganisationItem'
import PollItem from './pollList/PollItem'

type Props = {
  organisations?: Organisation[]
}

export default function PollsList({ organisations }: Props) {
  const { data: polls } = useFetchPolls({ enabled: !!organisations })

  const [organisation] = organisations || []

  return (
    <div className="mb-8 flex flex-col gap-3">
      {!!organisation && (
        <>
          <h3 className="mb-0 text-base">
            <TransClient>Mon organisation</TransClient>
          </h3>
          <OrganisationItem organisation={organisation} />
        </>
      )}

      {!!organisation && !!polls?.length && (
        <>
          <h3 className="mb-0 text-base">
            <TransClient>Mes campagnes</TransClient>
          </h3>

          {polls?.map((poll) => (
            <PollItem key={poll.slug} organisation={organisation} poll={poll} />
          ))}
        </>
      )}
    </div>
  )
}
