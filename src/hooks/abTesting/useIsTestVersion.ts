import { DEFAULT_TEST_VARIANT_KEY } from '@/constants/ab-test'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

export const useIsTestVersion = (variantKey: string) => {
  if (process.env.NEXT_PUBLIC_FORCE_AB_TEST === 'true') {
    return true
  }
  if (process.env.NEXT_PUBLIC_FORCE_AB_TEST === 'false') {
    return false
  }

  // @TODO: Remove this eslint-disable-next-line once we have a proper solution for this rule
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const flagValue = useFeatureFlagVariantKey(variantKey)

  // console.log('AB test: ', flagValue, ' selected for', variantKey)

  return flagValue && flagValue === DEFAULT_TEST_VARIANT_KEY
}
