import { STORAGE_KEY } from '@/constants/storage'
import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import type { Migration } from '@publicodes/tools/migration'
import { useEffect, useMemo, useState } from 'react'
import type { Simulation } from '../../../types'

interface Props {
  migrationInstructions: Migration
  serverSimulations?: Simulation[]
}

export default function usePersistentSimulations({
  migrationInstructions,
  serverSimulations,
}: Props) {
  const [initSimulations, initCurrentSimulationId] = useMemo(() => {
    const parsedStorage = getCurrentStorage()

    let initSimulations: Simulation[] = parsedStorage.simulations
    let initCurrentSimulationId: string | undefined =
      parsedStorage.currentSimulationId

    if (serverSimulations?.length) {
      initSimulations = serverSimulations
    } else if (!initSimulations || !initCurrentSimulationId) {
      initSimulations = [generateSimulation()]
    }

    initCurrentSimulationId ??= initSimulations[0].id

    const currentSimulationIndex = initSimulations.findIndex(
      (simulation) => simulation.id === initCurrentSimulationId
    )

    // Migrate the current simulation
    initSimulations[currentSimulationIndex] = generateSimulation({
      ...initSimulations[currentSimulationIndex],
      migrationInstructions,
    })

    return [initSimulations, initCurrentSimulationId] as const
  }, [migrationInstructions, serverSimulations])

  const [simulations, setSimulations] = useState<Simulation[]>(initSimulations)

  const [currentSimulationId, setCurrentSimulationId] = useState<string>(
    initCurrentSimulationId
  )

  useEffect(() => {
    saveSimulations(simulations)
  }, [simulations])

  useEffect(() => {
    saveCurrentSimulationId(currentSimulationId)
  }, [currentSimulationId])

  return {
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
  }
}

function getCurrentStorage(): {
  simulations: Simulation[]
  currentSimulationId: string
} {
  return JSON.parse(safeLocalStorage.getItem(STORAGE_KEY) || '{}')
}

function saveSimulations(simulations: Simulation[]) {
  const storage = getCurrentStorage()
  const updatedStorage = {
    ...storage,
    simulations,
  }
  safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStorage))
}

function saveCurrentSimulationId(currentSimulationId: string) {
  const storage = getCurrentStorage()
  const updatedStorage = {
    ...storage,
    currentSimulationId,
  }
  safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStorage))
}
