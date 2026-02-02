import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import posthog from 'posthog-js'
import { useCallback } from 'react'

interface CookieState {
  posthog: 'accepted' | 'refused' | 'do_not_track'
  googleAds: 'accepted' | 'refused'
}

const key = 'COOKIE'
export function useCookieManagement(): {
  state: CookieState
  onChange: (state: CookieState) => void
} {
  const json = safeLocalStorage.getItem(key)
  const state: CookieState = json
    ? (JSON.parse(json) as CookieState)
    : ({
        posthog: 'refused',
        googleAds: 'refused',
      } as const)

  const onChange = useCallback((cookieState: CookieState) => {
    if (cookieState.posthog === 'accepted') {
      posthog.opt_in_capturing()
      safeLocalStorage.setItem(key, JSON.stringify(cookieState))
      return
    }
    if (cookieState.posthog === 'refused') {
      posthog.opt_out_capturing()
      safeLocalStorage.setItem(key, JSON.stringify(cookieState))
      return
    }
    if (cookieState.posthog === 'do_not_track') {
      posthog.set_config({
        disable_persistence: true,
        disable_session_recording: true,
        opt_out_capturing_by_default: true,
      })
      posthog.opt_out_capturing()
      // @TOFIX Question ouverte : doit-on supprimer le cookie ?
      return
    }
  }, [])

  return {
    state,
    onChange,
  }
}
