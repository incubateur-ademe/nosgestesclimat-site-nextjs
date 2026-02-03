'use client'

import Baseline from '@/components/organisations/Baseline'
import Trans from '@/components/translation/trans/TransClient'
import { classementCreateOrganisation } from '@/constants/tracking/pages/classements'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function CreateOrganisation() {
  return (
    <>
      <div className="max-w-3xl" data-testid="create-organisation">
        <Baseline />
      </div>

      <ButtonLink
        className="font-bold"
        href="/organisations/creer"
        onClick={() => trackEvent(classementCreateOrganisation)}>
        <Trans>Créer mon organisation</Trans>
      </ButtonLink>
    </>
  )
}
