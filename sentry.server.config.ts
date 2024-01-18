// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://75dcf9dfe74c4439977a517be2805122@sentry.incubateur.net/118',

  enableTracing: false,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  sampleRate: 0.1,

  // Disable sentry for development based on local data
  enabled: !process.env.NEXT_PUBLIC_LOCAL_DATA,
})
