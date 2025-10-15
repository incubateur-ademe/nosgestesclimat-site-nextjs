import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import type { Migration } from '@publicodes/tools/migration'
import { useEffect, useState } from 'react'
import type { Simulation } from '../../../types'

// This adds the isCompleted field, a boolean that remains true for completed simulations
// even if, after being loaded in the engine, their progression is brought back to 1<
const addIsCompletedField = (simulation: Simulation) => {
  return simulation.progression === 1
    ? { ...simulation, isCompleted: true }
    : { ...simulation, isCompleted: false }
}

type Props = {
  storageKey: string
  migrationInstructions: Migration
}
export default function usePersistentSimulations({
  storageKey,
  migrationInstructions,
}: Props) {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [simulations, setSimulations] = useState<Simulation[]>([])
  const [currentSimulationId, setCurrentSimulationId] = useState<string>('')

  // Get simulations from localStorage
  useEffect(() => {
    const currentStorage = safeLocalStorage.getItem(storageKey)
    const parsedStorage = JSON.parse(currentStorage || '{}')

    const localSimulations: Simulation[] | undefined = (
      parsedStorage.simulations ?? []
    )
      // Add the isCompleted field for simulations saved before we added this field to
      // the Simulation object
      .map((simulation: Simulation) => addIsCompletedField(simulation))

    const localCurrentSimulationId: string | undefined =
      parsedStorage.currentSimulationId

    if (localSimulations && localCurrentSimulationId) {
      const migratedLocalSimulations = localSimulations.map((simulation) =>
        generateSimulation({
          ...simulation,
          migrationInstructions,
        })
      )
      setSimulations(migratedLocalSimulations)
      setCurrentSimulationId(localCurrentSimulationId)
    } else {
      const newSimulation = generateSimulation()
      setSimulations([newSimulation])
      setCurrentSimulationId(newSimulation.id)
    }

    setInitialized(true)
  }, [migrationInstructions, storageKey])

  useEffect(() => {
    if (initialized) {
      const currentStorage = JSON.parse(
        safeLocalStorage.getItem(storageKey) || '{}'
      )
      const updatedStorage = { ...currentStorage, simulations }
      safeLocalStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    }
  }, [storageKey, simulations, initialized])

  useEffect(() => {
    if (initialized) {
      const currentStorage = JSON.parse(
        safeLocalStorage.getItem(storageKey) || '{}'
      )
      const updatedStorage = { ...currentStorage, currentSimulationId }
      safeLocalStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    }
  }, [storageKey, currentSimulationId, initialized])

  return {
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
  }
}
