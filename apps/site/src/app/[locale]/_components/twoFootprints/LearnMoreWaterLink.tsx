'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { captureLearnMoreWaterLink } from '@/constants/tracking/trackers'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreWaterLink() {
  return (
    <Link
      href="/empreinte-eau"
      onClick={() => {
        trackEvent(captureLearnMoreWaterLink)
      }}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte eau</Trans>
    </Link>
  )
}
