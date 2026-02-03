'use client'

import Trans from '@/components/translation/trans/TransClient'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIframe } from '@/hooks/useIframe'
import { useLocale } from '@/hooks/useLocale'
import i18nConfig from '@/i18nConfig'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import isMobile from 'is-mobile'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    Tally?: {
      openPopup?: (
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

  // Uncomment this to pass the feature flag key to Tally
  // const isTestVersion = useIsTestVersion(HERO_SECTION_FLAG_KEY)

  const isFrench = useLocale() === i18nConfig.defaultLocale
  const FORM_ID =
    (isFrench
      ? process.env.NEXT_PUBLIC_TALLY_FORM_ID
      : process.env.NEXT_PUBLIC_TALLY_FORM_ID_EN) ?? ''

  // Add hidden fields parameters to URL for Tally
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    // Uncomment this to pass the feature flag key to Tally
    // params.set('featureFlagKey', HERO_SECTION_FLAG_KEY)
    // params.set('abTestVariant', isTestVersion ? 'test' : 'control')

    params.set('deviceType', isMobile() ? 'mobile' : 'desktop')
    params.set('iframe', isIframe ? 'true' : 'false')

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', newUrl)
  }, [isIframe])

  const handleOpenForm = () => {
    if (!window.Tally?.openPopup) return

    window.Tally.openPopup(FORM_ID, {})
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
      aria-label={t('endPage.tallyForm.buttonLabel', 'Donner votre avis')}
      title={t('endPage.tallyForm.buttonLabel', 'Donner votre avis')}
      className="focus:ring-primary-700 fixed right-2 bottom-17 z-[10000] h-13 w-13 rounded-full border border-gray-300 bg-white text-3xl shadow-sm transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-offset-3 focus:outline-hidden md:bottom-2">
      <span className="sr-only">
        <Trans i18nKey="endPage.tallyForm.buttonLabel">Donner votre avis</Trans>
      </span>
      <span>
        <Emoji className="ml-2 block w-7">👋</Emoji>
      </span>
    </button>
  )
}
