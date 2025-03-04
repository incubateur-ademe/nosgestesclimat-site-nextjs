'use client'

import Trans from '@/components/translation/Trans'
import { trackingActionClickCTAMenu } from '@/constants/tracking/actions'
import { HIDE_CTA_PATHS } from '@/constants/urls'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import {
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useCurrentSimulation } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { usePathname } from 'next/navigation'

export default function MenuCTAButton() {
  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  const { progression } = useCurrentSimulation()

  const pathname = usePathname()

  if (HIDE_CTA_PATHS.some((path) => pathname?.includes(path))) {
    return null
  }

  return (
    <ButtonLink
      size="sm"
      href={getLinkToSimulateurPage()}
      onClick={() => {
        if (progression === 1) {
          trackEvent(
            getLandingClickCTAResults(pathname, trackingActionClickCTAMenu)
          )
          return
        }

        if (progression > 0) {
          trackEvent(
            getLandingClickCTAResume(pathname, trackingActionClickCTAMenu)
          )
          return
        }

        trackEvent(
          getLandingClickCTAStart(pathname, trackingActionClickCTAMenu)
        )
      }}>
      <Trans>{linkToSimulateurPageLabel}</Trans>
    </ButtonLink>
  )
}
