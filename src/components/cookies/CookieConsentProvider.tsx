import {
  COOKIE_CONSENT_KEY,
  COOKIE_CUSTOM_CHOICE_KEY,
} from '@/constants/state/cookies'
import { CookieChoice, CookieConsentChoices } from '@/types/cookies'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'

type CookieConsentContextType = {
  cookieConsent?: CookieChoice
  cookieCustomChoice?: CookieConsentChoices
  triggerConsentDetection: () => void
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  cookieConsent: undefined,
  cookieCustomChoice: undefined,
  triggerConsentDetection: () => {},
})

export const CookieConsentProvider = ({ children }: PropsWithChildren) => {
  const [cookieConsent, setCookieConsent] = useState<CookieChoice | undefined>(
    undefined
  )
  const [cookieCustomChoice, setCookieCustomChoice] = useState<
    CookieConsentChoices | undefined
  >()

  const triggerConsentDetection = () => {
    const consentFromStorage = safeLocalStorage.getItem(COOKIE_CONSENT_KEY)

    if (!consentFromStorage) return

    let customChoiceFromStorage
    if (consentFromStorage === CookieChoice.custom) {
      customChoiceFromStorage = safeLocalStorage.getItem(
        COOKIE_CUSTOM_CHOICE_KEY
      )
      const value =
        customChoiceFromStorage && JSON.parse(customChoiceFromStorage)
      if (value) setCookieCustomChoice(value)
    }

    setCookieConsent(consentFromStorage as CookieChoice)

    window.dispatchEvent(
      new CustomEvent('cookieConsentChanged', {
        detail: {
          consent: consentFromStorage,
          customChoice: customChoiceFromStorage,
        },
      })
    )
  }

  useEffect(() => {
    triggerConsentDetection()
  }, [])

  return (
    <CookieConsentContext
      value={{
        cookieConsent,
        cookieCustomChoice,
        triggerConsentDetection,
      }}>
      {children}
    </CookieConsentContext>
  )
}

export const useCookieConsent = () => useContext(CookieConsentContext)
