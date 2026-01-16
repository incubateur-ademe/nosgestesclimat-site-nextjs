import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import type { Migration } from '@publicodes/tools/migration'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useMemo, useState } from 'react'
import type { Simulation } from '../../../types'

interface Props {
  storageKey: string
  migrationInstructions: Migration
  serverSimulations?: Simulation[]
}
export default function usePersistentSimulations({
  storageKey,
  migrationInstructions,
  serverSimulations,
}: Props) {
  const getCurrentStorage = useCallback(
    () => JSON.parse(safeLocalStorage.getItem(storageKey) || '{}'),
    [storageKey]
  )

  const saveSimulations = useCallback(
    (simulations: Simulation[]) => {
      const storage = getCurrentStorage()
      const updatedStorage = {
        ...storage,
        simulations,
      }
      safeLocalStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    },
    [getCurrentStorage, storageKey]
  )

  const saveCurrentSimulationId = useCallback(
    (currentSimulationId: string) => {
      const storage = getCurrentStorage()
      const updatedStorage = {
        ...storage,
        currentSimulationId,
      }
      safeLocalStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    },
    [getCurrentStorage, storageKey]
  )

  const [initSimulations, initCurrentSimulationId] = useMemo(() => {
    const parsedStorage = getCurrentStorage()

    let initSimulations: Simulation[] = parsedStorage.simulations
    let initCurrentSimulationId: string | undefined =
      parsedStorage.currentSimulationId
    if (serverSimulations?.length) {
      initSimulations = serverSimulations
    } else if (initSimulations && initCurrentSimulationId) {
      initSimulations = initSimulations.map((simulation) =>
        generateSimulation({
          ...simulation,
          migrationInstructions,
        })
      )
    } else {
      initSimulations = [generateSimulation()]
    }
    initCurrentSimulationId ??= initSimulations[0].id
    saveSimulations(initSimulations)
    saveCurrentSimulationId(initCurrentSimulationId)
    return [initSimulations, initCurrentSimulationId] as const
  }, [
    getCurrentStorage,
    migrationInstructions,
    saveCurrentSimulationId,
    saveSimulations,
    serverSimulations,
  ])

  const [simulations, setSimulationsState] =
    useState<Simulation[]>(initSimulations)

  const [currentSimulationId, setCurrentSimulationIdState] = useState<string>(
    initCurrentSimulationId
  )

  const setSimulations: Dispatch<SetStateAction<Simulation[]>> = useCallback(
    (action: SetStateAction<Simulation[]>) => {
      setSimulationsState((prevSimulations) => {
        const newSimulations =
          typeof action === 'function' ? action(prevSimulations) : action
        saveSimulations(newSimulations)
        return newSimulations
      })
    },
    [saveSimulations]
  )

  const setCurrentSimulationId: Dispatch<SetStateAction<string>> = useCallback(
    (action: SetStateAction<string>) => {
      setCurrentSimulationIdState((prevId) => {
        const newId = typeof action === 'function' ? action(prevId) : action
        saveCurrentSimulationId(newId)
        console.log({ newId })
        return newId
      })
    },
    [saveCurrentSimulationId]
  )

  return {
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
  }
}
