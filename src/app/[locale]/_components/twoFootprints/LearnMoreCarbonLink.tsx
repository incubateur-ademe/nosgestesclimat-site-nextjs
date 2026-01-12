'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { learnMoreCarbonLink } from '@/helpers/tracking/landings'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreCarbonLink() {
  return (
    <Link
      href="/empreinte-carbone"
      onClick={() => {
        const tracking = learnMoreCarbonLink()
        trackEvent(tracking.matomo, tracking.posthog)
      }}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte carbone</Trans>
    </Link>
  )
}
