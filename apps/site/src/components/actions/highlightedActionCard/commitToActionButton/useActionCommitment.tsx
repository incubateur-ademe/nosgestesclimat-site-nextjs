import Trans from '@/components/translation/trans/TransClient'
import { abandonActionCommitment } from '@/services/actions/abandon-action-commitment'
import { commitToAction } from '@/services/actions/commit-to-action'
import { captureUniqueSessionActionEvent } from '@/utils/analytics/trackUniqueEvent'
import type { PersonalizedAction } from '@nosgestesclimat/core/features/actions/types/action'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { useTriggerShineAnimation } from './useTriggerShineAnimation'

const TOAST_DISPLAY_DURATION = 5_000

export function useActionCommitment(action: PersonalizedAction) {
  const [isPending, startTransition] = useTransition()
  const handleCommitToAction = () => {
    startTransition(async () => {
      try {
        await commitToAction(action.id)

        captureUniqueSessionActionEvent({
          actionThemeTrackingId: action.theme.trackingId,
          actionTrackingId: action.trackingId,
          co2PotentialInKg: action.assessment?.impact,
          eventName: 'action committed',
        })

        toast.success(
          <Trans i18nKey="actions.commitToActionButton.success1">
            Ajouté à votre plan d'action
          </Trans>,
          {
            duration: TOAST_DISPLAY_DURATION,
            className: '-translate-y-18 lg:translate-none',
          }
        )
      } catch {
        toast.error(
          <Trans i18nKey="actions.commitToActionButton.error">
            Une erreur s'est produite, veuillez réessayer.
          </Trans>
        )
      }
    })
  }

  const handleAbandonCommitment = () => {
    startTransition(async () => {
      try {
        await abandonActionCommitment({
          actionId: action.id,
        })

        captureUniqueSessionActionEvent({
          actionThemeTrackingId: action.theme.trackingId,
          actionTrackingId: action.trackingId,
          co2PotentialInKg: action.assessment?.impact,
          eventName: 'action abandonned',
        })
      } catch {
        toast.error(
          <Trans i18nKey="actions.commitToActionButton.error">
            Une erreur s'est produite, veuillez réessayer.
          </Trans>
        )
      }
    })
  }

  const shouldDisplayAnimation = useTriggerShineAnimation(action.choice?.type)

  return {
    commitToAction: handleCommitToAction,
    abandonActionCommitment: handleAbandonCommitment,
    isPending,
    shouldDisplayAnimation,
  }
}
