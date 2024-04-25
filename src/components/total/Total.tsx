'use client'

import QuestionButton from '@/components/misc/QuestionButton'
import Trans from '@/components/translation/Trans'
import {
  simulateurCloseScoreInfo,
  simulateurOpenScoreInfo,
} from '@/constants/tracking/pages/simulateur'
import Emoji from '@/design-system/utils/Emoji'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import {
  useCurrentSimulation,
  useEngine,
  useRule,
  useUser,
} from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect, useState } from 'react'
import Explanation from './_components/Explanation'
import ListToggle from './_components/ListToggle'
import Progress from './_components/Progress'

type Props = {
  toggleQuestionList?: () => void
}
export default function Total({ toggleQuestionList }: Props) {
  const { t } = useClientTranslation()

  const { numericValue } = useRule('bilan')

  const { getNumericValue } = useEngine()

  const { tutorials, hideTutorial, showTutorial } = useUser()

  const { actionChoices, progression } = useCurrentSimulation()

  const actionChoicesSumValue = Object.keys(actionChoices || {}).reduce(
    (acc, key) => {
      return acc + (actionChoices[key] ? getNumericValue(key) : 0)
    },
    0
  )

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
  const carbonFootprintValue = numericValue - actionChoicesSumValue

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
    <div className="md:mb-2">
      <div className="relative mb-2 flex items-center gap-4 overflow-hidden rounded-xl bg-primary-800 px-4 py-2 text-white md:justify-center md:text-center ">
        <Progress />

        <Emoji className="z-10 text-4xl md:text-6xl">🌍</Emoji>

        <div className="z-10">
          <span className="block text-2xl font-bold md:text-3xl">
            {numericValue !== carbonFootprintValue && (
              <span className="relative text-xl text-gray-300 md:text-2xl">
                <span className="absolute right-0 top-1/2 h-[2px] w-full -rotate-45 transform bg-gray-300" />
                {formatCarbonFootprint(numericValue).formattedValue}
              </span>
            )}{' '}
            {formatCarbonFootprint(carbonFootprintValue).formattedValue}{' '}
            <Trans>{formatCarbonFootprint(carbonFootprintValue).unit}</Trans>
          </span>
          <span className="block text-sm md:text-base">
            <Trans i18nKey="Total.unit">
              de CO<sub className="text-white">2</sub>e / an
            </Trans>
          </span>
        </div>
        <QuestionButton
          onClick={toggleOpen}
          color="white"
          title={t('Comprendre mon score')}
        />
        {toggleQuestionList ? (
          <ListToggle toggleQuestionList={toggleQuestionList} />
        ) : null}
      </div>
      {!tutorials.scoreExplanation ? (
        <Explanation toggleOpen={toggleOpen} />
      ) : null}
    </div>
  )
}
