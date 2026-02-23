'use client'

import Trans from '@/components/translation/trans/TransClient'
import ButtonLink from '@/design-system/buttons/ButtonLink'

export default function CreateOrganisationLink() {
  return (
    <ButtonLink
      color="secondary"
      href="/organisations">
      <Trans>Créer une campagne</Trans>
    </ButtonLink>
  )
}
