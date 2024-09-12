'use client'

import QuestionButton from '@/components/misc/QuestionButton'
import {
  simulateurCloseScoreInfo,
  simulateurOpenScoreInfo,
} from '@/constants/tracking/pages/simulateur'
import { getBgCategoryColor } from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useForm, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ValueChangeDisplay from '../misc/ValueChangeDisplay'
import ButtonBack from './total/ButtonBack'
import Explanation from './total/Explanation'
import Progress from './total/Progress'
import TotalButtons from './total/TotalButtons'
import TotalFootprintNumber from './total/TotalFootprintNumber'

export default function Total({
  toggleQuestionList,
  toggleSaveModal,
  simulationMode = true,
}: {
  toggleQuestionList?: () => void
  toggleSaveModal?: () => void
  simulationMode?: boolean
}) {
  const { t } = useClientTranslation()

  const { tutorials, hideTutorial, showTutorial } = useUser()

  const { progression } = useCurrentSimulation()

  const { currentCategory } = useForm()

  const [hasManuallyOpenedTutorial, setHasManuallyOpenedTutorial] =
    useState(false)

  function toggleOpen() {
    if (tutorials.scoreExplanation) {
      trackEvent(simulateurOpenScoreInfo)
      setHasManuallyOpenedTutorial(true)
      showTutorial('scoreExplanation')
    } else {
      trackEvent(simulateurCloseScoreInfo)
      hideTutorial('scoreExplanation')
    }
  }

  useEffect(() => {
    if (
      progression > 0.05 &&
      !tutorials.scoreExplanation &&
      !hasManuallyOpenedTutorial
    ) {
      hideTutorial('scoreExplanation')
    }
  }, [
    hideTutorial,
    progression,
    tutorials.scoreExplanation,
    hasManuallyOpenedTutorial,
  ])

  return (
    <header
      className={twMerge(
        'fixed top-0 z-50 h-16 w-full md:bg-white',
        getBgCategoryColor(currentCategory, '50'),
        !simulationMode && 'static'
      )}>
      <div
        className={twMerge(
          'relative flex h-full items-center gap-4 overflow-visible pb-3 pt-2 lg:pb-5 lg:pt-4',
          !simulationMode && 'border-b border-primary-100'
        )}>
        {simulationMode && <Progress />}

        <div className="mb-0 flex w-full max-w-6xl justify-between overflow-visible pl-1 pr-4 lg:mx-auto lg:px-4">
          <div className="relative flex items-center gap-1 lg:gap-4">
            {simulationMode && <ButtonBack onClick={toggleSaveModal} />}

            <TotalFootprintNumber />

            <QuestionButton
              onClick={toggleOpen}
              title={t('Comprendre mon score')}
            />
          </div>
          {toggleQuestionList ? (
            <TotalButtons
              toggleQuestionList={toggleQuestionList}
              toggleSaveModal={toggleSaveModal}
            />
          ) : null}
        </div>

        <div
          className="absolute -bottom-7 left-10 w-full lg:left-4"
          aria-live="polite">
          <div className="w-full max-w-6xl md:mx-auto">
            <ValueChangeDisplay />
          </div>
        </div>
      </div>
      {!tutorials.scoreExplanation ? (
        <div className="relative mx-auto max-w-6xl">
          <Explanation
            toggleOpen={toggleOpen}
            isFirstToggle={
              !tutorials.scoreExplanation && !hasManuallyOpenedTutorial
            }
          />
        </div>
      ) : null}
    </header>
  )
}
