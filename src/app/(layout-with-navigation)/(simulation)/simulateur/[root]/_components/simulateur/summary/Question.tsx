'use client'

import ChoicesValue from '@/components/misc/ChoicesValue'
import NumberValue from '@/components/misc/NumberValue'
import { simulateurClickSommaireQuestion } from '@/constants/tracking/pages/simulateur'
import { foldEveryQuestionsUntil } from '@/helpers/foldEveryQuestionsUntil'
import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
import { useDebug } from '@/hooks/useDebug'
import { useCurrentSimulation, useForm, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  question: string
  toggleQuestionList: () => void
}

const statusClassNames = {
  missing: 'bg-gray-100 text-gray-500',
  current: 'border-2 border-primary-700 bg-primary-300',
  default: 'bg-primary-200',
}
export default function Question({ question, toggleQuestionList }: Props) {
  const {
    label,
    isMissing,
    isFolded,
    value,
    displayValue,
    unit,
    type,
    category,
  } = useRule(question)

  const { updateCurrentSimulation } = useCurrentSimulation()

  const { currentQuestion, setCurrentQuestion, relevantQuestions } = useForm()

  const isDebug = useDebug()

  const status =
    currentQuestion === question ? 'current' : isFolded ? 'default' : 'missing'

  return (
    <button
      disabled={!isDebug && !isFolded}
      className={`relative mb-2 flex w-full flex-col items-start justify-between gap-2 overflow-hidden rounded-xl p-4 pl-6 text-left font-bold md:flex-row md:items-center md:gap-4 ${statusClassNames[status]} `}
      onClick={() => {
        if (isDebug) {
          foldEveryQuestionsUntil({
            question,
            relevantQuestions,
            updateCurrentSimulation,
          })
        }
        setCurrentQuestion(question)

        trackEvent(simulateurClickSommaireQuestion)

        toggleQuestionList()
      }}>
      <div
        className={`absolute bottom-0 left-0 top-0 w-2 ${getBackgroundColor(
          category
        )}`}
      />
      <div className="text-sm md:w-2/3 md:text-base">
        {isDebug ? (
          <>
            {question} ({type})
          </>
        ) : (
          label
        )}
      </div>
      {!isMissing && displayValue !== 'mosaic' ? (
        <div className="align-center flex justify-end whitespace-nowrap md:text-lg">
          <div
            className={`rounded-xl bg-white px-4 py-2 ${
              isMissing ? 'text-gray-300' : 'text-primary-700'
            } first-letter:uppercase`}>
            {type === 'number' && (
              <NumberValue displayValue={displayValue} unit={unit} />
            )}
            {type === 'boolean' && displayValue}
            {type === 'choices' &&
              (value ? (
                <ChoicesValue value={value} question={question} />
              ) : null)}
          </div>
        </div>
      ) : null}
    </button>
  )
}
