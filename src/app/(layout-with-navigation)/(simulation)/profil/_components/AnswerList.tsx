'use client'

import { useForm } from '@/publicodes-state'
import Category from './answerList/Category'

export default function AnswerList() {
  const { categories } = useForm()

  return (
    <div>
      {categories.map((category) => (
        <Category key={category} category={category} />
      ))}
    </div>
  )
}
