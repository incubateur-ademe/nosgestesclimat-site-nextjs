import { useUser } from '@/publicodes-state'
import { useEffect, useState } from 'react'
import { useFetchSimulation } from './useFetchSimulation'

export function useSetCurrentSimulationFromParams() {
  const { simulations, addSimulation, setCurrentSimulationId } = useUser()

  const { simulation, isLoading } = useFetchSimulation()

  const [isCorrectSimulationSet, setIsCorrectSimulationSet] = useState(false)

  useEffect(() => {
    // If the simulation is already set from the query params, we do nothing
    if (isCorrectSimulationSet) return

    // If the simulation is loading, we do nothing
    if (isLoading) return

    // If there is no simulation in the query params (or no simulation found based on the sid), we do nothing
    if (!simulation) {
      setIsCorrectSimulationSet(true)
      return
    }

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
    addSimulation(simulation)
    setIsCorrectSimulationSet(true)
  }, [
    simulations,
    simulation,
    isLoading,
    isCorrectSimulationSet,
    addSimulation,
    setCurrentSimulationId,
  ])

  return { isCorrectSimulationSet }
}
