'use client'

import TransClient from '@/components/translation/TransClient'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Separator from '@/design-system/layout/Separator'
import { Group } from '@/types/groups'
import GroupList from './GroupList'

export default function CreateOtherGroupsSection({
  groups,
}: {
  groups: Group[]
}) {
  return (
    <>
      <GroupList groups={groups} className="mt-8" />

      <Separator className="mb-4 mt-8" />

      <h3 className="text-md mb-1 font-bold">
        <TransClient>Créez un autre groupe</TransClient>
      </h3>

      <p className="mb-6 text-sm">
        <TransClient>
          Vous pouvez créer un nouveau groupe avec d’autres amis.
        </TransClient>
      </p>

      <ButtonLink
        href={'/groupes/creer'}
        color="secondary"
        data-cypress-id="button-create-other-group">
        <TransClient>Créer un autre groupe</TransClient>
      </ButtonLink>
    </>
  )
}
