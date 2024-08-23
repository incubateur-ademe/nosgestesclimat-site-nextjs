'use client'

import { DottedName } from '@/publicodes-state/types'
import { createContext } from 'react'

type FormContextType = {
  questionsByCategories: Record<DottedName, DottedName[]>
  relevantQuestions: DottedName[]
  remainingQuestions: DottedName[]
  relevantAnsweredQuestions: DottedName[]
  remainingQuestionsByCategories: Record<DottedName, DottedName[]>
  currentQuestion: DottedName | null
  currentCategory: DottedName | null
  setCurrentQuestion: (question: DottedName | null) => void
  setCurrentCategory: (category: DottedName | null) => void
}
export default createContext<FormContextType>({
  questionsByCategories: {},
  relevantQuestions: [],
  remainingQuestions: [],
  relevantAnsweredQuestions: [],
  remainingQuestionsByCategories: {},
  currentQuestion: null,
  currentCategory: null,
  setCurrentQuestion: () => '',
  setCurrentCategory: () => '',
})
