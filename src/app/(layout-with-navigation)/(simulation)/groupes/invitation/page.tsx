'use client'

import Meta from '@/components/misc/Meta'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { Member } from '@/types/groups'
import { useRouter } from 'next/navigation'
import { useFetchGroup } from '../_hooks/useFetchGroup'
import InvitationForm from './_components/InvitationForm'
import { getGroupURL } from './_helpers/getGroupURL'

export default function RejoindreGroupe({
  searchParams,
}: {
  searchParams: { groupId: string }
}) {
  const { groupId } = searchParams

  const router = useRouter()

  const { t } = useClientTranslation()

  const { user } = useUser()

  const userId = user?.id

  const { data: group } = useFetchGroup(groupId)

  const groupURL = getGroupURL(group)

  if (!groupId) {
    router.push('/groupes')
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
    <main className="p-4 md:p-8">
      <Meta
        title={t('Rejoindre un groupe - Nos Gestes Climat')}
        description={t(
          "Rejoignez votre groupe pour calculez votre empreinte carbone et la comparer avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat."
        )}
      />

      <AutoCanonicalTag />

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
    </main>
  )
}
