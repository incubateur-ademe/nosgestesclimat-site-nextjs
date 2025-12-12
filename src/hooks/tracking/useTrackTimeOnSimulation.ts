import { simulationSimulationTime } from '@/constants/tracking/simulation'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useCallback, useState } from 'react'

export function useTrackTimeOnSimulation() {
  const [startTime] = useState(() => Date.now())

  const trackTimeOnSimulation = useCallback(() => {
    const endTime = Date.now()
    const timeSpentOnSimulation = endTime - startTime
    trackEvent(simulationSimulationTime(timeSpentOnSimulation))

    return timeSpentOnSimulation
  }, [startTime])

  return { trackTimeOnSimulation }
}
