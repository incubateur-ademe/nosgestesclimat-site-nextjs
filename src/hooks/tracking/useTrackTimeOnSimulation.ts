import { trackEvent } from '@/utils/analytics/trackEvent'
import { useCallback, useMemo } from 'react'

export function useTrackTimeOnSimulation() {
  const startTime = useMemo(() => Date.now(), [])

  const trackTimeOnSimulation = useCallback(() => {
    const endTime = Date.now()
    const timeSpentOnSimulation = endTime - startTime
    trackEvent(
      simulationSimulationCompletedTime({
        timeSpentOnSimulation,
      })
    )
    return timeSpentOnSimulation
  }, [startTime])

  return { trackTimeOnSimulation }
}
