'use client'
import {
  getCookieConsentFromStorage,
  getCookieCustomChoiceFromStorage,
} from '@/helpers/cookies/cookieConsentStorage'
import { useManageGoogleTracking } from '@/hooks/tracking/useManageGoogleTracking'
import { useManagePosthogTracking } from '@/hooks/tracking/useManagePosthogTracking'
import type { CookieChoice } from '@/types/cookies'
import { type CookieConsentChoices } from '@/types/cookies'
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

interface CookieConsentContextType {
  cookieConsent?: CookieChoice
  cookieCustomChoice?: CookieConsentChoices
  setCookieCustomChoice: (cookieCustomChoice: CookieConsentChoices) => void
  triggerConsentDetection: () => void
  isBoardOpen: boolean
  setIsBoardOpen: (isBoardOpen: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-function -- noop for context default values
const noop = () => {}

const CookieConsentContext = createContext<CookieConsentContextType>({
  cookieConsent: undefined,
  cookieCustomChoice: undefined,
  setCookieCustomChoice: noop,
  triggerConsentDetection: noop,
  isBoardOpen: false,
  setIsBoardOpen: noop,
})

const getInitialCookieConsent = getCookieConsentFromStorage
const getInitialCustomChoice = getCookieCustomChoiceFromStorage

export const CookieConsentProvider = ({ children }: PropsWithChildren) => {
  const [cookieConsent, setCookieConsent] = useState<CookieChoice | undefined>(
    getInitialCookieConsent
  )
  const [cookieCustomChoice, setCookieCustomChoice] = useState<
    CookieConsentChoices | undefined
  >(getInitialCustomChoice)

  const [isBoardOpen, setIsBoardOpen] = useState(false)

  const triggerConsentDetection = () => {
    const consentFromStorage = getCookieConsentFromStorage()
    const customChoiceFromStorage = getCookieCustomChoiceFromStorage()

    if (customChoiceFromStorage) {
      setCookieCustomChoice(customChoiceFromStorage)
    }

    setCookieConsent(consentFromStorage)
  }

  useManageGoogleTracking({
    cookieConsent,
    cookieCustomChoice,
  })

  useManagePosthogTracking({
    cookieConsent,
    cookieCustomChoice,
  })

  return (
    <CookieConsentContext
      value={{
        cookieConsent,
        cookieCustomChoice,
        setCookieCustomChoice,
        triggerConsentDetection,
        isBoardOpen,
        setIsBoardOpen,
      }}>
      {children}
    </CookieConsentContext>
  )
}

export const useCookieConsent = () => useContext(CookieConsentContext)
