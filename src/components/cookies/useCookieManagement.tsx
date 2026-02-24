'use client'

import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import { PostHog, type PostHogCookieState } from './Posthog'

export const COOKIE_STATE_KEY = 'cookie-management-state'

export interface CookieState {
  posthog: PostHogCookieState
  googleTag: 'accepted' | 'refused'
}

type CookieBannerDisplayState = 'hidden' | 'banner' | 'form'

const DEFAULT_COOKIE_STATE: CookieState = {
  posthog: 'refused',
  googleTag: 'refused',
}

function getLocalStorageState(): CookieState {
  try {
    const json = safeLocalStorage.getItem(COOKIE_STATE_KEY)
    return json ? (JSON.parse(json) as CookieState) : DEFAULT_COOKIE_STATE
  } catch {
    return DEFAULT_COOKIE_STATE
  }
}

const LOCAL_STORAGE_STATE = getLocalStorageState()

const posthog = new PostHog(LOCAL_STORAGE_STATE.posthog)
const CookieConsentContext = createContext<{
  cookieBannerDisplayState: CookieBannerDisplayState
  setCookieBannerDisplayState: (state: CookieBannerDisplayState) => void
  cookieState: CookieState
  setCookieState: (state: CookieState) => void
}>({
  cookieBannerDisplayState: 'hidden',
  setCookieBannerDisplayState: () => {},
  cookieState: DEFAULT_COOKIE_STATE,
  setCookieState: () => {},
})

export const CookieConsentProvider = ({ children }: PropsWithChildren) => {
  const [cookieBannerDisplayState, setCookieBannerDisplayState] =
    useState<CookieBannerDisplayState>(
      !safeLocalStorage.getItem(COOKIE_STATE_KEY) ? 'banner' : 'hidden'
    )
  const [cookieState, setCookieState] =
    useState<CookieState>(LOCAL_STORAGE_STATE)

  return (
    <CookieConsentContext
      value={{
        cookieBannerDisplayState,
        setCookieBannerDisplayState,
        cookieState,
        setCookieState,
      }}>
      {children}
    </CookieConsentContext>
  )
}
const handleUpdateGoogleTag = (cookieState: CookieState['googleTag']) => {
  switch (cookieState) {
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
  const {
    cookieBannerDisplayState,
    setCookieBannerDisplayState,
    setCookieState,
    cookieState,
  } = useContext(CookieConsentContext)

  const onChange = (cookieState: CookieState) => {
    setCookieBannerDisplayState('hidden')
    setCookieState(cookieState)
    posthog.update(cookieState.posthog)
    handleUpdateGoogleTag(cookieState.googleTag)
    safeLocalStorage.setItem(COOKIE_STATE_KEY, JSON.stringify(cookieState))
  }

  return {
    cookieState,
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
