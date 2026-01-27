'use client'
import { useCookieConsent } from '@/components/cookies/CookieConsentProvider'
import Trans from '@/components/translation/trans/TransClient'

export default function CookieButton() {
  const { setIsBoardOpen } = useCookieConsent()

  return (
    <button
      data-testid="cookie-footer-button"
      className="text-primary-700 focus:ring-primary-700 text-xs underline focus:ring-2 focus:ring-offset-3 focus:outline-hidden"
      onClick={() => setIsBoardOpen(true)}>
      <Trans>Gestion des cookies</Trans>
    </button>
  )
}
