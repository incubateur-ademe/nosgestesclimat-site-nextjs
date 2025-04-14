'use client'

import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import { useFormState } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  category: DottedName
  onComplete: () => void
}

export default function ActionForm({ category, onComplete }: Props) {
  const {
    currentQuestion,
    remainingQuestionsByCategories,
    setCurrentQuestion,
    setCurrentCategory,
    currentCategory,
  } = useFormState()

  useEffect(() => {
    if (category && !currentCategory) {
      setCurrentCategory(category)
    }
  }, [category, currentCategory, setCurrentCategory])

  useEffect(() => {
    if (currentCategory && !currentQuestion) {
      setCurrentQuestion(remainingQuestionsByCategories[currentCategory]?.[0])
    }
  }, [
    currentCategory,
    currentQuestion,
    remainingQuestionsByCategories,
    setCurrentQuestion,
  ])

  if (!currentQuestion || !currentCategory) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-primary-100 mb-4 rounded-xl p-4 text-left">
      <Question question={currentQuestion} key={currentQuestion} />
      <Navigation
        question={currentQuestion}
        onComplete={onComplete}
        isEmbedded
      />
    </motion.div>
  )
}
