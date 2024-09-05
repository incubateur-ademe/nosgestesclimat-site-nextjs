'use client'

import HowToAct from '@/components/actions/HowToAct'
import CategoriesAccordion from '@/components/results/CategoriesAccordion'
import CategoriesChart from '@/components/results/CategoriesChart'
import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import { useGetGroupStats } from '@/hooks/groups/useGetGroupStats'
import { useIsGroupOwner } from '@/hooks/groups/useIsGroupOwner'
import { useUser } from '@/publicodes-state'
import { Group, Results } from '@/types/groups'
import { QueryObserverResult } from '@tanstack/react-query'
import Classement from './groupResults/Classement'
import InviteBlock from './groupResults/InviteBlock'
import OwnerAdminSection from './groupResults/OwnerAdminSection'
import ParticipantAdminSection from './groupResults/ParticipantAdminSection'
import PointsFortsFaibles from './groupResults/PointsFortsFaibles'

export default function GroupResults({
  group,
  refetchGroup,
}: {
  group: Group
  refetchGroup: () => Promise<QueryObserverResult<Group, Error>>
}) {
  const { user } = useUser()

  const { isGroupOwner } = useIsGroupOwner({ group })

  const results: Results = useGetGroupStats({
    groupMembers: group.participants,
    userId: user.userId,
  })

  return (
    <>
      <Classement group={group} refetchGroup={refetchGroup} />

      <InviteBlock group={group} />

      {group?.participants?.length > 1 ? (
        <>
          <Separator />

          <PointsFortsFaibles
            pointsFaibles={results?.pointsFaibles}
            pointsForts={results?.pointsForts}
          />
        </>
      ) : null}

      <Separator />

      <h2 data-cypress-id="votre-empreinte-title" className="mt-8">
        <Trans>Votre empreinte</Trans>
      </h2>

      <CategoriesChart />

      <CategoriesAccordion />

      <Separator className="my-6" />

      <HowToAct />

      <Separator className="my-6" />

      {isGroupOwner ? (
        <OwnerAdminSection group={group} />
      ) : (
        <ParticipantAdminSection group={group} />
      )}
    </>
  )
}
