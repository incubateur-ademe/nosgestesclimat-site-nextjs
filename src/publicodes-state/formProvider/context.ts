'use client'

import { createContext } from 'react'

type FormContextType = {
  relevantQuestions: string[]
  questionsByCategories: Record<string, string[]>
  remainingQuestions: string[]
  relevantAnsweredQuestions: string[]
  progression: number
  remainingQuestionsByCategories: Record<string, string[]>
  currentQuestion: string | null
  currentCategory: string | null
  setCurrentQuestion: (question: string | null) => void
  setCurrentCategory: (category: string | null) => void
  categories: string[]
  subcategories: Record<string, string[]>
  isNavigationToNextQuestionDisabled: boolean
  setIsNavigationToNextQuestionDisabled: (value: boolean) => void
}
export default createContext<FormContextType>({
  relevantQuestions: [],
  questionsByCategories: {},
  remainingQuestions: [],
  relevantAnsweredQuestions: [],
  progression: 0,
  remainingQuestionsByCategories: {},
  currentQuestion: null,
  currentCategory: null,
  setCurrentQuestion: () => '',
  setCurrentCategory: () => '',
  categories: [],
  subcategories: {},
  isNavigationToNextQuestionDisabled: false,
  setIsNavigationToNextQuestionDisabled: () => {},
})
