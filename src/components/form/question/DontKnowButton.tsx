'use client'

import Trans from '@/components/translation/trans/TransClient'
import { captureClickFormNav } from '@/constants/tracking/posthogTrackers'
import { questionClickPass } from '@/constants/tracking/question'
import Button from '@/design-system/buttons/Button'
import Separator from '@/design-system/layout/Separator'
import { useRule } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useStartTime } from '../hooks/useStartTime'

interface Props {
  question: DottedName
  type?: string
}

export default function DontKnowButton({ question, type }: Props) {
  const startTime = useStartTime(question)

  const { value } = useRule(question)

  const onClick = () => {
    const endTime = Date.now()
    const timeSpentOnQuestion = endTime - startTime
    trackEvent(questionClickPass({ question, timeSpentOnQuestion }))
    trackPosthogEvent(
      captureClickFormNav({
        actionType: 'passer',
        question,
        answer: value,
        timeSpentOnQuestion,
      })
    )
  }
  return (
    <div>
      <Separator />

      {type === 'number' && (
        <>
          <p id="dont-know-desc">
            <Trans i18nKey="simulator.skipButton.topLabel">
              Pas sûr(e) ? / aucun choix ne correspond ?
            </Trans>
          </p>
          <Button
            onClick={onClick}
            className="bg-primary-50 text-default inline-block rounded-lg border-1 border-slate-600 text-left font-medium"
            aria-describedby="dont-know-desc"
            color="secondary">
            <Trans>Je ne sais pas répondre</Trans>
          </Button>
        </>
      )}
    </div>
  )
}
