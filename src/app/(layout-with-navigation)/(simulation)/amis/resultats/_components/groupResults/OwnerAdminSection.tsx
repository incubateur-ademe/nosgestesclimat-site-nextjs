'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { useUser } from '@/publicodes-state'
import { Group } from '@/types/groups'
import { captureException } from '@sentry/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useDeleteGroup } from '../../../supprimer/_hooks/useDeleteGroup'

type Props = {
  group: Group
}

export default function OwnerAdminSection({ group }: Props) {
  const [isConfirming, setIsConfirming] = useState(false)

  const { mutateAsync: deleteUserOrGroupIfOwner, isSuccess } = useDeleteGroup()

  const { user } = useUser()

  const router = useRouter()

  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  async function handleDelete() {
    if (!group) return

    try {
      await deleteUserOrGroupIfOwner({
        groupId: group?._id,
        userId: user?.id || '',
      })

      timeoutRef.current = setTimeout(() => {
        router.push('/classement')
      }, 2000)
    } catch (error) {
      captureException(error)
    }
  }

  return (
    <section className="my-6" aria-live="polite">
      <h2 className="md:text-lg">
        <Trans>Supprimer</Trans> <Emoji>{group?.emoji}</Emoji> {group?.name}
      </h2>

      <p className="text-sm md:text-base">
        <Trans>
          Vous pouvez supprimer le groupe en cliquant sur le bouton ci-dessous.
          Il sera supprimé définitivement pour tous ses autres membres puisque
          vous en êtes l'administrateur.
        </Trans>
      </p>

      {isConfirming && !isSuccess && (
        <Card className="border-none bg-grey-100">
          <p className="text-sm md:text-base">
            <Trans>
              Cette opération est définitive et supprimera le groupe pour tous
              ses membres.
            </Trans>
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => setIsConfirming(false)}
              size="sm"
              color="secondary">
              Annuler
            </Button>

            <Button
              onClick={handleDelete}
              size="sm"
              color="primary"
              data-cypress-id="button-confirm-delete-group">
              Supprimer
            </Button>
          </div>
        </Card>
      )}

      {!isConfirming && !isSuccess && (
        <Button
          color="link"
          onClick={() => setIsConfirming(true)}
          data-cypress-id="button-delete-group">
          Supprimer le groupe
        </Button>
      )}

      {isSuccess && (
        <Card className="border-none bg-grey-100">
          <p className="text-sm md:text-base">
            <Trans>
              Votre groupe a été supprimé. Vous allez être redirigé vers la page
              d'accueil du mode groupe.
            </Trans>
          </p>
        </Card>
      )}
    </section>
  )
}
