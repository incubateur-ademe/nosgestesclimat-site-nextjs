import { useCurrentSimulation } from '@/publicodes-state'
import { useDebounce } from '@/utils/debounce'
import { useEffect } from 'react'
import { useSaveSimulation } from './useSaveSimulation'

export function useAutoSaveSimulation() {
  const { saveSimulation } = useSaveSimulation()
  const currentSimulation = useCurrentSimulation()
  const debouncedSaveSimulation = useDebounce(
    async (props: Parameters<typeof saveSimulation>[0]) => {
      await saveSimulation(props)
    },
    5000
  )
  const { progression } = currentSimulation
  useEffect(() => {
    if (progression === 1) {
      debouncedSaveSimulation.cancel()
      void saveSimulation({ simulation: currentSimulation })
    } else if (progression > 0) {
      debouncedSaveSimulation({ simulation: currentSimulation })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSimulation.situation, progression])
}
