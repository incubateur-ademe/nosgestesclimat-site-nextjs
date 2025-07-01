'use client'

import Trans from '@/components/translation/trans/TransClient'
import { usePostHog } from 'posthog-js/react'
import { useEffect, useState } from 'react'

export function cookieConsentGiven() {
  if (!localStorage.getItem('cookie_consent')) {
    return 'undecided'
  }
  return localStorage.getItem('cookie_consent')
}

export default function PostHogCookieConsentButton() {
  const [consentGiven, setConsentGiven] = useState('')
  const posthog = usePostHog()

  useEffect(() => {
    // We want this to only run once the client loads
    // or else it causes a hydration error
    setConsentGiven(cookieConsentGiven() ?? '')
  }, [])

  useEffect(() => {
    if (consentGiven !== '') {
      posthog.set_config({
        persistence: consentGiven === 'yes' ? 'localStorage+cookie' : 'memory',
      })
    }
  }, [consentGiven, posthog])

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'yes')
    setConsentGiven('yes')
  }

  const handleDeclineCookies = () => {
    localStorage.setItem('cookie_consent', 'no')
    setConsentGiven('no')
  }

  return (
    <div>
      {consentGiven === 'undecided' && (
        <div>
          <p>
            <Trans>
              Nous utilisons des cookies pour comprendre comment vous utilisez
              le produit et nous aider à l'améliorer. Si vous ne souhaitez pas
              être suivis, vous pouvez les refuser.
            </Trans>
          </p>
          <button type="button" onClick={handleAcceptCookies}>
            <Trans>Accepter les cookies</Trans>
          </button>
          <span> </span>
          <button type="button" onClick={handleDeclineCookies}>
            <Trans>Refuser les cookies</Trans>
          </button>
        </div>
      )}
    </div>
  )
}
