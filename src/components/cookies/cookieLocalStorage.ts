import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import type { PostHogCookieState } from './Posthog'

const COOKIE_STATE_KEY = 'cookie-management-state'

export interface CookieState {
  posthog: PostHogCookieState
  googleTag: 'accepted' | 'refused'
}

export const DEFAULT_COOKIE_STATE: CookieState = {
  posthog: 'refused',
  googleTag: 'refused',
}

export let COOKIE_STATE: CookieState
export let IS_COOKIE_STATE_INITIALIZED: boolean

try {
  const json = safeLocalStorage.getItem(COOKIE_STATE_KEY)
  COOKIE_STATE = json ? (JSON.parse(json) as CookieState) : DEFAULT_COOKIE_STATE
  IS_COOKIE_STATE_INITIALIZED = true
} catch {
  COOKIE_STATE = DEFAULT_COOKIE_STATE
  IS_COOKIE_STATE_INITIALIZED = false
}

export function saveCookieState(state: CookieState) {
  COOKIE_STATE = state
  safeLocalStorage.setItem(COOKIE_STATE_KEY, JSON.stringify(state))
}
