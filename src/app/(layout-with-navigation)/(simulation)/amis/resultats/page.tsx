'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import Loader from '@/design-system/layout/Loader'
import Title from '@/design-system/layout/Title'
import { Group } from '@/types/groups'
import { UseQueryResult } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFetchGroup } from '../_hooks/useFetchGroup'
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
      router.push('/classements', {
        scroll: false,
      })
    }
  }, [groupId, router])

  const {
    data: group,
    refetch,
    isFetched,
  }: UseQueryResult<Group> = useFetchGroup(groupId)

  if (!group && !isFetched) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="border-gray-600 border-b-transparent" />
      </div>
    )
  }

  // Group doesn't exist
  if (!group && isFetched) {
    return (
      <div className="flex flex-col items-start">
        <Title
          title={<Trans>Oups ! Nous n'avons pas trouvé votre groupe</Trans>}
        />

        <p className="mb-8 mt-2">
          <Trans>Ce groupe n'existe pas ou a été supprimé.</Trans>
        </p>

        <ButtonLink href="/amis">
          <Trans>Retour à la liste des groupes</Trans>
        </ButtonLink>
      </div>
    )
  }

  return (
    <>
      <div>
        <GoBackLink className="mb-4 font-bold" />

        <EditableGroupTitle group={group as Group} />

        <GroupResults group={group as Group} refetch={refetch} />
      </div>
    </>
  )
}
