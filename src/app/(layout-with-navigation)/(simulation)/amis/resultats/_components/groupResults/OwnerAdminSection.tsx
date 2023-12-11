'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useUser } from '@/publicodes-state'
import { Group } from '@/types/groups'
import { captureException } from '@sentry/react'
import { useEffect, useRef, useState } from 'react'
import { useDeleteGroup } from '../../../supprimer/_hooks/useDeleteGroup'

type Props = {
  group: Group
}

export default function OwnerAdminSection({ group }: Props) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [hasDeleted, setHasDeleted] = useState(false)

  const { mutateAsync: deleteUserOrGroupIfOwner } = useDeleteGroup()

  const { user } = useUser()

  const timeoutRef = useRef<NodeJS.Timeout>()

  async function handleDelete() {
    if (!group) return

    try {
      await deleteUserOrGroupIfOwner({
        groupId: group?._id,
        userId: user?.id || '',
      })

      timeoutRef.current = setTimeout(() => {
        setHasDeleted(true)
      }, 1500)
    } catch (error) {
      captureException(error)
    }
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <section>
      <h2>
        <Trans>Supprimer</Trans> <Emoji>{group?.emoji}</Emoji> {group?.name}
      </h2>

      <p>
        <Trans>
          Vous pouvez supprimer le groupe en cliquant sur le bouton ci-dessous.
          Il sera supprimé définitivement pour tous ses autres membres puisque
          vous en êtes l'administrateur.
        </Trans>
      </p>

      {isConfirming && !hasDeleted && (
        <>
          <p>
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

            <Button onClick={handleDelete} size="sm" color="primary">
              Supprimer
            </Button>
          </div>
        </>
      )}

      {!isConfirming && !hasDeleted && (
        <Button color="text" onClick={() => setIsConfirming(true)}>
          Supprimer le groupe
        </Button>
      )}

      {hasDeleted && (
        <p>
          <Trans>Votre groupe a été supprimé.</Trans>
        </p>
      )}
    </section>
  )
}
