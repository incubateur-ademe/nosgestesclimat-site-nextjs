'use client'

import Trans from '@/components/translation/Trans'
import {
  headerClickCtaCommencer,
  headerClickCtaReprendre,
  headerClickCtaResultats,
} from '@/constants/tracking/layout'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useCurrentSimulation } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function CTAButton() {
  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  const { progression } = useCurrentSimulation()

  return (
    <ButtonLink
      size="sm"
      href={getLinkToSimulateurPage()}
      onClick={() => {
        if (progression === 1) {
          trackEvent(headerClickCtaResultats)
          return
        }

        if (progression > 0) {
          trackEvent(headerClickCtaReprendre)
          return
        }

        trackEvent(headerClickCtaCommencer)
      }}>
      <Trans>{linkToSimulateurPageLabel}</Trans>
    </ButtonLink>
  )
}
