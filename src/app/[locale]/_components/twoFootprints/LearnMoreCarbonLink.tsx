'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import {
  learnMoreCarbonLink,
  learnMoreCarbonLinkPosthog,
} from '@/constants/tracking/pages/mainLanding'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreCarbonLink() {
  return (
    <Link
      href="/empreinte-carbone"
      onClick={() => {
        trackEvent(learnMoreCarbonLink)
        trackPosthogEvent(learnMoreCarbonLinkPosthog)
      }}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte carbone</Trans>
    </Link>
  )
}
