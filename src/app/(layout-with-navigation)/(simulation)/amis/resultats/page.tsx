'use client'

import HowToAct from '@/components/actions/HowToAct'
import Trans from '@/components/translation/Trans'
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

        <div className="mt-4">
          <h2 className="m-0 text-lg font-bold">
            <Trans>Le classement</Trans>
          </h2>
        </div>

        <GroupResults groupId={groupId} />
      </div>

      <HowToAct />
    </>
  )
}
