'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import { useAppNavigation } from '@/hooks/navigation/useAppNavigation'
import { usePoll } from '@/hooks/organisations/usePoll'
import { useUser } from '@/publicodes-state'

export default function Poll() {
  const { getCurrentSimulation } = useUser()
  const currentSimulation = getCurrentSimulation()

  const { linkToPollDashboard } = useAppNavigation()

  const { data: poll, isLoading } = usePoll({
    pollSlug: currentSimulation?.poll,
  })

  // If there is no poll attached to the simulation, we don't display the block
  if (!currentSimulation?.poll) {
    return null
  }

  // If the poll is not loading and there is still no poll, we don't display the block
  if (!isLoading && !poll) {
    return null
  }

  return (
    <Card className="mb-4 w-[24rem] max-w-full flex-row items-center justify-between gap-4 border-none bg-primary-100">
      <p className="m-0 flex-1 ">
        Découvrez les résultats du groupe{' '}
        <b>{isLoading ? '... ' : poll?.organisationInfo?.name}</b>
      </p>
      <ButtonLink
        href={linkToPollDashboard}
        className="flex h-10 w-10 items-center justify-center rounded-full p-0 leading-none">
        →
      </ButtonLink>
    </Card>
  )
}
