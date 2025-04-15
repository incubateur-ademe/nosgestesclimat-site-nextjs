'use client'

import GlassesIcon from '@/components/icons/GlassesIcon'
import Trans from '@/components/translation/trans/TransClient'
import { profilClickTutoriel } from '@/constants/tracking/pages/profil'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
}

export default function TutorialLink({ className }: Props) {
  return (
    <ButtonLink
      color="text"
      href="/tutoriel"
      className={twMerge('flex w-full justify-center', className)}
      trackingEvent={profilClickTutoriel}>
      <GlassesIcon className="fill-primary-700 mr-2" />

      <span>
        <Trans>Revoir le tutoriel</Trans>
      </span>
    </ButtonLink>
  )
}
