'use client'

import { createContext } from 'react'

type FormContextType = {
  relevantQuestions: string[]
  questionsByCategories: Record<string, string[]>
  remainingQuestions: string[]
  progression: number
  remainingQuestionsByCategories: Record<string, string[]>
  currentQuestion: string | null
  currentCategory: string | null
  setCurrentQuestion: (question: string | null) => void
  setCurrentCategory: (category: string | null) => void
  categories: string[]
  subcategories: Record<string, string[]>
}
export default createContext<FormContextType>({
  relevantQuestions: [],
  questionsByCategories: {},
  remainingQuestions: [],
  progression: 0,
  remainingQuestionsByCategories: {},
  currentQuestion: null,
  currentCategory: null,
  setCurrentQuestion: () => '',
  setCurrentCategory: () => '',
  categories: [],
  subcategories: {},
})
