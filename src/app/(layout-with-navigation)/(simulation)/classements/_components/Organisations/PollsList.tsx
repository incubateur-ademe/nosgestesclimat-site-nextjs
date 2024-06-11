'use client'

import Trans from '@/components/translation/Trans'
import { usePolls } from '@/hooks/organisations/usePolls'
import { useUser } from '@/publicodes-state'
import { Organisation } from '@/types/organisations'
import { useMemo } from 'react'
import OrganisationItem from './pollList/OrganisationItem'
import PollItem from './pollList/PollItem'

type Props = {
  organisation?: Organisation
}

export default function PollsList({ organisation }: Props) {
  const { simulations } = useUser()

  const pollSlugs = useMemo(
    () =>
      simulations
        .filter((simulation) => simulation.polls)
        .map((simulation) => simulation.polls)
        .flat(),
    [simulations]
  )
  const { data: polls } = usePolls({ pollSlugs })

  return (
    <div className="mb-8 flex flex-col gap-3">
      {organisation && (
        <>
          <h3 className="mb-0 text-base">
            <Trans>Mon organisation</Trans>
          </h3>
          <OrganisationItem organisation={organisation} />
        </>
      )}

      {polls && polls.length > 0 && (
        <>
          <h3 className="mb-0 text-base">
            <Trans>Mes campagnes</Trans>
          </h3>

          {polls?.map((poll) => <PollItem key={poll.slug} poll={poll} />)}
        </>
      )}
    </div>
  )
}
