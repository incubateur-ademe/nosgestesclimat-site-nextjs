'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { useUser } from '@/publicodes-state'
import { Group } from '@/types/groups'
import { captureException } from '@sentry/react'
import { useState } from 'react'
import { useDeleteGroup } from '../../../supprimer/_hooks/useDeleteGroup'

type Props = {
  group: Group
}

export default function ParticipantAdminSection({ group }: Props) {
  const [isConfirming, setIsConfirming] = useState(false)

  const { mutateAsync: deleteUserOrGroupIfOwner, isSuccess } = useDeleteGroup()

  const { user } = useUser()

  async function handleDelete() {
    if (!group) return

    try {
      await deleteUserOrGroupIfOwner({
        groupId: group?._id,
        userId: user?.id || '',
      })
    } catch (error) {
      captureException(error)
    }
  }

  return (
    <section>
      <h2>
        <Trans>Quitter</Trans> <Emoji>{group?.emoji}</Emoji> {group?.name}
      </h2>

      <p className="text-sm md:text-base">
        <Trans>
          Vous pouvez quitter le groupe en cliquant sur le bouton ci-dessous. Le
          groupe ne sera en revanche pas supprimé puisque vous n’en êtes pas
          l’administrateur.
        </Trans>
      </p>

      {isConfirming && !isSuccess && (
        <Card className="bg-grey-100">
          <p className="text-sm md:text-base">
            <Trans>
              Cette opération est définitive et vous ne pourrez plus accéder aux
              résultats du groupe.
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
              Quitter
            </Button>
          </div>
        </Card>
      )}

      {!isConfirming && !isSuccess && (
        <Button color="text" onClick={() => setIsConfirming(true)}>
          Quitter le groupe
        </Button>
      )}
    </section>
  )
}
