import { DEFAULT_TEST_VARIANT_KEY } from '@/constants/ab-test'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

export const useIsTestVersion = (variantKey: string) => {
  const flagValue = useFeatureFlagVariantKey(variantKey)

  console.log('AB test: ', flagValue, ' selected for', variantKey)

  // Disable the AB testing in the preview environments
  if (
    process.env.NEXT_PUBLIC_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_ENV !== 'pre-production' &&
    process.env.NEXT_PUBLIC_ENV !== 'development'
  ) {
    return false
  }

  return flagValue && flagValue === DEFAULT_TEST_VARIANT_KEY
}
