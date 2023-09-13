'use client'

import { useEffect, useRef, useState } from 'react'

import Meta from '@/components/misc/Meta'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import Classement from './_components/Classement'
import FeedbackBlock from './_components/FeedbackBlock'
import Footer from './_components/Footer'
import InviteBlock from './_components/InviteBlock'
import PointsFortsFaibles from './_components/PointsFortsFaibles'
import VotreEmpreinte from './_components/VotreEmpreinte'
import { useGetGroupStats } from './_hooks/useGetGroupStats'

import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import { Results } from '@/types/groups'
import { useFetchGroup } from '../_hooks/useFetchGroup'
import EditableGroupTitle from './_components/EditableGroupTitle'
import { useUpdateUserResults } from './_hooks/useUpdateUserResults'

export default function GroupResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [isSynced, setIsSynced] = useState(false)

  const groupId = String(searchParams.groupId)

  const router = useRouter()

  const { data: group, refetch } = useFetchGroup(groupId)

  const { t } = useClientTranslation()

  const { user } = useUser()

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

  if (!groupId) {
    router.push('/groupes')
  }

  if (!group) {
    return null
  }

  if (
    !group?.members?.some(
      (member: { userId: string }) => member.userId === userId
    )
  ) {
    return router.push(`/groupes/invitation?groupId=${group._id}`)
  }

  return (
    <>
      <div className="p-4 pb-0">
        <GoBackLink className="mb-4 font-bold" />

        <Meta
          title={t('Mon groupe, nos bilans carbone personnels')}
          description={t(
            "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat."
          )}
        />

        <AutoCanonicalTag />

        <EditableGroupTitle groupId={groupId} />

        <FeedbackBlock />

        <div className="mt-4">
          <h2 className="m-0 text-lg font-bold">
            <Trans>Le classement</Trans>
          </h2>
        </div>

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
      </div>

      <Footer />
    </>
  )
}
