import { Group } from '@/types/groups'
import { useEffect, useState } from 'react'
import { Simulation } from '../../types'

type Props = {
  storageKey: string
}
export default function usePersistentSimulations({ storageKey }: Props) {
  const [initialized, setInitialized] = useState<boolean>(false)

  const [simulations, setSimulations] = useState<Simulation[]>([])
  const [currentSimulationId, setCurrentSimulationId] = useState<string>('')
  const [groupToRedirectToAfterTest, setGroupToRedirectToAfterTest] =
    useState<Group>()

  useEffect(() => {
    const storedSimulations: Simulation[] =
      JSON.parse(localStorage.getItem(storageKey) || '{}').simulations || []

    const storedCurrentSimulation: string =
      JSON.parse(localStorage.getItem(storageKey) || '{}')
        .currentSimulationId || ''

    setSimulations(storedSimulations)
    setCurrentSimulationId(storedCurrentSimulation)
    setInitialized(true)
  }, [storageKey])

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
    groupToRedirectToAfterTest,
    setGroupToRedirectToAfterTest,
  }
}
