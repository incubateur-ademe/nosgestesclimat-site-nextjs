'use client'

import CheckboxInput from '@/design-system/inputs/CheckboxInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEffect, useState } from 'react'
import { useCookieManagement } from '../cookies/useCookieManagement'

export default function DisablePosthogCheckbox() {
  const { cookieState, onChange } = useCookieManagement()

  // Hydration fix: Initialize with server default (true) to match SSR
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    setIsEnabled(cookieState.posthog !== 'do_not_track')
  }, [cookieState.posthog])

  const { t } = useClientTranslation()

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked
    setIsEnabled(newValue)
    onChange({
      ...cookieState,
      posthog: newValue ? 'refused' : 'do_not_track',
    })
  }

  return (
    <label
      htmlFor="posthog-checkbox"
      aria-label={t(
        'privacyPolicy.posthogCheckboxLabel',
        'Désactiver le suivi Posthog'
      )}
      className="mb-6 flex cursor-pointer items-center gap-2">
      <CheckboxInput
        id="posthog-checkbox"
        data-testid="posthog-tracking-checkbox"
        type="checkbox"
        value={isEnabled}
        onChange={handleCheckboxChange}
        label={t(
          'privacyPolicy.posthogCheckboxText',
          "Vous n'êtes pas exclu(e). Décochez cette case pour désactiver complètement le suivi avec Posthog"
        )}
      />
    </label>
  )
}
