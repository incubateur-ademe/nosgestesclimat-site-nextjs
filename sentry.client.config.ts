// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://75dcf9dfe74c4439977a517be2805122@sentry.incubateur.net/118',

  // Only for previews including preprod
  debug: process.env.NODE_ENV !== 'production',

  sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,

  // Disable sentry for development based on local data
  enabled: process.env.NODE_ENV !== 'development',
})
