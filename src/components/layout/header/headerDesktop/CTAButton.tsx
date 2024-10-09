'use client'

import Trans from '@/components/translation/Trans'
import {
  headerClickCtaCommencer,
  headerClickCtaReprendre,
  headerClickCtaResultats,
} from '@/constants/tracking/layout'
import { HIDE_CTA_PATHS } from '@/constants/urls'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useCurrentSimulation } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { usePathname } from 'next/navigation'

export default function CTAButton() {
  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  const { progression } = useCurrentSimulation()

  const pathname = usePathname()

  if (HIDE_CTA_PATHS.some((path) => pathname.includes(path))) {
    return null
  }

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
