'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { createOrganisationLink } from '@/constants/tracking/pages/mainLanding'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function CreateOrganisationLink() {
  return (
    <ButtonLink
      color="secondary"
      href="/organisations"
      onClick={() => trackEvent(createOrganisationLink)}>
      <TransClient>Créer une campagne</TransClient>
    </ButtonLink>
  )
}
