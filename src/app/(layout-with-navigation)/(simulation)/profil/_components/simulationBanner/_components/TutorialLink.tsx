'use client'

import Trans from '@/components/translation/Trans'
import { profilClickTutoriel } from '@/constants/tracking/pages/profil'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function TutorialLink({ className = '' }) {
  return (
    <ButtonLink
      color="text"
      href="/tutoriel"
      className={className}
      onClick={() => trackEvent(profilClickTutoriel)}>
      <span role="img" aria-label="nerd emoji" className="mr-2 inline-block">
        🤓
      </span>
      <span>
        {' '}
        <Trans>Revoir le tutoriel</Trans>
      </span>
    </ButtonLink>
  )
}
