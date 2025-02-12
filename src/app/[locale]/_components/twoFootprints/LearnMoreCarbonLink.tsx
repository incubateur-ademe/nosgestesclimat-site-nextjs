'use client'

import { StyledLink } from '@/components/links/StyledLink'
import TransClient from '@/components/translation/trans/TransClient'
import { learnMoreCarbonLink } from '@/constants/tracking/pages/mainLanding'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function LearnMoreCarbonLink() {
  return (
    <StyledLink
      href="/empreinte-carbone"
      onClick={() => trackEvent(learnMoreCarbonLink)}
      className="text-[13px] md:text-base">
      <TransClient>En savoir plus sur l'empreinte carbone</TransClient>
    </StyledLink>
  )
}
