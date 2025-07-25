import {
  COOKIE_CONSENT_KEY,
  COOKIE_CUSTOM_CHOICE_KEY,
} from '@/constants/state/cookies'
import { CookieChoice, type CookieConsentChoices } from '@/types/cookies'
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
  isBoardOpen: boolean
  setIsBoardOpen: (isBoardOpen: boolean) => void
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  cookieConsent: undefined,
  cookieCustomChoice: undefined,
  triggerConsentDetection: () => {},
  isBoardOpen: false,
  setIsBoardOpen: () => {},
})

export const CookieConsentProvider = ({ children }: PropsWithChildren) => {
  const [cookieConsent, setCookieConsent] = useState<CookieChoice | undefined>(
    undefined
  )
  const [cookieCustomChoice, setCookieCustomChoice] = useState<
    CookieConsentChoices | undefined
  >()

  const [isBoardOpen, setIsBoardOpen] = useState(false)

  const triggerConsentDetection = () => {
    const consentFromStorage = safeLocalStorage.getItem(COOKIE_CONSENT_KEY)

    if (!consentFromStorage) return

    let customChoiceFromStorage
    if (consentFromStorage === CookieChoice.custom) {
      customChoiceFromStorage =
        safeLocalStorage.getItem(COOKIE_CUSTOM_CHOICE_KEY) ?? ''

      try {
        customChoiceFromStorage = JSON.parse(customChoiceFromStorage)
        setCookieCustomChoice(customChoiceFromStorage)
      } catch (e) {
        // Do nothing, JSON is invalid
      }
    }

    setCookieConsent(consentFromStorage as CookieChoice)
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
        isBoardOpen,
        setIsBoardOpen,
      }}>
      {children}
    </CookieConsentContext>
  )
}

export const useCookieConsent = () => useContext(CookieConsentContext)
