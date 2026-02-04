'use client'

import { useUser } from '@/publicodes-state'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import posthog from 'posthog-js'
import type { PropsWithChildren } from 'react'
import { createContext, useCallback, useContext, useState } from 'react'

export const COOKIE_STATE_KEY = 'cookie-management-state'

export interface CookieState {
  posthog: 'accepted' | 'refused' | 'do_not_track'
  googleTag: 'accepted' | 'refused'
}

type CookieBannerDisplayState = 'hidden' | 'banner' | 'form'

interface CookieConsentContextType {
  cookieBannerDisplayState: CookieBannerDisplayState
  setCookieBannerDisplayState: (state: CookieBannerDisplayState) => void
}

const DEFAULT_COOKIE_STATE: CookieState = {
  posthog: 'refused',
  googleTag: 'refused',
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  cookieBannerDisplayState: 'hidden',
  setCookieBannerDisplayState: () => {},
})

export const CookieBannerProvider = ({ children }: PropsWithChildren) => {
  const [cookieBannerDisplayState, setCookieBannerDisplayState] =
    useState<CookieBannerDisplayState>(
      !safeLocalStorage.getItem(COOKIE_STATE_KEY) ? 'banner' : 'hidden'
    )

  return (
    <CookieConsentContext
      value={{
        cookieBannerDisplayState,
        setCookieBannerDisplayState,
      }}>
      {children}
    </CookieConsentContext>
  )
}
const handleUpdateGoogleTag = (cookieState: CookieState) => {
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
    useContext(CookieConsentContext)

  const { user } = useUser()

  const json = safeLocalStorage.getItem(COOKIE_STATE_KEY)

  let cookieLocalStorageState: CookieState
  try {
    cookieLocalStorageState = json
      ? (JSON.parse(json) as CookieState)
      : DEFAULT_COOKIE_STATE
  } catch {
    cookieLocalStorageState = DEFAULT_COOKIE_STATE
  }

  const handleUpdatePosthog = useCallback(
    (cookieState: CookieState) => {
      switch (cookieState.posthog) {
        case 'accepted':
          posthog.set_config({
            disable_persistence: false,
            disable_session_recording: false,
            opt_out_capturing_by_default: false,
          })
          posthog.opt_in_capturing()
          posthog.identify(user?.userId)
          break
        case 'refused':
          posthog.set_config({
            disable_persistence: false,
            disable_session_recording: true,
            opt_out_capturing_by_default: false,
          })
          // If previously accepted, we need to reset to clear the opt-out
          posthog.reset()
          // If user was previously opted-out, we need to opt-in
          posthog.opt_in_capturing()
          break
        case 'do_not_track':
          posthog.set_config({
            disable_persistence: true,
            disable_session_recording: true,
            opt_out_capturing_by_default: true,
          })
          posthog.reset()
          posthog.opt_out_capturing()
          break
      }
    },
    [user?.userId]
  )

  const onChange = useCallback(
    (cookieState: CookieState) => {
      setCookieBannerDisplayState('hidden')

      handleUpdatePosthog(cookieState)

      handleUpdateGoogleTag(cookieState)

      safeLocalStorage.setItem(COOKIE_STATE_KEY, JSON.stringify(cookieState))
    },
    [handleUpdatePosthog, setCookieBannerDisplayState]
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
