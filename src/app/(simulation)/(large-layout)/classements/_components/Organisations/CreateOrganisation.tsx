'use client'

import Baseline from '@/components/organisations/Baseline'
import Trans from '@/components/translation/Trans'
import { classementCreateOrganisation } from '@/constants/tracking/pages/classements'
import ButtonLink from '@/design-system/inputs/ButtonLink'
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

      <ButtonLink
        className="font-bold"
        href="/organisations/connexion"
        onClick={() => trackEvent(classementCreateOrganisation)}>
        <Trans>Créer mon organisation</Trans>
      </ButtonLink>
    </>
  )
}
