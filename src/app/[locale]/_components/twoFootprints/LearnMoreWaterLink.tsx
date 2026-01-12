'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { learnMoreWaterLink } from '@/helpers/tracking/landings'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreCarbonLink() {
  return (
    <Link
      href="/empreinte-eau"
      onClick={() => {
        const tracking = learnMoreWaterLink()
        trackEvent(tracking.matomo, tracking.posthog)
      }}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte eau</Trans>
    </Link>
  )
}
