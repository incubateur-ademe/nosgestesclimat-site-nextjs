'use client'

import { POSTHOG_ENABLED_KEY } from '@/constants/state/cookies'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { useEffect, useState } from 'react'
import Trans from '../translation/trans/TransClient'

export default function DisablePosthogCheckbox() {
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    const storedValue = safeLocalStorage.getItem(POSTHOG_ENABLED_KEY)
    setIsEnabled(storedValue === 'true')
  }, [])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked
    setIsEnabled(newValue)
    safeLocalStorage.setItem(POSTHOG_ENABLED_KEY, String(newValue))

    window.dispatchEvent(new CustomEvent('posthog-enabled-change'))
  }

  return (
    <label className="mb-6 flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={isEnabled}
        onChange={handleCheckboxChange}
      />
      <span>
        <Trans>
          Vous n'êtes pas exclu(e). Décochez cette case pour désactiver
          complètement le suivi avec Posthog
        </Trans>
      </span>
    </label>
  )
}
