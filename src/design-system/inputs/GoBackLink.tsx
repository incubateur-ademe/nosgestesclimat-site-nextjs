'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { amisCreationClickRetour } from '@/constants/tracking/pages/amisCreation'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function GoBackLink({ className }: { className?: string }) {
  return (
    <Link
      href={linkToClassement}
      onClick={() => trackEvent(amisCreationClickRetour)}
      className={`${className} inline-block px-0 !text-[1rem] text-primary-700 no-underline transition-opacity hover:opacity-80`}>
      ← <Trans>Retour</Trans>
    </Link>
  )
}
