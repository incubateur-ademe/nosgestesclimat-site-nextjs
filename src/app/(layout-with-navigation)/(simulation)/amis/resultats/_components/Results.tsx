'use client'

import HowToAct from '@/components/actions/HowToAct'
import Trans from '@/components/translation/Trans'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import Separator from '@/design-system/layout/Separator'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { useRouter } from 'next/navigation'
import EditableGroupTitle from './EditableGroupTitle'
import GroupResults from './GroupResults'

export default function Results({ groupId }: { groupId: string }) {
  const router = useRouter()

  if (!groupId) {
    router.push('/amis')
  }
  return (
    <>
      <div className="p-4 pb-0">
        <GoBackLink className="mb-4 font-bold" />

        <AutoCanonicalTag />

        <EditableGroupTitle groupId={groupId} />

        <div className="mt-4">
          <h2 className="m-0 text-lg font-bold">
            <Trans>Le classement</Trans>
          </h2>
        </div>

        <GroupResults groupId={groupId} />
      </div>

      <Separator className="my-6" />

      <HowToAct />
    </>
  )
}
