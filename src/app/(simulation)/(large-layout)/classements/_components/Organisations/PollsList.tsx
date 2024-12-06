'use client'

import Trans from '@/components/translation/Trans'
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
            <Trans>Mon organisation</Trans>
          </h3>
          <OrganisationItem organisation={organisation} />
        </>
      )}

      {!!organisation && !!polls?.length && (
        <>
          <h3 className="mb-0 text-base">
            <Trans>Mes campagnes</Trans>
          </h3>

          {polls?.map((poll) => (
            <PollItem key={poll.slug} organisation={organisation} poll={poll} />
          ))}
        </>
      )}
    </div>
  )
}
