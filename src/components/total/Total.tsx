'use client'

import QuestionButton from '@/components/misc/QuestionButton'
import {
  simulateurCloseScoreInfo,
  simulateurOpenScoreInfo,
} from '@/constants/tracking/pages/simulateur'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useState } from 'react'
import ButtonBack from './total/ButtonBack'
import Explanation from './total/Explanation'
import Progress from './total/Progress'
import TotalButtons from './total/TotalButtons'
import TotalFootprintNumber from './total/TotalFootprintNumber'

type Props = {
  toggleQuestionList?: () => void
}
export default function Total({ toggleQuestionList }: Props) {
  const { t } = useClientTranslation()

  const { tutorials, hideTutorial, showTutorial } = useUser()

  const { progression } = useCurrentSimulation()

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
    <header>
      <div className="relative mb-10 flex items-center gap-4 overflow-hidden pb-6 pt-4">
        <Progress />
        <div className="mb-0 flex w-full max-w-6xl justify-between overflow-visible px-4 lg:mx-auto">
          <div className="relative flex gap-4">
            <ButtonBack />
            <TotalFootprintNumber />
            <QuestionButton
              onClick={toggleOpen}
              title={t('Comprendre mon score')}
            />
          </div>
          {toggleQuestionList ? (
            <TotalButtons toggleQuestionList={toggleQuestionList} />
          ) : null}
        </div>
      </div>
      {!tutorials.scoreExplanation ? (
        <div className="relative mx-auto max-w-6xl">
          <Explanation toggleOpen={toggleOpen} />
        </div>
      ) : null}
    </header>
  )
}
