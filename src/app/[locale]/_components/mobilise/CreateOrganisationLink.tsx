'use client'

import Trans from '@/components/translation/trans/TransClient'
import { createOrganisationLink } from '@/constants/tracking/pages/mainLanding'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { trackEvent } from '@/utils/analytics/trackEvent'

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
