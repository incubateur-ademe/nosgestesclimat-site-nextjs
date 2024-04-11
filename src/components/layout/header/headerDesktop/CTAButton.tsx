'use client'

import Trans from '@/components/translation/Trans'
import {
  headerClickCtaCommencer,
  headerClickCtaReprendre,
  headerClickCtaResultats,
} from '@/constants/tracking/layout'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function CTAButton() {
  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const progression = currentSimulation?.progression || 0

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
