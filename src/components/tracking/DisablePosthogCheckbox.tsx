'use client'

import {
  COOKIE_CONSENT_KEY,
  COOKIE_CUSTOM_CHOICE_KEY,
  POSTHOG_ENABLED_KEY,
} from '@/constants/state/cookies'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { CookieChoice, CookieConsentKey } from '@/types/cookies'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { useState } from 'react'
import Trans from '../translation/trans/TransClient'

export default function DisablePosthogCheckbox() {
  const [isEnabled, setIsEnabled] = useState(
    safeLocalStorage.getItem(POSTHOG_ENABLED_KEY) !== 'false'
  )

  const { t } = useClientTranslation()

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked
    setIsEnabled(newValue)
    safeLocalStorage.setItem(POSTHOG_ENABLED_KEY, String(newValue))

    // When re-enabling PostHog, reset to exempted mode
    if (newValue) {
      const currentCustomChoiceRaw = safeLocalStorage.getItem(
        COOKIE_CUSTOM_CHOICE_KEY
      )
      let currentCustomChoice: Record<string, boolean> = {}
      try {
        currentCustomChoice = currentCustomChoiceRaw
          ? (JSON.parse(currentCustomChoiceRaw) as Record<string, boolean>)
          : {}
      } catch {
        // Ignore parsing errors
      }

      currentCustomChoice[CookieConsentKey.posthog] = false

      safeLocalStorage.setItem(
        COOKIE_CUSTOM_CHOICE_KEY,
        JSON.stringify(currentCustomChoice)
      )

      // Set consent mode to custom if not already set
      const currentConsent = safeLocalStorage.getItem(
        COOKIE_CONSENT_KEY
      ) as CookieChoice | null
      if (!currentConsent || currentConsent === CookieChoice.all) {
        safeLocalStorage.setItem(COOKIE_CONSENT_KEY, CookieChoice.custom)
      }
    }

    window.dispatchEvent(new CustomEvent('posthog-enabled-change'))
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
