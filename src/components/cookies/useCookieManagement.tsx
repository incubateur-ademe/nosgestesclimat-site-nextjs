'use client'

import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import posthog from 'posthog-js'
import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'

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

export const CookieConsentProvider = ({ children }: PropsWithChildren) => {
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

const handlePosthogDNT = (dnt: boolean) => {
  posthog.reset()
  if (dnt) {
    posthog.set_config({
      cookieless_mode: undefined,
      opt_out_capturing_by_default: true,
    })
    posthog.opt_out_capturing()
  } else {
    posthog.set_config({
      cookieless_mode: 'on_reject',
      opt_out_capturing_by_default: false,
    })
  }
}

const handleUpdatePosthog = (cookieState: CookieState) => {
  switch (cookieState.posthog) {
    case 'accepted':
      posthog.opt_in_capturing()
      break

    case 'refused':
      posthog.opt_in_capturing()
      break

    case 'do_not_track':
      handlePosthogDNT(true)
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

  const json = safeLocalStorage.getItem(COOKIE_STATE_KEY)

  let cookieLocalStorageState: CookieState
  try {
    cookieLocalStorageState = json
      ? (JSON.parse(json) as CookieState)
      : DEFAULT_COOKIE_STATE
  } catch {
    cookieLocalStorageState = DEFAULT_COOKIE_STATE
  }

  const onChange = (cookieState: CookieState) => {
    setCookieBannerDisplayState('hidden')
    if (
      cookieState.posthog !== 'do_not_track' &&
      cookieLocalStorageState.posthog === 'do_not_track'
    ) {
      handlePosthogDNT(false)
    }
    handleUpdatePosthog(cookieState)

    handleUpdateGoogleTag(cookieState)

    safeLocalStorage.setItem(COOKIE_STATE_KEY, JSON.stringify(cookieState))
  }

  return {
    cookieState: cookieLocalStorageState,
    cookieBannerDisplayState,
    setCookieBannerDisplayState,
    onChange,
    rejectAll: () => {
      onChange({
        posthog: 'refused',
        googleTag: 'refused',
      })
    },
    acceptAll: () => {
      onChange({
        posthog: 'accepted',
        googleTag: 'accepted',
      })
    },
  }
}
