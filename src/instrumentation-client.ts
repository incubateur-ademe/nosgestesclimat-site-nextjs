import * as Sentry from '@sentry/nextjs'
import posthog from 'posthog-js'

if (process.env.NEXT_PUBLIC_POSTHOG_KEY !== undefined) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    autocapture: false, // Disable automatic event capture, as we capture manually
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    capture_pageleave: true, // Enable pageleave capture
    custom_campaign_params: [
      'mtm_campaign',
      'mtm_kwd',
      'mtm_keyword',
      'organisation',
      'poll',
    ],
  })
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
