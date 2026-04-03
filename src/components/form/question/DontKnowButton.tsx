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
import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { useStartTime } from '../hooks/useStartTime'

interface Props {
  question: DottedName
  type?: string
}

interface FuncProps {
  question: DottedName
  updateValue: (
    value: undefined
  ) => void | Dispatch<SetStateAction<string | number | null | undefined>>
}

function useResetOnClickDontKnow({ question, updateValue }: FuncProps) {
  const { isFolded, questionsOfMosaicFromParent } = useRule(question)

  const { situation } = useCurrentSimulation()

  // Reset currentValue if question is withdrawn from the situation
  useEffect(() => {
    const isQuestionRemoved = !Object.keys(situation).some(
      (key) => key === question
    )

    const mosaicChildrenRemoved =
      questionsOfMosaicFromParent.length === 0 ||
      questionsOfMosaicFromParent.every(
        (child) => !Object.keys(situation).some((key) => key === child)
      )

    if (isFolded && isQuestionRemoved && mosaicChildrenRemoved) {
      updateValue(undefined)
    }
  }, [situation, isFolded, question, updateValue, questionsOfMosaicFromParent])
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

    let updatedSituation = { ...situation }

    if (questionsOfMosaicFromParent.length > 0) {
      updatedSituation = questionsOfMosaicFromParent.reduce(
        (acc, q) => {
          const newSituation = { ...acc }
          delete newSituation[q]
          return newSituation
        },
        { ...situation }
      )

      questionsOfMosaicFromParent.forEach((question) => {
        updateCurrentSimulation({
          foldedStepToAdd: {
            foldedStep: question,
            value: getValue(question),
            isMosaicChild: true,
          },
        })
      })
    }

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

  const isSelected =
    isFolded &&
    // The question isn't in the situation
    !Object.keys(situation).some((key) => key === question) &&
    (questionsOfMosaicFromParent.length > 0
      ? // None of mosaic children selected
        !questionsOfMosaicFromParent.some((questionOfMosaic) =>
          Object.keys(situation).includes(questionOfMosaic)
        )
      : true)

  return (
    <div>
      <Separator className="bg-primary-600 mt-2! mb-6 md:w-12" />

      <p id="dont-know-desc" className="mb-2">
        <Trans i18nKey="simulator.skipButton.topLabel">
          Pas sûr(e) ? / aucun choix ne correspond ?
        </Trans>
      </p>

      <RadioInput
        id="dont-know-radio"
        aria-describedby="dont-know-desc dont-know-confirm"
        isActive={isSelected}
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

      {isSelected && (
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
