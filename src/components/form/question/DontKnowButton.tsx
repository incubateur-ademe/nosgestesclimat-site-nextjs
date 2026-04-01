'use client'

import CheckIcon from '@/components/icons/status/CheckIcon'
import Trans from '@/components/translation/trans/TransClient'
import { captureClickFormNav } from '@/constants/tracking/posthogTrackers'
import { questionClickPass } from '@/constants/tracking/question'
import RadioInput from '@/design-system/inputs/RadioInput'
import Separator from '@/design-system/layout/Separator'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useEngine, useRule } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useStartTime } from '../hooks/useStartTime'

interface Props {
  question: DottedName
  type?: string
}

export default function DontKnowButton({ question }: Props) {
  const startTime = useStartTime(question)

  const { value, questionsOfMosaicFromParent, isFolded } = useRule(question)

  const { getValue } = useEngine()

  const { updateCurrentSimulation, situation } = useCurrentSimulation()

  const { t } = useClientTranslation()

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

    if (questionsOfMosaicFromParent.length > 0) {
      questionsOfMosaicFromParent.forEach((question) => {
        const updatedSituation = { ...situation }
        delete updatedSituation[question]
        updateCurrentSimulation({
          situation: updatedSituation,
          foldedStepToAdd: {
            foldedStep: question,
            value: getValue(question),
            isMosaicChild: true,
          },
        })
      })
    }

    const updatedSituation = { ...situation }
    delete updatedSituation[question]

    updateCurrentSimulation({
      situation: updatedSituation,
      foldedStepToAdd: {
        foldedStep: question,
        value: value,
        isMosaicParent: questionsOfMosaicFromParent.length > 0,
      },
    })
  }

  const hasBeenClicked =
    isFolded && !Object.keys(situation).some((key) => key === question)

  return (
    <div>
      <Separator className="bg-primary-600 mt-2! mb-6 w-10" />

      <p id="dont-know-desc" className="mb-2">
        <Trans i18nKey="simulator.skipButton.topLabel">
          Pas sûr(e) ? / aucun choix ne correspond ?
        </Trans>
      </p>

      <RadioInput
        id="dont-know-radio"
        aria-describedby="dont-know-desc dont-know-confirm"
        isActive={hasBeenClicked}
        className="w-64 px-6 py-4"
        label={
          <Trans i18nKey="simulator.skipButton.buttonLabel">
            Je ne sais pas répondre
          </Trans>
        }
        labelText={t(
          'simulator.skipButton.buttonLabel',
          'Je ne sais pas répondre'
        )}
        onClick={onClick}
      />

      {hasBeenClicked && (
        <p
          id="dont-know-confirm"
          className="text-primary-600 animate-fade-in-slide-from-top mt-2 flex items-center gap-1 text-sm">
          <CheckIcon className="fill-primary-600 w-5" />
          <Trans i18nKey="simulator.skipButton.confirmLabel">
            Nous allons appliquer une moyenne
          </Trans>
        </p>
      )}
    </div>
  )
}
