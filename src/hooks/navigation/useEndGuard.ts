import { getLinkToGroupDashboard } from '@/helpers/navigation/groupPages'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSimulationIdInQueryParams } from '../simulation/useSimulationIdInQueryParams'

export function useEndGuard() {
  const router = useRouter()

  const { getCurrentSimulation, tutorials } = useUser()
  const currentSimulation = getCurrentSimulation()

  const { simulationIdInQueryParams } = useSimulationIdInQueryParams()

  const [isGuardInit, setIsGuardInit] = useState(false)
  const [isGuardRedirecting, setIsGuardRedirecting] = useState(false)

  useEffect(() => {
    // we only run the guard at mount
    if (isGuardInit) return
    setIsGuardInit(true)

    if (!currentSimulation) {
      router.push('/404') // TODO: should throw an error
      setIsGuardRedirecting(true)
      return
    }

    // if there is a simulation id in the query params we do nothing
    if (simulationIdInQueryParams) {
      return
    }

    // if the simulation is in a group, we redirect to the group results page
    if (currentSimulation.group) {
      router.replace(
        getLinkToGroupDashboard({ groupId: currentSimulation.group })
      )
      return
    }

    // if the simulation is finished we do nothing
    if (currentSimulation.progression === 1) {
      return
    }

    // if the user didn't see the tutoriel we redirect him to the tutorial page
    if (!tutorials.testIntro) {
      router.replace('/tutoriel')
      setIsGuardRedirecting(true)
      return
    }

    // we redirect the user to the test page
    router.replace(getLinkToSimulateur())
    setIsGuardRedirecting(true)
  }, [
    isGuardInit,
    simulationIdInQueryParams,
    currentSimulation,
    router,
    tutorials,
  ])

  return { isGuardInit, isGuardRedirecting }
}
