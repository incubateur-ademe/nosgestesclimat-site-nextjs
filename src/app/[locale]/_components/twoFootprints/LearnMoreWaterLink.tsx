'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { learnMoreWaterLink } from '@/constants/tracking/pages/mainLanding'
import { learnMoreWaterLinkPosthog } from '@/helpers/tracking/landings'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreCarbonLink() {
  return (
    <Link
      href="/empreinte-eau"
      onClick={() => {
        trackEvent(learnMoreWaterLink)
        trackPosthogEvent(learnMoreWaterLinkPosthog)
      }}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte eau</Trans>
    </Link>
  )
}
