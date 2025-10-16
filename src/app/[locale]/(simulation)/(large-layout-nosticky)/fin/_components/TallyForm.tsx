'use client'

import Trans from '@/components/translation/trans/TransClient'
import { DONT_KNOW_FEATURE_FLAG_KEY } from '@/constants/ab-test'
import { useIsTestVersion } from '@/hooks/abTesting/useIsTestVersion'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIframe } from '@/hooks/useIframe'
import { useLocale } from '@/hooks/useLocale'
import i18nConfig from '@/i18nConfig'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import isMobile from 'is-mobile'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    Tally: {
      openPopup: (
        formId: string,
        options: {
          emoji?: {
            text: string
            animation?: string
          }
        }
      ) => void
    }
  }
}

const SHOW_POPUP_TIMEOUT = 10_000
const TALLY_SEEN_KEY = 'tally-seen'

export default function TallyForm() {
  const { t } = useClientTranslation()
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const { isIframe } = useIframe()

  const isFrench = useLocale() === i18nConfig.defaultLocale
  const FORM_ID =
    (isFrench
      ? process.env.NEXT_PUBLIC_TALLY_FORM_ID
      : process.env.NEXT_PUBLIC_TALLY_FORM_ID_EN) ?? ''

  const isTestVersion = useIsTestVersion(DONT_KNOW_FEATURE_FLAG_KEY)

  // Add hidden fields parameters to URL for Tally
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set('featureFlagKey', DONT_KNOW_FEATURE_FLAG_KEY)
    params.set('abTestVariant', isTestVersion ? 'test' : 'control')
    params.set('deviceType', isMobile() ? 'mobile' : 'desktop')
    params.set('iframe', isIframe ? 'true' : 'false')

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', newUrl)
  }, [isTestVersion, isIframe])

  const handleOpenForm = () => {
    window.Tally.openPopup(FORM_ID, {
      emoji: {
        text: '👋',
        animation: 'wave',
      },
    })
    safeLocalStorage.setItem(TALLY_SEEN_KEY, 'true')
  }

  useEffect(() => {
    if (safeLocalStorage.getItem(TALLY_SEEN_KEY)) return
    // Open form only for new users, that have only one simulation
    timeoutRef.current = setTimeout(() => handleOpenForm(), SHOW_POPUP_TIMEOUT)

    return () => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!FORM_ID) return null

  return (
    <button
      data-testid="wave-button"
      onClick={handleOpenForm}
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
