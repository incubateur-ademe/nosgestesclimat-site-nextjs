'use client'

import Trans from '@/components/translation/Trans'
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
      <GroupList groups={groups} />

      <Separator className="mb-4 mt-8" />

      <h3 className="text-md mb-1 font-bold">
        <Trans>Créez un autre groupe</Trans>
      </h3>

      <p className="mb-6 text-sm">
        <Trans>Vous pouvez créer un nouveau groupe avec d’autres amis.</Trans>
      </p>

      <div>
        <ButtonLink
          href={'/amis/creer'}
          color="secondary"
          data-cypress-id="button-create-other-group">
          <Trans>Créer un autre groupe</Trans>
        </ButtonLink>
      </div>
    </>
  )
}
