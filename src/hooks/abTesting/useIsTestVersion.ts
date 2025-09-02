import { DEFAULT_TEST_VARIANT_KEY } from '@/constants/ab-test'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

export const useIsTestVersion = (variantKey: string) => {
  // Disable the AB testing in the preview environments
  if (
    process.env.NEXT_PUBLIC_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_ENV !== 'development'
  ) {
    return false
  }

  const flagValue = useFeatureFlagVariantKey(variantKey)

  return flagValue && flagValue === DEFAULT_TEST_VARIANT_KEY
}
