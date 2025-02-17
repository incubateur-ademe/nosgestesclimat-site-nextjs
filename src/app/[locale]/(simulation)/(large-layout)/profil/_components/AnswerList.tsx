'use client'

import AnswersIcon from '@/components/icons/AnswersIcon'
import TransClient from '@/components/translation/trans/TransClient'
import { useEngine, useForm, useSimulation } from '@/publicodes-state'
import Category from './answerList/Category'

export default function AnswerList() {
  const { categories } = useSimulation()
  const { relevantAnsweredQuestions } = useForm()

  const { getCategory } = useEngine()
  return (
    <div>
      <h2 className="flex items-center">
        <AnswersIcon className="fill-primary-700 mr-3" />

        <TransClient>Mes réponses</TransClient>
      </h2>

      {categories.map((category) =>
        relevantAnsweredQuestions.find(
          (question) => getCategory(question) === category
        ) ? (
          <Category key={category} category={category} />
        ) : null
      )}
    </div>
  )
}
