'use client'

import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import { useForm } from '@/publicodes-state'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  category: string
  onComplete: () => void
}

export default function ActionForm({ category, onComplete }: Props) {
  const {
    currentQuestion,
    remainingQuestionsByCategories,
    setCurrentQuestion,
    setCurrentCategory,
    currentCategory,
  } = useForm()

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
      className="mb-4 rounded-xl bg-primary-100 p-4 text-left">
      <Question question={currentQuestion} key={currentQuestion} />
      <Navigation question={currentQuestion} onComplete={onComplete} />
    </motion.div>
  )
}
