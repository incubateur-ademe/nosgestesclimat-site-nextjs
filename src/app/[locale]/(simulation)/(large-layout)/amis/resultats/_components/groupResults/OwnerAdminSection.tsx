'use client'

import Trans from '@/components/translation/Trans'
import {
  amisDashboardOpenDeleteGroup,
  amisDashboardValidateDeleteGroup,
} from '@/constants/tracking/pages/amisDashboard'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import { useDeleteGroup } from '@/hooks/groups/useDeleteGroup'
import { useUser } from '@/publicodes-state'
import type { Group } from '@/types/groups'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type Props = {
  group: Group
}

export default function OwnerAdminSection({ group }: Props) {
  const [isConfirming, setIsConfirming] = useState(false)

  const { mutateAsync: deleteUserOrGroupIfOwner, isSuccess } = useDeleteGroup()

  const { user } = useUser()

  const router = useRouter()

  const timeoutRef = useRef<NodeJS.Timeout>(undefined)

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  async function handleDelete() {
    trackEvent(amisDashboardOpenDeleteGroup)
    if (!group) return

    try {
      await deleteUserOrGroupIfOwner({
        groupId: group.id,
        userId: user.userId,
      })

      timeoutRef.current = setTimeout(() => {
        router.push(linkToClassement)
      }, 2000)
    } catch (error) {
      captureException(error)
    }
  }

  return (
    <section className="my-6" aria-live="polite">
      <h2 className="md:text-lg">
        <Trans locale={locale}>Supprimer</Trans> <Emoji>{group?.emoji}</Emoji>{' '}
        {group?.name}
      </h2>

      <p className="text-sm md:text-base">
        <Trans locale={locale}>
          Vous pouvez supprimer le groupe en cliquant sur le bouton ci-dessous.
          Il sera supprimé définitivement pour tous ses autres membres puisque
          vous en êtes l'administrateur.
        </Trans>
      </p>

      {isConfirming && !isSuccess && (
        <Card className="border-none bg-gray-100">
          <p className="text-sm md:text-base">
            <Trans locale={locale}>
              Cette opération est définitive et supprimera le groupe pour tous
              ses membres.
            </Trans>
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setIsConfirming(false)
              }}
              size="sm"
              color="secondary">
              <Trans locale={locale}>Annuler</Trans>
            </Button>

            <Button
              onClick={handleDelete}
              size="sm"
              color="primary"
              data-cypress-id="button-confirm-delete-group">
              <Trans locale={locale}>Supprimer</Trans>
            </Button>
          </div>
        </Card>
      )}

      {!isConfirming && !isSuccess && (
        <Button
          color="link"
          onClick={() => {
            trackEvent(amisDashboardValidateDeleteGroup)
            setIsConfirming(true)
          }}
          data-cypress-id="button-delete-group">
          <Trans locale={locale}>Supprimer le groupe</Trans>
        </Button>
      )}

      {isSuccess && (
        <Card className="border-none bg-gray-100">
          <p className="mb-0 text-sm md:text-base">
            <Trans locale={locale}>
              Votre groupe a été supprimé. Vous allez être redirigé vers la page
              d'accueil du mode groupe.
            </Trans>
          </p>
        </Card>
      )}
    </section>
  )
}
