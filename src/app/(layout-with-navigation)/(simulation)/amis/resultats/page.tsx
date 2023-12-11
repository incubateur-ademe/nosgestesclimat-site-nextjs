'use client'

import GoBackLink from '@/design-system/inputs/GoBackLink'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import EditableGroupTitle from './_components/EditableGroupTitle'
import GroupResults from './_components/GroupResults'

export default function GroupResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const groupId = String(searchParams.groupId)

  const router = useRouter()

  useEffect(() => {
    if (!groupId) {
      router.push('/amis')
    }
  }, [groupId, router])

  return (
    <>
      <div>
        <GoBackLink className="mb-4 font-bold" />

        <EditableGroupTitle groupId={groupId} />

        <GroupResults groupId={groupId} />
      </div>
    </>
  )
}
