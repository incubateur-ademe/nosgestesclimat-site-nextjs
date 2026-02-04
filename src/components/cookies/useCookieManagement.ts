import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import posthog from 'posthog-js'
import { useCallback } from 'react'
import { useCookieBanner } from './CookieBannerProvider'

export const COOKIE_STATE_KEY = 'cookie-management-state'

export interface CookieState {
  posthog: 'accepted' | 'refused' | 'do_not_track'
  googleTag: 'accepted' | 'refused'
}

type CookieBannerDisplayState = 'hidden' | 'banner' | 'form'

const DEFAULT_COOKIE_STATE: CookieState = {
  posthog: 'refused',
  googleTag: 'refused',
}

export function useCookieManagement(): {
  cookieState: CookieState
  onChange: (state: CookieState) => void
  cookieBannerDisplayState: CookieBannerDisplayState
  setCookieBannerDisplayState: (state: CookieBannerDisplayState) => void
  rejectAll: () => void
  acceptAll: () => void
} {
  const { cookieBannerDisplayState, setCookieBannerDisplayState } =
    useCookieBanner()

  const json = safeLocalStorage.getItem(COOKIE_STATE_KEY)

  let cookieLocalStorageState: CookieState
  try {
    cookieLocalStorageState = json
      ? (JSON.parse(json) as CookieState)
      : DEFAULT_COOKIE_STATE
  } catch {
    cookieLocalStorageState = DEFAULT_COOKIE_STATE
  }

  const handleUpdatePosthog = useCallback((cookieState: CookieState) => {
    switch (cookieState.posthog) {
      case 'accepted':
        posthog.opt_in_capturing()
        break
      case 'refused':
        posthog.opt_out_capturing()
        break
      case 'do_not_track':
        posthog.set_config({
          disable_persistence: true,
          disable_session_recording: true,
          opt_out_capturing_by_default: true,
        })
        posthog.opt_out_capturing()
        break
    }
  }, [])

  const handleUpdateGoogleTag = useCallback((cookieState: CookieState) => {
    switch (cookieState.googleTag) {
      case 'accepted':
        window.gtag?.('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        })
        break
      case 'refused':
        window.gtag?.('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        })
        break
    }
  }, [])

  const onChange = useCallback(
    (cookieState: CookieState) => {
      setCookieBannerDisplayState('hidden')

      handleUpdatePosthog(cookieState)

      handleUpdateGoogleTag(cookieState)

      safeLocalStorage.setItem(COOKIE_STATE_KEY, JSON.stringify(cookieState))
    },
    [handleUpdateGoogleTag, handleUpdatePosthog, setCookieBannerDisplayState]
  )

  const rejectAll = useCallback(() => {
    onChange({
      posthog: 'refused',
      googleTag: 'refused',
    })
  }, [onChange])

  const acceptAll = useCallback(() => {
    onChange({
      posthog: 'accepted',
      googleTag: 'accepted',
    })
  }, [onChange])

  return {
    cookieState: cookieLocalStorageState,
    cookieBannerDisplayState,
    setCookieBannerDisplayState,
    onChange,
    rejectAll,
    acceptAll,
  }
}
