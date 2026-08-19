'use client'

import { getClientCookie } from '@/utils/cookie'
import posthog from 'posthog-js'
import { FF_COOKIE_NAME } from './constants'
import type { FeatureFlagName, FeatureFlagValue } from './flags'
import { parseFeatureFlagCookie } from './urlParams'

/**
 * Resolves a feature flag in the browser.
 *
 * Reading a flag through PostHog is also what emits its `$feature_flag_called`
 * exposure event, so callers that only need that side effect may discard the
 * return value. Overridden flags deliberately never reach PostHog: a session
 * forcing a variant by hand must not be enrolled in the experiment.
 */
export function resolveFlagValue<K extends FeatureFlagName>(
  flag: K
): FeatureFlagValue<K> | undefined {
  const raw = getClientCookie(FF_COOKIE_NAME)
  const overrides = parseFeatureFlagCookie(raw)
  if (flag in overrides) return overrides[flag] as FeatureFlagValue<K>
  return posthog.getFeatureFlag(flag) as FeatureFlagValue<K> | undefined
}
