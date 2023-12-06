'use client'

import HowToAct from '@/components/actions/HowToAct'
import Trans from '@/components/translation/Trans'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import Separator from '@/design-system/layout/Separator'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import EditableGroupTitle from './EditableGroupTitle'
import GroupResults from './GroupResults'

export default function Results({ groupId }: { groupId: string }) {
  const router = useRouter()

  useEffect(() => {
    if (!groupId) {
      router.push('/amis')
    }
  }, [groupId, router])

  return (
    <div className="pb-8">
      <GoBackLink className="mb-4 font-bold" />

      <EditableGroupTitle groupId={groupId} />

      <div className="mt-4">
        <h2 className="m-0 text-lg font-bold">
          <Trans>Le classement</Trans>
        </h2>
      </div>

      <GroupResults groupId={groupId} />

      <Separator className="my-6" />

      <HowToAct />
    </div>
  )
}
