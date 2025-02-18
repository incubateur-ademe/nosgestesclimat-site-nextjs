'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { learnMoreWaterLink } from '@/constants/tracking/pages/mainLanding'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreCarbonLink() {
  return (
    <Link
      href="/empreinte-eau"
      onClick={() => trackEvent(learnMoreWaterLink)}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte eau</Trans>
    </Link>
  )
}
