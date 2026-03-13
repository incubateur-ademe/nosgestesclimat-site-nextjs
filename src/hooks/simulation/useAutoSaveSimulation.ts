import { useCurrentSimulation } from '@/publicodes-state'
import { useEffect } from 'react'
import { useSaveSimulation } from './useSaveSimulation'

export function useAutoSaveSimulation() {
  const { saveSimulation } = useSaveSimulation()
  const currentSimulation = useCurrentSimulation()

  useEffect(() => {
    saveSimulation({ simulation: currentSimulation })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(currentSimulation.foldedSteps)])
}
