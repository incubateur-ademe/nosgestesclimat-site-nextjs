import { DEFAULT_TEST_VARIANT_KEY } from '@/constants/ab-test'
import { getIsIframe } from '@/utils/getIsIframe'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

export const useIsTestVersion = (variantKey: string) => {
  // Always exclude iframes from AB testing
  const isIframe = getIsIframe()

  const flagValue = useFeatureFlagVariantKey(variantKey)

  return !isIframe && flagValue === DEFAULT_TEST_VARIANT_KEY
}
