import { simulationSimulationCompletedTime } from '@/constants/tracking/simulation'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useCallback, useMemo } from 'react'

export function useTrackTimeOnSimulation() {
  const startTime = useMemo(() => Date.now(), [])

  const trackTimeOnSimulation = useCallback(() => {
    const endTime = Date.now()
    const timeSpentOnSimulation = endTime - startTime
    trackEvent(simulationSimulationCompletedTime({ timeSpentOnSimulation }))
  }, [startTime])

  return { trackTimeOnSimulation }
}
