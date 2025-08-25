import { DEFAULT_TEST_VARIANT_KEY } from '@/constants/ab-test'
import { getIsIframe } from '@/utils/getIsIframe'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

export const useIsTestVersion = (variantKey: string) => {
  // Always exclude iframes from AB testing
  const isIframe = getIsIframe()

  return (
    !isIframe &&
    useFeatureFlagVariantKey(variantKey) === DEFAULT_TEST_VARIANT_KEY
  )
}
