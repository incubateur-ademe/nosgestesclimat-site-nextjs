'use client'

import AnswersIcon from '@/components/icons/AnswersIcon'
import { useEngine, useForm, useSimulation } from '@/publicodes-state'
import Category from './answerList/Category'

export default function AnswerList() {
  const { categories } = useSimulation()
  const { relevantAnsweredQuestions } = useForm()

  const { getCategory } = useEngine()
  return (
    <div>
      <h2 className="flex items-center">
        <AnswersIcon className="mr-3 fill-primary-700" />

        <NGCTrans>Mes réponses</NGCTrans>
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
