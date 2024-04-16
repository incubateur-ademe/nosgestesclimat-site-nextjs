'use client'

import Link from '@/components/Link'
import Baseline from '@/components/organisations/Baseline'
import Trans from '@/components/translation/Trans'
import { classementCreateOrganisation } from '@/constants/tracking/pages/classements'
import { Organisation } from '@/types/organisations'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  organisation?: Organisation
}

export default function CreateOrganisation({ organisation }: Props) {
  if (organisation) {
    return null
  }

  return (
    <>
      <p className="max-w-3xl">
        <Baseline />
      </p>

      <Link
        className="font-bold"
        href="/organisations/connexion"
        onClick={() => trackEvent(classementCreateOrganisation)}>
        <Trans>Créer mon organisation</Trans>
      </Link>
    </>
  )
}
