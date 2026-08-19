'use client'

import type { FeatureFlagName } from '@/services/feature-flags/flags'
import { resolveFlagValue } from '@/services/feature-flags/resolveFlagValue'
import posthog from 'posthog-js'

/**
 * Flags are fetched asynchronously. Without a ceiling, a blocked or failing
 * request would hold every gated event back for the whole session, so we give
 * up waiting and capture anyway — those events just fall outside the experiment.
 *
 * A quick test on a review app revealed that on a full page refresh it takes 2.8s on average,
 * but usually flags are loaded before due to client-side navigation.
 */
export const FLAGS_TIMEOUT_MS = 4_000

let flagsReady: Promise<void> | undefined

function whenFeatureFlagsReady(): Promise<void> {
  flagsReady ??= new Promise<void>((resolve) => {
    // `featureFlags` is only guaranteed once `posthog.init()` has run, and we
    // defer that behind an IntersectionObserver for iframes — so it may still
    // be missing here, whatever the published types say.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (posthog.featureFlags?.hasLoadedFlags) {
      resolve()
      return
    }

    // Held on an object so the synchronous case below stays visible to the
    // type checker.
    const listener: { settled: boolean; unsubscribe?: () => void } = {
      settled: false,
    }

    const settle = () => {
      listener.settled = true
      clearTimeout(timeout)
      listener.unsubscribe?.()
      resolve()
    }

    const timeout = setTimeout(settle, FLAGS_TIMEOUT_MS)
    listener.unsubscribe = posthog.onFeatureFlags(settle)
    // PostHog calls back synchronously when it has no feature flag support at
    // all — `settle` then ran before it could release the handle itself.
    if (listener.settled) listener.unsubscribe()
  })

  return flagsReady
}

/**
 * Waits for PostHog to load its flags, then reads the given experiments so that
 * their `$feature_flag_called` exposure events are emitted.
 *
 * Await this before capturing an event that an experiment uses as a metric.
 * PostHog only counts metric events that occur *after* a user's exposure event,
 * and posthog-js only stamps `$feature/<flag>` properties onto events once the
 * flags have loaded — an event captured any earlier is dropped from the results.
 */
export async function whenExperimentsResolved(
  flags: FeatureFlagName[]
): Promise<void> {
  await whenFeatureFlagsReady()
  // Called for the exposure side effect only; the values are unused here.
  flags.forEach((flag) => resolveFlagValue(flag))
}
