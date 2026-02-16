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
    person_profiles: 'identified_only', // we only identify users if they explicitly give their consent trough the cookie banner
    defaults: '2025-11-30', // @TODO: last available date for the SDK we use. To be updated when being able to install a newer version of posthog-js (today restricted by minimumReleaseAge protection).
    autocapture: false, // Disable automatic event capture, as we capture manually. So we can control the events we send (and reduce our billing)
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually to be more precise on iframe detections and referrer sources
    capture_pageleave: true, // Enable pageleave capture
    custom_campaign_params: [
      'mtm_campaign',
      'mtm_kwd',
      'mtm_keyword',
      'organisation',
      'poll',
    ], // Enable to set query parameters as properties on the events
  })

  // Expose posthog globally for inline scripts
  if (typeof window !== 'undefined') {
    window.posthog = posthog
  }
}
