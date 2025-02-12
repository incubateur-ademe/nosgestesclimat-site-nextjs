'use client'

import Trans from '@/components/translation/Trans'
import { createOrganisationLink } from '@/constants/tracking/pages/mainLanding'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function CreateOrganisationLink() {
  return (
    <ButtonLink
      color="secondary"
      href="/organisations"
      onClick={() => trackEvent(createOrganisationLink)}>
      <Trans>Créer une campagne</Trans>
    </ButtonLink>
  )
}
