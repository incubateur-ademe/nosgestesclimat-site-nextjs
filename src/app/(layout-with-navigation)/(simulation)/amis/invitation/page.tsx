'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import { getLinkToGroupDashboard } from '@/helpers/navigation/groupPages'
import { useFetchGroup } from '@/hooks/groups/useFetchGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { Participant } from '@/types/groups'
import { useRouter } from 'next/navigation'
import InvitationForm from './_components/InvitationForm'

export default function RejoindreGroupePage({
  searchParams,
}: {
  searchParams: { groupId: string }
}) {
  const { groupId } = searchParams

  const router = useRouter()

  const { t } = useClientTranslation()

  const { user } = useUser()

  const userId = user?.userId

  const { data: group } = useFetchGroup(groupId)

  const groupURL = getLinkToGroupDashboard({ groupId })

  if (!groupId) {
    router.push(linkToClassement)
    return
  }

  // Show nothing if group is not fetched yet
  if (!group) {
    return null
  }

  // If user is already in the group, redirect to group page
  if (
    group?.participants?.find(
      (participant: Participant) => participant.userId === userId
    )
  ) {
    router.push(groupURL)
    return
  }

  return (
    <div className="p-4 md:p-8">
      <Title
        title={
          <Trans>
            {group?.administrator?.name} vous a invité à rejoindre le groupe{' '}
            <span className="text-violet-900">{group?.name}</span>
          </Trans>
        }
        subtitle={t(
          "Comparez vos résultats avec votre famille ou un groupe d'amis."
        )}
      />

      <InvitationForm group={group} />
    </div>
  )
}
