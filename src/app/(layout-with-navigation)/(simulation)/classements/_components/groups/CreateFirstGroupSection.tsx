import { classementCreateGroup } from '@/constants/tracking/pages/classements'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Container from '@/design-system/layout/Container'
import { linkToGroupCreation } from '@/helpers/navigation/groupPages'

export default function CreateFirstGroupSection() {
  return (
    <Container className="rounded-xl bg-gray-100 p-4">
      <h2 className="mb-2 mt-0 text-lg font-medium">
        <NGCTrans>Créez votre premier groupe</NGCTrans>
      </h2>
      <p className="mb-6 text-sm">
        <NGCTrans>
          Invitez vos proches pour comparer vos résultats. Cela prend
        </NGCTrans>{' '}
        <strong className="text-secondary-700">
          <NGCTrans>1 minute</NGCTrans>
        </strong>{' '}
        !
      </p>
      <ButtonLink
        href={linkToGroupCreation}
        trackingEvent={classementCreateGroup}
        data-cypress-id="button-create-first-group">
        <NGCTrans>Commencer</NGCTrans>
      </ButtonLink>
    </Container>
  )
}
