'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/trans/TransClient'
import { learnMoreWaterLink } from '@/constants/tracking/pages/mainLanding'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function LearnMoreCarbonLink() {
  return (
    <Link
      href="/empreinte-eau"
      onClick={() => trackEvent(learnMoreWaterLink)}
      className="text-[13px] md:text-base">
      <TransClient>En savoir plus sur l'empreinte eau</TransClient>
    </Link>
  )
}
