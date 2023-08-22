import { useState, useEffect } from 'react'

type Props = {
  storageKey: string
}
export default function usePersistentSimulations({ storageKey }: Props) {
  const [simulations, setSimulations] = useState([])
  const [currentSimulation, setCurrentSimulation] = useState('')

  useEffect(() => {
    setSimulations(
      JSON.parse(localStorage.getItem(storageKey) || '{}').simulations || []
    )
    setCurrentSimulation(
      JSON.parse(localStorage.getItem(storageKey) || '{}').currentSimulation ||
        ''
    )
  }, [storageKey])

  useEffect(() => {
    const currentStorage = JSON.parse(localStorage.getItem(storageKey) || '{}')
    const updatedStorage = { ...currentStorage, simulations }
    localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
  }, [storageKey, simulations])

  useEffect(() => {
    const currentStorage = JSON.parse(localStorage.getItem(storageKey) || '{}')
    const updatedStorage = { ...currentStorage, currentSimulation }
    localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
  }, [storageKey, currentSimulation])

  return {
    simulations,
    setSimulations,
    currentSimulation,
    setCurrentSimulation,
  }
}
