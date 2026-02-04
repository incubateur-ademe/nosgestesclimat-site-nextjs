'use client'

import Trans from '@/components/translation/trans/TransClient'
import { trackCreateOrganisationLink } from '@/constants/tracking/pages/mainLanding'
import ButtonLink from '@/design-system/buttons/ButtonLink'

export default function CreateOrganisationLink() {
  return (
    <ButtonLink
      color="secondary"
      href="/organisations"
      onClick={() => trackCreateOrganisationLink()}>
      <Trans>Créer une campagne</Trans>
    </ButtonLink>
  )
}
