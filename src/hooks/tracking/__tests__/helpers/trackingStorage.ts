/**
 * Test helpers for tracking storage operations in sessionStorage
 */

export type TrackingEventType =
  | 'simulator_seen'
  | 'first_question'
  | 'test_completed'

const TRACKING_KEY_PREFIX = 'ngc_tracking'

/**
 * Build a tracking key for a given simulation and event type
 */
export const buildTrackingKey = (
  simulationId: string,
  eventType: TrackingEventType
): string => {
  return `${TRACKING_KEY_PREFIX}_${eventType}_${simulationId}`
}

/**
 * Get the tracking state for a given simulation and event type
 */
export const getTrackingState = (
  simulationId: string,
  eventType: TrackingEventType
): string | null => {
  const key = buildTrackingKey(simulationId, eventType)
  return sessionStorage.getItem(key)
}

/**
 * Set the tracking state for a given simulation and event type
 */
export const setTrackingState = (
  simulationId: string,
  eventType: TrackingEventType,
  value: boolean = true
): void => {
  const key = buildTrackingKey(simulationId, eventType)
  sessionStorage.setItem(key, value.toString())
}

/**
 * Check if a tracking state exists and has the expected value
 */
export const hasTrackingState = (
  simulationId: string,
  eventType: TrackingEventType,
  expectedValue: boolean = true
): boolean => {
  const value = getTrackingState(simulationId, eventType)
  return value === expectedValue.toString()
}

/**
 * Clear all tracking states for a given simulation
 */
export const clearTrackingStates = (simulationId: string): void => {
  const eventTypes: TrackingEventType[] = [
    'simulator_seen',
    'first_question',
    'test_completed',
  ]

  eventTypes.forEach((eventType) => {
    const key = buildTrackingKey(simulationId, eventType)
    sessionStorage.removeItem(key)
  })
}
