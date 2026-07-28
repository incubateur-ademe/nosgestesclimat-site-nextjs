import { trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import posthog from 'posthog-js'
import { APP_ENV } from '../../../config/app-env'

// FIXME: refactor this to avoid duplicates with useTrackSimulator.ts
const getTrackingKey = (
  posthogSessionId: string,
  eventName: string,
  actionTrackingId: string
): string => {
  return `ngc_tracking_${eventName.replace(' ', '_')}_${actionTrackingId}_${posthogSessionId}`
}

const getTrackingState = (
  posthogSessionId: string,
  eventName: string,
  actionTrackingId: string
): boolean => {
  const key = getTrackingKey(posthogSessionId, eventName, actionTrackingId)
  return safeLocalStorage.getItem(key) === 'true'
}

const setTrackingState = (
  posthogSessionId: string,
  eventName: string,
  actionTrackingId: string,
  value: boolean
): void => {
  const key = getTrackingKey(posthogSessionId, eventName, actionTrackingId)

  safeLocalStorage.setItem(key, value.toString())
}

export const captureAction = ({
  actionTrackingId,
  actionThemeTrackingId,
  co2PotentialInKg,
  eventName,
}: {
  actionTrackingId: string
  actionThemeTrackingId: string
  co2PotentialInKg?: number
  eventName: 'action displayed' | 'action consulted'
}) => {
  // We deduplicate all action events, only one is processed per session
  const sessionId =
    APP_ENV === 'development' ? 'dev_session_id' : posthog.get_session_id()

  if (!getTrackingState(sessionId, eventName, actionTrackingId)) {
    trackPosthogEvent({
      eventName,
      properties: {
        action_name: actionTrackingId,
        action_theme: actionThemeTrackingId,
        co2_potential_kg: co2PotentialInKg,
      },
    })

    setTrackingState(sessionId, eventName, actionTrackingId, true)
  }
}
