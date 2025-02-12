import { simulationSimulationCompletedTime } from '@/constants/tracking/simulation'
import { trackEvent } from '@/utils/matomo/trackEvent'
import posthog from 'posthog-js'
import { useCallback, useMemo } from 'react'

export function useTrackTimeOnSimulation() {
  const startTime = useMemo(() => Date.now(), [])

  const trackTimeOnSimulation = useCallback(() => {
    const endTime = Date.now()
    const timeSpentOnSimulation = endTime - startTime
    const eventParams = simulationSimulationCompletedTime({
      timeSpentOnSimulation,
    })
    trackEvent(eventParams)
    posthog.capture(eventParams[2] as string, {
      category: eventParams[1],
      timeSpent: eventParams[4],
    })
  }, [startTime])

  return { trackTimeOnSimulation }
}
