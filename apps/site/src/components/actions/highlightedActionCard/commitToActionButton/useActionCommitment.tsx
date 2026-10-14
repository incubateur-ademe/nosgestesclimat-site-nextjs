import Trans from '@/components/translation/trans/TransClient'
import { abandonActionCommitment } from '@/services/actions/abandon-action-commitment'
import { commitToAction } from '@/services/actions/commit-to-action'
import { captureUniqueSessionActionEvent } from '@/utils/analytics/trackUniqueEvent'
import type { PersonalizedAction } from '@nosgestesclimat/core/features/actions/types/action'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { useTriggerShineAnimation } from './useTriggerShineAnimation'

const TOAST_DISPLAY_DURATION = 5_000
const TOAST_CLASSNAME = '-translate-y-18 lg:translate-none'

export function useActionCommitment(action: PersonalizedAction) {
  const [isPending, startTransition] = useTransition()
  const commitAndNotify = async () => {
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
          className: TOAST_CLASSNAME,
        }
      )
    } catch {
      toast.error(
        <Trans i18nKey="actions.commitToActionButton.error">
          Une erreur s'est produite, veuillez réessayer.
        </Trans>
      )
    }
  }

  const handleCommitToAction = () => {
    startTransition(commitAndNotify)
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

        toast(
          <Trans i18nKey="actions.abandonCommitment.success">
            Action retirée de votre plan
          </Trans>,
          {
            duration: TOAST_DISPLAY_DURATION,
            className: TOAST_CLASSNAME,
            action: {
              label: (
                <Trans i18nKey="actions.abandonCommitment.undo">Annuler</Trans>
              ),
              // The component may be unmounted by then (e.g. removed from the
              // plan page), so don't rely on its transition
              onClick: () => void commitAndNotify(),
            },
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

  const shouldDisplayAnimation = useTriggerShineAnimation(action.choice?.type)

  return {
    commitToAction: handleCommitToAction,
    abandonActionCommitment: handleAbandonCommitment,
    isPending,
    shouldDisplayAnimation,
  }
}
