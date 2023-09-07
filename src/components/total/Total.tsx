'use client'

import Link from 'next/link'

import QuestionButton from '@/components/misc/QuestionButton'
import { useEngine, useRule, useUser } from '@/publicodes-state'

import Explanation from './_components/Explanation'
import ListToggle from './_components/ListToggle'
import Planet from './_components/Planet'
import Progress from './_components/Progress'
import ValueChangeDisplay from './_components/ValueChangeDisplay'

type Props = {
  toggleQuestionList?: () => void
}
export default function Total({ toggleQuestionList }: Props) {
  const { value } = useRule('bilan')

  const { getValue } = useEngine()

  const { tutorials, hideTutorial, showTutorial, getCurrentSimulation } =
    useUser()

  const { actionChoices } = getCurrentSimulation()

  const actionChoicesSumValue = Object.keys(actionChoices || {}).reduce(
    (acc, key) => {
      return acc + (actionChoices[key] ? getValue(key) : 0)
    },
    0
  )

  const carbonFootprintValue = value - actionChoicesSumValue

  const toggleOpen = () =>
    tutorials.scoreExplanation
      ? showTutorial('scoreExplanation')
      : hideTutorial('scoreExplanation')

  return (
    <div className="mb-2">
      <div className="relative mb-2 flex items-center justify-center gap-4 overflow-hidden rounded-lg bg-primary p-2 text-center text-white ">
        <Progress />
        <Planet />
        <Link
          href="/fin"
          className="z-10	text-white no-underline hover:text-white">
          <span className="block text-3xl font-bold">
            {(carbonFootprintValue / 1000).toLocaleString('fr-fr', {
              maximumFractionDigits: 1,
            })}{' '}
            tonnes
          </span>
          <span className="block">
            de CO<sub>2</sub>e / an
          </span>
        </Link>

        <QuestionButton onClick={toggleOpen} color="white" />

        <ValueChangeDisplay value={carbonFootprintValue} />
        {toggleQuestionList && (
          <ListToggle toggleQuestionList={toggleQuestionList} />
        )}
      </div>
      {!tutorials.scoreExplanation ? (
        <Explanation toggleOpen={toggleOpen} />
      ) : null}
    </div>
  )
}
