'use client'

import Baseline from '@/components/organisations/Baseline'
import Trans from '@/components/translation/trans/TransClient'
import { classementCreateOrganisation } from '@/constants/tracking/pages/classements'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import type { Organisation } from '@/types/organisations'
import { trackEvent } from '@/utils/analytics/trackEvent'

type Props = {
  organisations?: Organisation[]
}

export default function CreateOrganisation({
  organisations: [organisation] = [],
}: Props) {
  if (organisation) {
    return null
  }

  return (
    <>
      <div className="max-w-3xl">
        <Baseline />
      </div>

      <ButtonLink
        className="font-bold"
        href="/organisations/connexion"
        onClick={() => trackEvent(classementCreateOrganisation)}>
        <Trans>Créer mon organisation</Trans>
      </ButtonLink>
    </>
  )
}
