import TransClient from '@/components/translation/TransClient'
import { GROUP_URL } from '@/constants/urls'
import Button from '@/design-system/inputs/Button'
import Title from '@/design-system/layout/Title'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { Member } from '@/types/groups'
import { captureException } from '@sentry/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useFetchGroup } from '../_hooks/useFetchGroup'

export default function SupprimerGroupePage({
  searchParams,
}: {
  searchParams: { groupId: string; userId: string }
}) {
  const router = useRouter()

  const { groupId, userId } = searchParams

  const { data: group, refetch: refetchGroup, isError } = useFetchGroup(groupId)

  const { mutateAsync: deleteUserOrGroupIfOwner, isSuccess } = useMutation({
    mutationFn: () =>
      axios.post(`${GROUP_URL}/delete`, {
        groupId,
        userId,
      }),
  })

  const { t } = useTranslation()

  const handleDelete = async () => {
    if (!group) return

    try {
      await deleteUserOrGroupIfOwner()

      // Refresh cache
      refetchGroup()
    } catch (error) {
      captureException(error)
    }
  }

  const isOwner = group?.owner?.userId === userId

  if (
    !groupId ||
    !userId ||
    (group &&
      group?.members.findIndex((member: Member) => member.userId === userId) <
        0)
  ) {
    router.push('/')
    return
  }

  if (!groupId) {
    router.push('/groupes')
    return
  }

  return (
    <main className="p-4 md:p-8">
      <AutoCanonicalTag />

      <Title title={t('Supprimer mes données')} />

      {isSuccess && <TransClient>Données supprimées.</TransClient>}

      {!isSuccess && (
        <p className="my-4">
          {isOwner ? (
            <TransClient>
              Supprimer votre groupe <strong>{group?.name}</strong> ? Les
              données sauvegardées seront supprimées pour tous les membres du
              groupe. Cette action est irréversible.
            </TransClient>
          ) : (
            <TransClient>
              Supprimer vos données de groupe enregistrées ? Seules vos données
              de membre seront supprimées. Cette action est irréversible.
            </TransClient>
          )}
        </p>
      )}

      {isError && (
        <p className="mt-4 text-red-600">
          <TransClient>
            Oups, une erreur s'est produite au moment de récupérer les données
            du groupe.
          </TransClient>
        </p>
      )}

      <Button
        disabled={!!isError || !group || isSuccess}
        onClick={handleDelete}>
        <TransClient>Supprimer mes données</TransClient>
      </Button>
    </main>
  )
}
