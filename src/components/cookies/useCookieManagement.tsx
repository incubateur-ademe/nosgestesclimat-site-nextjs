'use client'

import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import { PostHog } from './Posthog'
import {
  COOKIE_STATE,
  type CookieState,
  IS_COOKIE_STATE_INITIALIZED,
  saveCookieState,
} from './cookieLocalStorage'

type CookieBannerDisplayState = 'hidden' | 'banner' | 'form'

const posthog = new PostHog()
const CookieConsentContext = createContext<{
  cookieBannerDisplayState: CookieBannerDisplayState
  setCookieBannerDisplayState: (state: CookieBannerDisplayState) => void
  cookieState: CookieState
  setCookieState: (state: CookieState) => void
}>({
  cookieBannerDisplayState: 'hidden',
  setCookieBannerDisplayState: () => {},
  cookieState: COOKIE_STATE,
  setCookieState: () => {},
})

export const CookieConsentProvider = ({ children }: PropsWithChildren) => {
  const [cookieBannerDisplayState, setCookieBannerDisplayState] =
    useState<CookieBannerDisplayState>(
      IS_COOKIE_STATE_INITIALIZED ? 'hidden' : 'banner'
    )
  const [cookieState, setCookieState] = useState(COOKIE_STATE)

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
    saveCookieState(cookieState)
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
