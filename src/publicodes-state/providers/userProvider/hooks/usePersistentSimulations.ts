import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { getIsLocalStorageAvailable } from '@/utils/getIsLocalStorageAvailable'
import type { Migration } from '@publicodes/tools/migration'
import { useEffect, useState } from 'react'
import type { Simulation } from '../../../types'

const isLocalStorageAvailable = getIsLocalStorageAvailable()

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

  useEffect(() => {
    let localSimulations: Simulation[] | undefined
    let localCurrentSimulationId: string | undefined
    if (isLocalStorageAvailable) {
      const currentStorage = localStorage.getItem(storageKey)
      const parsedStorage = JSON.parse(currentStorage || '{}')

      localSimulations = parsedStorage.simulations
      localCurrentSimulationId = parsedStorage.currentSimulationId
    }

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
        localStorage.getItem(storageKey) || '{}'
      )
      const updatedStorage = { ...currentStorage, simulations }
      localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    }
  }, [storageKey, simulations, initialized])

  useEffect(() => {
    if (initialized) {
      const currentStorage = JSON.parse(
        localStorage.getItem(storageKey) || '{}'
      )
      const updatedStorage = { ...currentStorage, currentSimulationId }
      localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    }
  }, [storageKey, currentSimulationId, initialized])

  return {
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
  }
}
