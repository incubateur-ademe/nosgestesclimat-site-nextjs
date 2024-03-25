'use client'

import { PreventNavigationContext } from '@/app/_components/mainLayoutProviders/PreventNavigationProvider'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import { getLinkToPollDashboard } from '@/helpers/navigation/pollPages'
import { usePoll } from '@/hooks/organisations/usePoll'
import { useUser } from '@/publicodes-state'
import { useContext, useEffect } from 'react'

export default function Poll() {
  const { getCurrentSimulation } = useUser()
  const currentSimulation = getCurrentSimulation()

  const lastPollSlug =
    currentSimulation?.polls?.[currentSimulation?.polls?.length - 1]

  const { data: poll, isLoading } = usePoll({
    pollSlug: lastPollSlug,
  })

  const { shouldPreventNavigation, handleUpdateShouldPreventNavigation } =
    useContext(PreventNavigationContext)

  useEffect(() => {
    if (shouldPreventNavigation) {
      handleUpdateShouldPreventNavigation(false)
    }
  }, [shouldPreventNavigation, handleUpdateShouldPreventNavigation])

  // If there is no poll attached to the simulation, we don't display the block
  if (!lastPollSlug) {
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
        href={getLinkToPollDashboard({
          orgaSlug: poll?.organisationInfo.slug || '', // TODO: handle this better
        })}
        className="flex h-10 w-10 items-center justify-center rounded-full p-0 leading-none">
        →
      </ButtonLink>
    </Card>
  )
}
