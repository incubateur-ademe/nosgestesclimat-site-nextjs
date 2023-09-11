import { useEffect, useState } from 'react'
import { Simulation } from '../types'

type Props = {
  storageKey: string
  forgetSimulations?: boolean
}
export default function usePersistentSimulations({
  storageKey,
  forgetSimulations,
}: Props) {
  const [initialized, setInitialized] = useState<boolean>(false)

  const [simulations, setSimulations] = useState<Simulation[]>([])
  const [currentSimulationId, setCurrentSimulationId] = useState<string>('')

  useEffect(() => {
    const storedSimulations: Simulation[] = forgetSimulations
      ? []
      : JSON.parse(localStorage.getItem(storageKey) || '{}').simulations || []

    const storedCurrentSimulation: string = forgetSimulations
      ? ''
      : JSON.parse(localStorage.getItem(storageKey) || '{}')
          .currentSimulationId || ''

    setSimulations(storedSimulations)
    setCurrentSimulationId(storedCurrentSimulation)
    setInitialized(true)
  }, [storageKey, forgetSimulations])

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
