const TRACKING_STORAGE_KEY = 'ngc-simulation-events'

type SimulationEvents = {
  progression0?: boolean
  progressionStarted?: boolean
  progressionHalf?: boolean
  progressionCompleted?: boolean
  categoriesStarted?: Record<string, boolean>
  categoriesCompleted?: Record<string, boolean>
}

/**
 * Get tracked events for a simulation
 */
export function getSimulationEvents(simulationId: string): SimulationEvents {
  try {
    const saved = localStorage.getItem(TRACKING_STORAGE_KEY)
    const allEvents = saved ? JSON.parse(saved) : {}
    return allEvents[simulationId] || {}
  } catch {
    return {}
  }
}

/**
 * Mark a category event as tracked for a simulation
 */
export function markCategoryEventAsTracked(
  simulationId: string,
  eventType: 'categoriesStarted' | 'categoriesCompleted',
  category: string
): void {
  try {
    const saved = localStorage.getItem(TRACKING_STORAGE_KEY)
    const allEvents = saved ? JSON.parse(saved) : {}

    if (!allEvents[simulationId]) {
      allEvents[simulationId] = {}
    }

    if (!allEvents[simulationId][eventType]) {
      allEvents[simulationId][eventType] = {}
    }

    allEvents[simulationId][eventType][category] = true

    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(allEvents))
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Mark an event as tracked for a simulation
 */
export function markEventAsTracked(
  simulationId: string,
  eventType: keyof SimulationEvents
): void {
  try {
    const saved = localStorage.getItem(TRACKING_STORAGE_KEY)
    const allEvents = saved ? JSON.parse(saved) : {}

    if (!allEvents[simulationId]) {
      allEvents[simulationId] = {}
    }

    allEvents[simulationId][eventType] = true

    // Auto-fill previous events if needed
    const events = allEvents[simulationId]
    if (eventType === 'progressionStarted' && !events.progression0) {
      events.progression0 = true
    }
    if (eventType === 'progressionHalf' && !events.progressionStarted) {
      events.progression0 = true
      events.progressionStarted = true
    }
    if (eventType === 'progressionCompleted' && !events.progressionHalf) {
      events.progression0 = true
      events.progressionStarted = true
      events.progressionHalf = true
    }

    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(allEvents))
  } catch {
    // Ignore localStorage errors
  }
}
