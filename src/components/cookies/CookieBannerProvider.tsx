'use client'

import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'
import { COOKIE_STATE_KEY } from './useCookieManagement'

interface CookieConsentContextType {
  cookieBannerDisplayState: CookieBannerDisplayState
  setCookieBannerDisplayState: (state: CookieBannerDisplayState) => void
}

type CookieBannerDisplayState = 'hidden' | 'banner' | 'form'

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

export const useCookieBanner = () => useContext(CookieConsentContext)
