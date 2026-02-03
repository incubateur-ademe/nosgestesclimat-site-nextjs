'use client'

import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'
import { useCookieManagement } from './useCookieManagement'

interface CookieConsentContextType {
  cookieBannerDisplayState: CookieBannerDisplayState
  setCookieBannerDisplayState: (state: CookieBannerDisplayState) => void
}

type CookieBannerDisplayState = 'hidden' | 'banner' | 'form'

export const COOKIE_STATE_KEY = 'cookie-management-state'

const CookieConsentContext = createContext<CookieConsentContextType>({
  cookieBannerDisplayState: 'hidden',
  setCookieBannerDisplayState: () => {},
})

export const CookieBannerProvider = ({ children }: PropsWithChildren) => {
  const { cookieStateJson } = useCookieManagement()

  const [cookieBannerDisplayState, setCookieBannerDisplayState] =
    useState<CookieBannerDisplayState>(!cookieStateJson ? 'banner' : 'hidden')

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

export const useCookieBanner = () => useContext(CookieConsentContext)
