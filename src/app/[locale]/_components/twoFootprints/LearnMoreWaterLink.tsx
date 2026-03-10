'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { learnMoreWaterLink } from '@/constants/tracking/pages/mainLanding'
import { captureLearnMoreWaterLink } from '@/constants/tracking/posthogTrackers'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreWaterLink() {
  return (
    <Link
      href="/empreinte-eau"
      onClick={() => {
        trackEvent(learnMoreWaterLink)
        trackPosthogEvent(captureLearnMoreWaterLink)
      }}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte eau</Trans>
    </Link>
  )
}
