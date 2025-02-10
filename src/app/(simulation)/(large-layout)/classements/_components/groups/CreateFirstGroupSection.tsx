import Trans from '@/components/translation/Trans'
import { linkToGroupCreation } from '@/constants/group'
import { classementCreateGroup } from '@/constants/tracking/pages/classements'
import ButtonLink from '@/design-system/inputs/ButtonLink'

export default function CreateFirstGroupSection() {
  return (
    <section className="mt-4">
      <p className="mb-6">
        <strong className="text-secondary-700">
          <Trans>Créez votre premier groupe</Trans>
        </strong>{' '}
        <Trans>
          et invitez vos proches pour comparer vos résultats. Cela prend
        </Trans>{' '}
        <strong className="text-secondary-700">
          <Trans>1 minute</Trans>
        </strong>{' '}
        !
      </p>
      <ButtonLink
        href={linkToGroupCreation}
        trackingEvent={classementCreateGroup}
        data-cypress-id="button-create-first-group">
        <Trans>Commencer</Trans>
      </ButtonLink>
    </section>
  )
}
