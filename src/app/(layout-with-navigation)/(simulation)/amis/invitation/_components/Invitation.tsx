'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { Member } from '@/types/groups'
import { useRouter } from 'next/navigation'
import { useFetchGroup } from '../../_hooks/useFetchGroup'
import { getGroupURL } from '../_helpers/getGroupURL'
import InvitationForm from './InvitationForm'

export default function Invitation({ groupId }: { groupId: string }) {
  const router = useRouter()

  const { t } = useClientTranslation()

  const { user } = useUser()

  const userId = user?.id

  const { data: group } = useFetchGroup(groupId)

  const groupURL = getGroupURL(group)

  if (!groupId) {
    router.push('/amis')
    return
  }

  // Show nothing if group is not fetched yet
  if (!group) {
    return null
  }

  // If user is already in the group, redirect to group page
  if (group?.members?.find((member: Member) => member.userId === userId)) {
    router.push(groupURL)
    return
  }

  return (
    <>
      <Title
        title={
          <Trans>
            {group?.owner?.name} vous a invité à rejoindre le groupe{' '}
            <span className="text-violet-900">{group?.name}</span>
          </Trans>
        }
        subtitle={t(
          "Comparez vos résultats avec votre famille ou un groupe d'amis."
        )}
      />

      <InvitationForm group={group} />
    </>
  )
}
