'use client'

import { createContext } from 'react'

type FormContextType = {
  relevantOrderedQuestions: string[]
  remainingQuestions: string[]
  relevantAnsweredQuestions: string[]
  remainingQuestionsByCategories: Record<string, string[]>
  currentQuestion: string | null
  currentCategory: string | null
  setCurrentQuestion: (question: string | null) => void
  setCurrentCategory: (category: string | null) => void
}
export default createContext<FormContextType>({
  relevantOrderedQuestions: [],
  remainingQuestions: [],
  relevantAnsweredQuestions: [],
  remainingQuestionsByCategories: {},
  currentQuestion: null,
  currentCategory: null,
  setCurrentQuestion: () => '',
  setCurrentCategory: () => '',
})
