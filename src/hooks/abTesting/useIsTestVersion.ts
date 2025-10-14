import { DEFAULT_TEST_VARIANT_KEY } from '@/constants/ab-test'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

export const useIsTestVersion = (variantKey: string) => {
  const flagValue = useFeatureFlagVariantKey(variantKey)

  console.log('AB test: ', flagValue, ' selected for', variantKey)

  return flagValue && flagValue === DEFAULT_TEST_VARIANT_KEY
}
