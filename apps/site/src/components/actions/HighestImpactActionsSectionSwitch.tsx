'use client'

import { useFeatureFlag } from '@/hooks/useFeatureFlag'

interface HighestImpactActionsSectionSwitchProps {
  /** Rendered for the control group, and until the flag resolves client-side */
  control: React.ReactNode
  /** Rendered for the `test-fond-blanc` variant */
  testWhiteBackground: React.ReactNode
  /** Rendered for the `test-fond-bleu` variant */
  testDarkBackground: React.ReactNode
}

/**
 * Picks the "highest impact actions" layout for the `abc-test-layout-catalogue`
 * A/B test.
 *
 * Both layouts are server-rendered and handed over as props so that neither
 * branch has to become a client component. The flag is only readable in the
 * browser, so the control layout is rendered until it resolves — variant users
 * briefly see the control one.
 */
export default function HighestImpactActionsSectionSwitch({
  control,
  testWhiteBackground,
  testDarkBackground,
}: HighestImpactActionsSectionSwitchProps) {
  const variant = useFeatureFlag('abc-test-layout-catalogue')

  switch (variant) {
    case 'test-fond-blanc':
      return testWhiteBackground
    case 'test-fond-bleu':
      return testDarkBackground
    case 'control':
    case undefined:
      return control
    default:
      variant satisfies never
      return control
  }
}
