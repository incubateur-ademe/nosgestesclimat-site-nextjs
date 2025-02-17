'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { linkToGroupCreation } from '@/constants/group'
import { classementCreateGroup } from '@/constants/tracking/pages/classements'
import ButtonLink from '@/design-system/inputs/ButtonLink'

export default function CreateFirstGroupSection() {
  return (
    <section className="mt-4">
      <p className="mb-6">
        <strong className="text-secondary-700">
          <TransClient>Créez votre premier groupe</TransClient>
        </strong>{' '}
        <TransClient>
          et invitez vos proches pour comparer vos résultats. Cela prend
        </TransClient>{' '}
        <strong className="text-secondary-700">
          <TransClient>1 minute</TransClient>
        </strong>{' '}
        !
      </p>
      <ButtonLink
        href={linkToGroupCreation}
        trackingEvent={classementCreateGroup}
        data-cypress-id="button-create-first-group">
        <TransClient>Commencer</TransClient>
      </ButtonLink>
    </section>
  )
}
