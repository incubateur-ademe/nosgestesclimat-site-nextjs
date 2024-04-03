'use client'

import Trans from '@/components/translation/Trans'
import { useEngine, useForm, useSimulation } from '@/publicodes-state'
import Category from './answerList/Category'

export default function AnswerList() {
  const { categories } = useSimulation()
  const { relevantAnsweredQuestions } = useForm()

  const { getCategory } = useEngine()
  return (
    <div>
      <h2>
        <span role="img" aria-label="emoji notepad" className="mr-4">
          📋
        </span>
        <Trans>Mes réponses</Trans>
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
