import * as Sentry from '@sentry/nextjs'
import posthog from 'posthog-js'

declare global {
  interface Window {
    posthog?: typeof posthog
  }
}

Sentry.init({
  dsn: 'https://75dcf9dfe74c4439977a517be2805122@sentry.incubateur.net/118',

  // Only for previews including preprod
  debug: process.env.NODE_ENV !== 'production',

  sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,

  // Disable sentry for development based on local data
  enabled: process.env.NODE_ENV !== 'development',
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart

if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // @TODO: update this date when able to install a newer version of posthog-js
    cookieless_mode: 'on_reject',
    defaults: '2025-05-24',
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: true,
    custom_campaign_params: [
      'mtm_campaign',
      'mtm_kwd',
      'mtm_keyword',
      'organisation',
      'poll',
    ],
  })

  // Expose posthog globally for inline scripts
  if (typeof window !== 'undefined') {
    window.posthog = posthog
  }
}
