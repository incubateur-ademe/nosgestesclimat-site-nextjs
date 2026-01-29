'use client'
import {
  COOKIE_CONSENT_KEY,
  COOKIE_CUSTOM_CHOICE_KEY,
} from '@/constants/state/cookies'
import { useManageGoogleTracking } from '@/hooks/tracking/useManageGoogleTracking'
import { useManagePosthogTracking } from '@/hooks/tracking/useManagePosthogTracking'
import { CookieChoice, type CookieConsentChoices } from '@/types/cookies'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
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

const getInitialCookieConsent = (): CookieChoice | undefined => {
  const consentFromStorage = safeLocalStorage.getItem(COOKIE_CONSENT_KEY)
  return consentFromStorage ? (consentFromStorage as CookieChoice) : undefined
}
const getInitialCustomChoice = (): CookieConsentChoices | undefined => {
  const consentFromStorage = safeLocalStorage.getItem(COOKIE_CONSENT_KEY)
  if (consentFromStorage !== CookieChoice.custom) return undefined

  const customChoiceFromStorage =
    safeLocalStorage.getItem(COOKIE_CUSTOM_CHOICE_KEY) ?? ''
  try {
    return JSON.parse(customChoiceFromStorage) as CookieConsentChoices
  } catch {
    return undefined
  }
}

export const CookieConsentProvider = ({ children }: PropsWithChildren) => {
  const [cookieConsent, setCookieConsent] = useState<CookieChoice | undefined>(
    getInitialCookieConsent
  )
  const [cookieCustomChoice, setCookieCustomChoice] = useState<
    CookieConsentChoices | undefined
  >(getInitialCustomChoice)

  const [isBoardOpen, setIsBoardOpen] = useState(false)

  const triggerConsentDetection = () => {
    const consentFromStorage = safeLocalStorage.getItem(
      COOKIE_CONSENT_KEY
    ) as CookieChoice

    let customChoiceFromStorage
    if (consentFromStorage === CookieChoice.custom) {
      customChoiceFromStorage =
        safeLocalStorage.getItem(COOKIE_CUSTOM_CHOICE_KEY) ?? ''

      try {
        customChoiceFromStorage = JSON.parse(
          customChoiceFromStorage
        ) as CookieConsentChoices
        setCookieCustomChoice(customChoiceFromStorage)
      } catch {
        // Do nothing, JSON is invalid
      }
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
