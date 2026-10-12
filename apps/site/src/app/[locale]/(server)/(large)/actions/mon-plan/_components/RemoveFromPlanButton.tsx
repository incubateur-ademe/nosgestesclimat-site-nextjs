'use client'

import { useActionCommitment } from '@/components/actions/highlightedActionCard/commitToActionButton/useActionCommitment'
import CheckIcon from '@/components/icons/status/CheckIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import Trans from '@/components/translation/trans/TransClient'
import Loader from '@/design-system/layout/Loader'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/design-system/shadcn/tooltip'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { PersonalizedAction } from '@nosgestesclimat/core/features/actions/types/action'

interface Props {
  action: PersonalizedAction
}

export default function RemoveFromPlanButton({ action }: Props) {
  const { t } = useClientTranslation()

  const { abandonActionCommitment, isPending } = useActionCommitment(action)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={abandonActionCommitment}
          disabled={isPending}
          aria-label={t(
            'actions.myPlanPage.removeButton.ariaLabel',
            'Retirer l’action "{{actionTitle}}" de votre plan',
            { actionTitle: action.title }
          )}
          // Above the card link overlay
          className="group relative z-20 flex size-8 items-center justify-center rounded-full bg-green-600 transition-colors hover:bg-slate-400 focus-visible:bg-slate-400">
          {isPending ? (
            <div className="flex size-5 items-center justify-center">
              <Loader size="sm" color="light" />
            </div>
          ) : (
            <>
              <CheckIcon className="size-5 fill-white group-hover:hidden group-focus-visible:hidden" />
              <TrashIcon className="hidden size-5 fill-white group-hover:block group-focus-visible:block" />
            </>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="font-marianne">
        <Trans i18nKey="actions.myPlanPage.removeButton.tooltip">Retirer</Trans>
      </TooltipContent>
    </Tooltip>
  )
}
