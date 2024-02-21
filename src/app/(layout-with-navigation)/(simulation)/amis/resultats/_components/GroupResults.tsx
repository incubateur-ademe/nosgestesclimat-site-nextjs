'use client'

import HowToAct from '@/components/actions/HowToAct'
import Separator from '@/design-system/layout/Separator'
import { useGetGroupStats } from '@/hooks/groups/useGetGroupStats'
import { useUser } from '@/publicodes-state'
import { Group, Results } from '@/types/groups'
import Classement from './groupResults/Classement'
import InviteBlock from './groupResults/InviteBlock'
import OwnerAdminSection from './groupResults/OwnerAdminSection'
import ParticipantAdminSection from './groupResults/ParticipantAdminSection'
import PointsFortsFaibles from './groupResults/PointsFortsFaibles'
import VotreEmpreinte from './groupResults/VotreEmpreinte'

type Props = {
  group: Group
}
export default function GroupResults({ group }: Props) {
  const { user } = useUser()

  const isOwner = group?.administrator?.userId === user.userId

  const results: Results | null = useGetGroupStats({
    groupMembers: group.participants,
    userId: user.userId,
  })

  return (
    <>
      <Classement group={group} />

      <InviteBlock group={group} />

      {group?.participants?.length > 1 ? (
        <>
          <Separator />

          <PointsFortsFaibles
            pointsFaibles={results?.pointsFaibles}
            pointsForts={results?.pointsForts}
          />

          <Separator />
        </>
      ) : (
        <Separator />
      )}

      <VotreEmpreinte
        categoriesFootprints={
          results?.userFootprintByCategoriesAndSubcategories
        }
        membersLength={group?.participants?.length}
      />

      <Separator className="my-6" />

      <HowToAct />

      <Separator className="my-6" />

      {isOwner && <OwnerAdminSection group={group} />}

      {!isOwner && <ParticipantAdminSection group={group} />}
    </>
  )
}
