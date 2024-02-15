import { useSaveSimulation } from '@/hooks/useSaveSimulation'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export function useEndPage() {
  const router = useRouter()

  const { user, getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const progression = currentSimulation?.progression

  const { saveSimulation } = useSaveSimulation()

  const goToEndPage = useCallback(
    async ({ save }: { save: boolean } = { save: true }) => {
      if (!currentSimulation) {
        router.push('/404') // TODO: should throw an error
        return
      }

      // If the simulation is finished and is in a poll or a group, we save it (unless save is false)
      if (
        progression === 1 &&
        save &&
        (currentSimulation.poll || currentSimulation.group)
      ) {
        await saveSimulation({ simulation: currentSimulation, user })
      }

      // if the simulation is in a group, we redirect to the group results page
      if (currentSimulation.group) {
        router.push(`/amis/resultats?groupId=${currentSimulation.group}`)
        return
      }

      // else we redirect to the results page
      router.push('/fin')
    },
    [currentSimulation, progression, router, saveSimulation, user]
  )

  const linkToEndPage = useMemo(() => {
    if (!currentSimulation) {
      return '/404' // TODO: should throw an error
    }

    // if the simulation is in a group, we return the group results page
    if (currentSimulation.group) {
      return `/amis/resultats?groupId=${currentSimulation.group}`
    }

    // else we return the results page
    return '/fin'
  }, [currentSimulation])

  return { goToEndPage, linkToEndPage }
}
