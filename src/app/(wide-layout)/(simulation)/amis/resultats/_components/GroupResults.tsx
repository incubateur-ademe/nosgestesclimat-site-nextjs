'use client'

import Separator from '@/design-system/layout/Separator'
import { useUser } from '@/publicodes-state'
import { Results } from '@/types/groups'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useFetchGroup } from '../../_hooks/useFetchGroup'
import { useGetGroupStats } from '../_hooks/useGetGroupStats'
import { useUpdateUserResults } from '../_hooks/useUpdateUserResults'
import Classement from './Classement'
import InviteBlock from './InviteBlock'
import PointsFortsFaibles from './PointsFortsFaibles'
import VotreEmpreinte from './VotreEmpreinte'

export default function GroupResults({ groupId }: { groupId: string }) {
  const [isSynced, setIsSynced] = useState(false)

  const router = useRouter()

  const { data: group, refetch } = useFetchGroup(groupId)

  const { user, setGroupToRedirectToAfterTest } = useUser()

  const userId = user?.id

  const intervalRef = useRef<NodeJS.Timeout>()

  const results: Results | null = useGetGroupStats({
    groupMembers: group?.members,
    userId: userId || '',
    isSynced,
  })

  useUpdateUserResults({
    setIsSynced,
    groupId,
  })

  useEffect(() => {
    setGroupToRedirectToAfterTest(undefined)
  }, [setGroupToRedirectToAfterTest])

  useEffect(() => {
    if (groupId && !group) {
      intervalRef.current = setInterval(() => refetch(), 60000)
    }
  }, [groupId, group, userId, refetch])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  if (!group) {
    return null
  }

  if (
    !group?.members?.some(
      (member: { userId: string }) => member.userId === userId
    )
  ) {
    router.push(`/amis/invitation?groupId=${group._id}`)

    return null
  }

  return (
    <>
      <Classement group={group} />

      <InviteBlock group={group} />

      {group?.members?.length > 1 ? (
        <>
          <Separator className="my-8" />

          <PointsFortsFaibles
            pointsFaibles={results?.pointsFaibles}
            pointsForts={results?.pointsForts}
          />

          <Separator className="mb-6 mt-10" />
        </>
      ) : (
        <Separator className="mb-6 mt-8" />
      )}

      <VotreEmpreinte
        categoriesFootprints={
          results?.userFootprintByCategoriesAndSubcategories
        }
        membersLength={group?.members?.length}
      />
    </>
  )
}
