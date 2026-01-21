'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { trackLearnMoreCarbonLink } from '@/helpers/tracking/landings'

export default function LearnMoreCarbonLink() {
  return (
    <Link
      href="/empreinte-carbone"
      onClick={trackLearnMoreCarbonLink}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte carbone</Trans>
    </Link>
  )
}
