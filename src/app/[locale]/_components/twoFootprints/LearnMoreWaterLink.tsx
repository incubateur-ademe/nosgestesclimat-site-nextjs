'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { trackLearnMoreWaterLink } from '@/helpers/tracking/landings'

export default function LearnMoreCarbonLink() {
  return (
    <Link
      href="/empreinte-eau"
      onClick={trackLearnMoreWaterLink}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte eau</Trans>
    </Link>
  )
}
