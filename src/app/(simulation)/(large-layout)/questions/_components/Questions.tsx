'use client'

import { useEngine, useSimulation } from '@/publicodes-state'
import { useMemo } from 'react'
import Question from './questions/Question'

export default function Questions() {
  const { categories, everyQuestions } = useSimulation()
  const { getCategory } = useEngine()

  const orderedQuestions = useMemo(
    () =>
      everyQuestions.sort(
        (a, b) =>
          categories.indexOf(getCategory(a)) -
          categories.indexOf(getCategory(b))
      ),
    [everyQuestions, categories, getCategory]
  )

  return (
    <ul>
      {orderedQuestions.map((question) => (
        <Question key={question} question={question} />
      ))}
    </ul>
  )
}
