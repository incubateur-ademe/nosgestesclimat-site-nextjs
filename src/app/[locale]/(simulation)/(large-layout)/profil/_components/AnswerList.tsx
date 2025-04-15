'use client'

import AnswersIcon from '@/components/icons/AnswersIcon'
import Trans from '@/components/translation/trans/TransClient'
import { useEngine, useFormState } from '@/publicodes-state'
import Category from './answerList/Category'

export default function AnswerList() {
  const { relevantAnsweredQuestions } = useFormState()

  const { getCategory, categories } = useEngine()
  return (
    <div>
      <h2 className="flex items-center">
        <AnswersIcon className="fill-primary-700 mr-3" />

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
