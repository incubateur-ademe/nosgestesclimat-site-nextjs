'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { captureLearnMoreWaterLink } from '@/constants/trackers'
import { trackPosthogEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreWaterLink() {
  return (
    <Link
      href="/empreinte-eau"
      onClick={() => {
        trackPosthogEvent(captureLearnMoreWaterLink)
      }}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte eau</Trans>
    </Link>
  )
}
