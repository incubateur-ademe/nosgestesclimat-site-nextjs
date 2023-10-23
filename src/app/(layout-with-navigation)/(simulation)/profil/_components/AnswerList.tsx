'use client'

import Trans from '@/components/translation/Trans'
import { useForm } from '@/publicodes-state'
import Category from './answerList/Category'

export default function AnswerList() {
  const { categories } = useForm()

  return (
    <div>
      <h3>
        <span role="img" aria-label="emoji notepad" className="mr-4">
          📋
        </span>
        <Trans>Mes réponses</Trans>
      </h3>
      {categories.map((category) => (
        <Category key={category} category={category} />
      ))}
    </div>
  )
}
