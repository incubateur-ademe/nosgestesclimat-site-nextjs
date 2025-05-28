'use client'

import Trans from '@/components/translation/trans/TransClient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    Tally: {
      openPopup: (formId: string) => void
    }
  }
}

const FORM_ID = process.env.NEXT_PUBLIC_TALLY_FORM_ID
const SHOW_POPUP_TIMEOUT = 5000

export default function TallyForm() {
  const { t } = useClientTranslation()
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const { simulations } = useUser()

  useEffect(() => {
    // Open form only for new users, that have only one simulation
    if (FORM_ID && simulations && simulations.length === 1)
      timeoutRef.current = setTimeout(() => {
        window.Tally.openPopup(FORM_ID)
      }, SHOW_POPUP_TIMEOUT)

    return () => clearTimeout(timeoutRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <button
      data-testid="wave-button"
      data-tally-open="mB5xAN"
      data-tally-emoji-text="👋"
      data-tally-emoji-animation="wave"
      className="fixed right-2 bottom-17 z-[10000] h-13 w-13 rounded-full border border-gray-300 bg-white text-3xl shadow-sm transition-colors hover:bg-gray-100 md:bottom-2">
      <span className="sr-only">
        <Trans>Donner votre avis</Trans>
      </span>
      <span role="img" aria-label={t('Emoji main qui salue')}>
        👋
      </span>
    </button>
  )
}
