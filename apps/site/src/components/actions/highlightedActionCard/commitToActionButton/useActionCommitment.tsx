import Trans from '@/components/translation/trans/TransClient'
import { ACTIONS_MY_PLAN_PATH } from '@/constants/urls/paths'
import InlineLink from '@/design-system/inputs/InlineLink'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { abandonActionCommitment } from '@/services/actions/abandon-action-commitment'
import { commitToAction } from '@/services/actions/commit-to-action'
import { captureUniqueSessionActionEvent } from '@/utils/analytics/trackUniqueEvent'
import type { PersonalizedAction } from '@nosgestesclimat/core/features/actions/types/action'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { useTriggerShineAnimation } from './useTriggerShineAnimation'

const TOAST_DISPLAY_DURATION = 5_000

export function useActionCommitment(action: PersonalizedAction) {
  const { t } = useClientTranslation()

  const [isPending, startTransition] = useTransition()
  const handleCommitToAction = () => {
    startTransition(async () => {
      try {
        await commitToAction(action.id, action.slug)

        captureUniqueSessionActionEvent({
          actionThemeTrackingId: action.theme.trackingId,
          actionTrackingId: action.trackingId,
          co2PotentialInKg: action.assessment?.impact,
          eventName: 'action committed',
        })

        toast.success(
          <Trans i18nKey="actions.commitToActionButton.success1">
            Ajouté à{' '}
            <InlineLink href={ACTIONS_MY_PLAN_PATH}>
              votre plan d'action
            </InlineLink>
          </Trans>,
          {
            duration: TOAST_DISPLAY_DURATION,
            className: '-translate-y-18 lg:translate-none',
          }
        )
      } catch {
        toast.error(
          t(
            'actions.commitToActionButton.error',
            "Une erreur s'est produite, veuillez réessayer."
          )
        )
      }
    })
  }

  const handleAbandonCommitment = () => {
    startTransition(async () => {
      try {
        await abandonActionCommitment({
          actionId: action.id,
          actionSlug: action.slug,
        })

        captureUniqueSessionActionEvent({
          actionThemeTrackingId: action.theme.trackingId,
          actionTrackingId: action.trackingId,
          co2PotentialInKg: action.assessment?.impact,
          eventName: 'action abandonned',
        })
      } catch {
        toast.error(
          t(
            'actions.commitToActionButton.error',
            "Une erreur s'est produite, veuillez réessayer."
          )
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
