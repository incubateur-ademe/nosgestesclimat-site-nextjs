'use client'

import { usePolls } from '@/hooks/organisations/usePolls'
import { useUser } from '@/publicodes-state'
import { useMemo } from 'react'
import PollItem from './pollList/PollItem'

export default function PollsList() {
  const { simulations } = useUser()

  const pollSlugs = useMemo(
    () =>
      simulations
        .filter((simulation) => simulation.poll)
        .map((simulation) => simulation.poll),
    [simulations]
  )
  const { data: polls } = usePolls({ pollSlugs })

  if (!polls) {
    return
  }

  return (
    <div className="mb-8 flex flex-col gap-3">
      {polls.map((poll) => (
        <PollItem key={poll.slug} poll={poll} />
      ))}
    </div>
  )
}
