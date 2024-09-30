// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://75dcf9dfe74c4439977a517be2805122@sentry.incubateur.net/118',

  // Enable tracing for more detailed performance monitoring
  enableTracing: true,

  // Only for development and previews including preprod
  debug: process.env.NODE_ENV !== 'production',

  // In production keep a 10% sample rate to avoid high costs
  sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,

  // Enable Sentry in all environments for debugging
  enabled: process.env.NODE_ENV !== 'development',
})
