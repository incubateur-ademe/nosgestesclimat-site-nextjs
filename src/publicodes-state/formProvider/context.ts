'use client'

import { createContext } from 'react'

type FormContextType = {
  categories: string[]
  subcategories: {
    [key: string]: string[]
  }
  relevantQuestions: string[]
  questionsByCategories: {
    [key: string]: string[]
  }
  remainingCategories: string[]
  answeredCategories: string[]
  remainingQuestions: string[]
  answeredQuestions: string[]
  progression: number
  remainingQuestionsByCategories: {
    [key: string]: string[]
  }
  answeredQuestionsByCategories: {
    [key: string]: string[]
  }
  progressionByCategory: {
    [key: string]: number
  }
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
