'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { captureLearnMoreCarbonLink } from '@/constants/tracking/trackers'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreCarbonLink() {
  return (
    <Link
      href="/empreinte-carbone"
      onClick={() => {
        trackEvent(captureLearnMoreCarbonLink)
      }}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte carbone</Trans>
    </Link>
  )
}
