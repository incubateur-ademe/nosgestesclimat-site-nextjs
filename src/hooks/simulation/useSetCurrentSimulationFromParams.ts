import { useUser } from '@/publicodes-state'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFetchSimulation } from './useFetchSimulation'
import { useSimulationIdInQueryParams } from './useSimulationIdInQueryParams'

export function useSetCurrentSimulationFromParams() {
  const pathname = usePathname()

  const router = useRouter()

  const { simulations, initSimulation, setCurrentSimulationId, hideTutorial } =
    useUser()

  const { simulationIdInQueryParams } = useSimulationIdInQueryParams()

  const { simulation, isLoading } = useFetchSimulation({
    simulationId: simulationIdInQueryParams,
  })

  const [isCorrectSimulationSet, setIsCorrectSimulationSet] = useState(false)

  useEffect(() => {
    // If the simulation is already set from the query params, we do nothing
    if (isCorrectSimulationSet) return

    // If the simulation is loading, we do nothing
    if (isLoading) return

    // If there is no simulation in the query params we do nothing
    if (!simulationIdInQueryParams) {
      setIsCorrectSimulationSet(true)
      return
    }

    // If there is no simulation found with the id in the query params, we delete the query params and reload the page
    if (!simulation) {
      window.location.href = pathname
      return
    }

    // From here we know that the simulation is loaded and that the id is correct
    // We can disable the tutorial
    hideTutorial('testIntro')

    const storedSimulation = simulations.find(
      (storedSimulation) => storedSimulation.id === simulation.id
    )

    // If the simulation is already in the localStorage, we set it as current
    if (storedSimulation) {
      setCurrentSimulationId(storedSimulation.id)
      setIsCorrectSimulationSet(true)
      return
    }

    // if the simulation is not in the localStorage, we add it
    initSimulation(simulation)
    setIsCorrectSimulationSet(true)

    // We delete the query params and reload the page
    router.replace(pathname)
  }, [
    simulations,
    simulation,
    isLoading,
    isCorrectSimulationSet,
    initSimulation,
    setCurrentSimulationId,
    simulationIdInQueryParams,
    pathname,
    router,
    hideTutorial,
  ])

  return { isCorrectSimulationSet }
}
