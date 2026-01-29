'use client'

import {
  getCookieConsentFromStorage,
  getCookieCustomChoiceFromStorage,
  getPosthogEnabledFromStorage,
  setCookieConsentInStorage,
  setCookieCustomChoiceInStorage,
  setPosthogEnabledInStorage,
} from '@/helpers/cookies/cookieConsentStorage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import {
  CookieChoice,
  CookieConsentKey,
  type CookieConsentChoices,
} from '@/types/cookies'
import { useState } from 'react'
import Trans from '../translation/trans/TransClient'

export default function DisablePosthogCheckbox() {
  // Use lazy initialization to avoid reading from localStorage on every render
  const [isEnabled, setIsEnabled] = useState(getPosthogEnabledFromStorage)

  const { t } = useClientTranslation()

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked
    setIsEnabled(newValue)
    setPosthogEnabledInStorage(newValue)

    // When re-enabling PostHog, reset to exempted mode
    if (newValue) {
      const currentCustomChoice: CookieConsentChoices =
        getCookieCustomChoiceFromStorage() ?? {
          [CookieConsentKey.googleAds]: false,
          [CookieConsentKey.posthog]: false,
        }

      currentCustomChoice[CookieConsentKey.posthog] = false

      setCookieCustomChoiceInStorage(currentCustomChoice)

      // Set consent mode to custom if not already set
      const currentConsent = getCookieConsentFromStorage()
      if (!currentConsent || currentConsent === CookieChoice.all) {
        setCookieConsentInStorage(CookieChoice.custom)
      }

      // Reloading the page to apply the changes
      window.location.reload()
    }
  }

  return (
    <label
      htmlFor="posthog-checkbox"
      aria-label={t(
        'privacyPolicy.posthogCheckboxLabel',
        'Désactiver le suivi Posthog'
      )}
      className="mb-6 flex cursor-pointer items-center gap-2">
      <input
        id="posthog-checkbox"
        type="checkbox"
        checked={isEnabled}
        onChange={handleCheckboxChange}
      />
      <span>
        <Trans i18nKey="privacyPolicy.posthogCheckboxText">
          Vous n'êtes pas exclu(e). Décochez cette case pour désactiver
          complètement le suivi avec Posthog
        </Trans>
      </span>
    </label>
  )
}
