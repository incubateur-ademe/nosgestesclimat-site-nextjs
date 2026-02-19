'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import {
  learnMoreCarbonLinkPosthog,
} from '@/constants/tracking/pages/mainLanding'
import { trackPosthogEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreCarbonLink() {
  return (
    <Link
      href="/empreinte-carbone"
      onClick={() => {
        trackPosthogEvent(learnMoreCarbonLinkPosthog)
      }}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte carbone</Trans>
    </Link>
  )
}
