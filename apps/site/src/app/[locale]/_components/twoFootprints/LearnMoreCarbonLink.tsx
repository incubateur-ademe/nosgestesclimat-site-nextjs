'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { captureLearnMoreCarbonLink } from '@/constants/trackers'
import { trackPosthogEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreCarbonLink() {
  return (
    <Link
      href="/empreinte-carbone"
      onClick={() => {
        trackPosthogEvent(captureLearnMoreCarbonLink)
      }}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte carbone</Trans>
    </Link>
  )
}
