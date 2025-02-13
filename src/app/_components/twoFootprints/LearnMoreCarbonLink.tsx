'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { learnMoreCarbonLink } from '@/constants/tracking/pages/mainLanding'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreCarbonLink() {
  return (
    <Link
      href="/empreinte-carbone"
      onClick={() => trackEvent(learnMoreCarbonLink)}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte carbone</Trans>
    </Link>
  )
}
