import type { AssessmentStatus } from '@nosgestesclimat/core/features/actions/services/get-personalized-actions-catalogue.service'
import type { PersonalizedAction } from '@nosgestesclimat/core/features/actions/types/action'
import { ImpactTag } from '../../ImpactTag'
import ThemeIcon from '../../ThemeIcon'
import AbandonCommitmentButton from './chosen-action/AbandonCommitmentButton'

interface Props {
  action: PersonalizedAction
  assessmentStatus: AssessmentStatus
}

export default function ChosenAction({ action, assessmentStatus }: Props) {
  return (
    <article className="flex items-start gap-1 rounded-lg border border-slate-200 bg-slate-50 p-2">
      <div className="flex-1">
        <h1 className="mb-2 text-sm/normal">{action.title}</h1>

        <div className="flex gap-1">
          <ThemeIcon themeKey={action.theme.key} />

          {action.assessment ? (
            <ImpactTag
              impact={action.assessment.impact}
              assessmentStatus={assessmentStatus}
              className="bg-slate-50"
            />
          ) : null}
        </div>
      </div>

      <AbandonCommitmentButton action={action} />
    </article>
  )
}
