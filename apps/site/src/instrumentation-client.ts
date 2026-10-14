import * as Sentry from '@sentry/nextjs'
import { APP_ENV } from './env/app-env'
import { publicEnv } from './env/public'
import { registerUncaughtErrorHandlers } from './observability/uncaught-errors'
import { PostHog } from './services/tracking/Posthog'

Sentry.init({
  dsn: publicEnv.NEXT_PUBLIC_SENTRY_DSN,
  environment: APP_ENV,
  // Same release as `service.version`: one string to join spans, lines and
  // issues. Inlined at build time — the browser cannot read `SOURCE_VERSION`.
  release: process.env.NEXT_PUBLIC_APP_VERSION,
  sampleRate: 1,
  // `GlobalHandlers` and `BrowserApiErrors` capture on their own, and without a
  // scope: our window listeners are the only capture path, as on the server.
  integrations: (integrations) =>
    integrations.filter(
      (integration) =>
        !['GlobalHandlers', 'BrowserApiErrors', 'TryCatch'].includes(
          integration.name
        )
    ),
  // A tenth of the survivors is enough to see a trend.
  beforeSend: (event) => (Math.random() < 0.1 ? event : null),
  enabled: process.env.NODE_ENV !== 'development',
})

registerUncaughtErrorHandlers()

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart

new PostHog().init()
