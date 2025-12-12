'use client'

import GlassesIcon from '@/components/icons/GlassesIcon'
import Trans from '@/components/translation/trans/TransClient'
import { profilClickTutoriel } from '@/constants/tracking/pages/profil'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { getLinkToTutoriel } from '@/helpers/navigation/simulateurPages'
import { useLocale } from '@/hooks/useLocale'
import { useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
}

export default function TutorialLink({ className }: Props) {
  const locale = useLocale()
  const searchParams = useSearchParams()

  return (
    <ButtonLink
      color="text"
      href={getLinkToTutoriel({ locale, searchParams })}
      className={twMerge('flex w-full justify-center', className)}
      trackingEvent={profilClickTutoriel}>
      <GlassesIcon className="fill-primary-700 mr-2" />

      <span>
        <Trans>Revoir le tutoriel</Trans>
      </span>
    </ButtonLink>
  )
}
