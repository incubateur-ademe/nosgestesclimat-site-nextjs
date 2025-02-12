'use client'

import { StyledLink } from '@/components/links/StyledLink'
import Trans from '@/components/translation/Trans'
import { learnMoreCarbonLink } from '@/constants/tracking/pages/mainLanding'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function LearnMoreCarbonLink() {
  return (
    <StyledLink
      href="/empreinte-carbone"
      onClick={() => trackEvent(learnMoreCarbonLink)}
      className="text-[13px] md:text-base">
      <Trans>En savoir plus sur l'empreinte carbone</Trans>
    </StyledLink>
  )
}
