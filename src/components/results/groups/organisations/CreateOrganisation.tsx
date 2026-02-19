'use client'

import Baseline from '@/components/organisations/Baseline'
import Trans from '@/components/translation/trans/TransClient'
import ButtonLink from '@/design-system/buttons/ButtonLink'

export default function CreateOrganisation() {
  return (
    <>
      <div className="max-w-3xl" data-testid="create-organisation">
        <Baseline />
      </div>

      <ButtonLink
        className="font-bold"
        href="/organisations/creer">
        <Trans>Créer mon organisation</Trans>
      </ButtonLink>
    </>
  )
}
