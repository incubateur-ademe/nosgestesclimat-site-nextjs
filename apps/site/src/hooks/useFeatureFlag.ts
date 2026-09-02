'use client'

import type {
  FeatureFlagName,
  FeatureFlagValue,
} from '@/services/feature-flags/flags'
import { resolveFlagValue } from '@/services/feature-flags/resolveFlagValue'
import posthog from 'posthog-js'
import { useEffect, useState } from 'react'

export function useFeatureFlag<K extends FeatureFlagName>(
  flag: K
): FeatureFlagValue<K> | undefined {
  const [value, setValue] = useState<FeatureFlagValue<K> | undefined>(undefined)

  useEffect(() => {
    setValue(resolveFlagValue(flag))
    const unsubscribe = posthog?.onFeatureFlags(() =>
      setValue(resolveFlagValue(flag))
    )
    return () => {
      unsubscribe?.()
    }
  }, [flag])

  return value
}
