import {
  COOKIE_CONSENT_KEY,
  COOKIE_CUSTOM_CHOICE_KEY,
  POSTHOG_ENABLED_KEY,
} from '@/constants/state/cookies'
import { CookieChoice, type CookieConsentChoices } from '@/types/cookies'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'

export const getCookieConsentFromStorage = (): CookieChoice | undefined => {
  const consentFromStorage = safeLocalStorage.getItem(COOKIE_CONSENT_KEY)
  return consentFromStorage ? (consentFromStorage as CookieChoice) : undefined
}

export const getCookieCustomChoiceFromStorage = ():
  | CookieConsentChoices
  | undefined => {
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

export const setCookieConsentInStorage = (choice: CookieChoice) => {
  safeLocalStorage.setItem(COOKIE_CONSENT_KEY, choice)
}

export const setCookieCustomChoiceInStorage = (
  choices: CookieConsentChoices
) => {
  safeLocalStorage.setItem(COOKIE_CUSTOM_CHOICE_KEY, JSON.stringify(choices))
}

export const getPosthogEnabledFromStorage = (): boolean => {
  const storedValue = safeLocalStorage.getItem(POSTHOG_ENABLED_KEY)
  return storedValue !== 'false'
}

export const setPosthogEnabledInStorage = (enabled: boolean) => {
  safeLocalStorage.setItem(POSTHOG_ENABLED_KEY, String(enabled))
  window.dispatchEvent(new CustomEvent('posthog-enabled-change'))
}
