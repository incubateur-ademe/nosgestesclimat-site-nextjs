'use client'

import GlassesIcon from '@/components/icons/GlassesIcon'
import Trans from '@/components/translation/Trans'
import { profilClickTutoriel } from '@/constants/tracking/pages/profil'
import ButtonLink from '@/design-system/inputs/ButtonLink'

export default function TutorialLink() {
  return (
    <ButtonLink
      color="text"
      href="/tutoriel"
      className="flex justify-center"
      trackingEvent={profilClickTutoriel}>
      <GlassesIcon className="mr-2 fill-primary-700" />

      <span>
        <Trans>Revoir le tutoriel</Trans>
      </span>
    </ButtonLink>
  )
}
