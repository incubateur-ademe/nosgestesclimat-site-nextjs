'use client'

import TransClient from '@/components/translation/trans/TransClient'
import Button from '@/design-system/inputs/Button'
import Title from '@/design-system/layout/Title'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import { useDeleteGroup } from '@/hooks/groups/useDeleteGroup'
import { useFetchGroup } from '@/hooks/groups/useFetchGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { Participant } from '@/types/groups'
import { captureException } from '@sentry/react'
import { useRouter } from 'next/navigation'

export default function SupprimerGroupePage({
  searchParams,
}: {
  searchParams: { groupId: string; userId: string }
}) {
  const router = useRouter()

  const { groupId, userId } = searchParams

  const { data: group, refetch: refetchGroup, isError } = useFetchGroup(groupId)

  const { mutateAsync: deleteUserOrGroupIfOwner, isSuccess } = useDeleteGroup()

  const { t } = useClientTranslation()

  const handleDelete = async () => {
    if (!group) return

    try {
      await deleteUserOrGroupIfOwner({
        groupId,
        userId,
      })

      // Refresh cache
      refetchGroup()
    } catch (error) {
      captureException(error)
    }
  }

  const isOwner = group?.administrator.id === userId

  if (
    !groupId ||
    !userId ||
    (group &&
      group?.participants.findIndex(
        (member: Participant) => member.userId === userId
      ) < 0)
  ) {
    router.push('/')
    return
  }

  if (!groupId) {
    router.push(linkToClassement)
    return
  }

  return (
    <div className="p-4 md:p-8">
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
    </div>
  )
}
