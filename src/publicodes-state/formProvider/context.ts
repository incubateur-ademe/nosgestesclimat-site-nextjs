'use client'

import { createContext } from 'react'

type FormContextType = {
  categories: string[]
  subcategories: Record<string, string[]>
  relevantQuestions: string[]
  questionsByCategories: Record<string, string[]>
  remainingCategories: string[]
  answeredCategories: string[]
  remainingQuestions: string[]
  answeredQuestions: string[]
  progression: number
  remainingQuestionsByCategories: Record<string, string[]>
  answeredQuestionsByCategories: Record<string, string[]>
  progressionByCategory: Record<string, number>
  currentQuestion: string | null
  currentCategory: string | null
  setCurrentQuestion: (question: string | null) => void
  setCurrentCategory: (category: string | null) => void
}
export default createContext<FormContextType>({
  categories: [],
  subcategories: {},
  relevantQuestions: [],
  questionsByCategories: {},
  remainingCategories: [],
  answeredCategories: [],
  remainingQuestions: [],
  answeredQuestions: [],
  progression: 0,
  remainingQuestionsByCategories: {},
  answeredQuestionsByCategories: {},
  progressionByCategory: {},
  currentQuestion: null,
  currentCategory: null,
  setCurrentQuestion: () => '',
  setCurrentCategory: () => '',
})
