import { DEFAULT_TEST_VARIANT_KEY } from '@/constants/ab-test'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

export const useIsTestVersion = (variantKey: string) => {
  if (process.env.NEXT_PUBLIC_FORCE_AB_TEST === 'true') {
    return true
  }
  if (process.env.NEXT_PUBLIC_FORCE_AB_TEST === 'false') {
    return false
  }

  const flagValue = useFeatureFlagVariantKey(variantKey)

  // console.log('AB test: ', flagValue, ' selected for', variantKey)

  return flagValue && flagValue === DEFAULT_TEST_VARIANT_KEY
}
