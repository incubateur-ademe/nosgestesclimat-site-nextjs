'use client'

import { usePolls } from '@/hooks/organisations/usePolls'
import { useUser } from '@/publicodes-state'
import { useMemo } from 'react'

export default function PollsList() {
  const { simulations } = useUser()

  const pollsSlug = useMemo(
    () =>
      simulations
        .filter((simulation) => simulation.poll)
        .map((simulation) => simulation.poll),
    [simulations]
  )
  const { data: polls } = usePolls({ pollsSlug })

  console.log(polls)
  return <p>coucou</p>
}
