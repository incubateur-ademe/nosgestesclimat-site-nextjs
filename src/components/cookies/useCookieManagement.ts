import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import posthog from 'posthog-js'
import { useCallback, useState } from 'react'

export interface CookieState {
  posthog: 'accepted' | 'refused' | 'do_not_track'
  googleAds: 'accepted' | 'refused'
}

type BannerDisplayState = 'hidden' | 'banner' | 'form'

const key = 'COOKIE'

export function useCookieManagement(): {
  state: CookieState
  onChange: (state: CookieState) => void
  bannerDisplayState: BannerDisplayState
  setBannerDisplayState: (state: BannerDisplayState) => void
} {
  const json = safeLocalStorage.getItem(key)
  const state: CookieState = json
    ? (JSON.parse(json) as CookieState)
    : ({
        posthog: 'refused',
        googleAds: 'refused',
      } as const)

  const [bannerDisplayState, setBannerDisplayState] =
    useState<BannerDisplayState>(json === undefined ? 'banner' : 'hidden')

  const onChange = useCallback((cookieState: CookieState) => {
    safeLocalStorage.setItem(key, JSON.stringify(cookieState))
    setBannerDisplayState('hidden')

    // Posthog
    if (cookieState.posthog === 'accepted') {
      posthog.opt_in_capturing()
      return
    }
    if (cookieState.posthog === 'refused') {
      posthog.opt_out_capturing()
      return
    }
    if (cookieState.posthog === 'do_not_track') {
      posthog.set_config({
        disable_persistence: true,
        disable_session_recording: true,
        opt_out_capturing_by_default: true,
      })
      posthog.opt_out_capturing()
      return
    }

    // Google ads
    if (cookieState.googleAds === 'accepted') {
      window.gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })
      return
    }
    if (cookieState.googleAds === 'refused') {
      window.gtag?.('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
      return
    }
  }, [])

  return {
    state,
    bannerDisplayState,
    setBannerDisplayState,
    onChange,
  }
}
