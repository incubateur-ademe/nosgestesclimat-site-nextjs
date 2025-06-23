'use client'

import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import CloseIcon from '@/components/icons/Close'
import Trans from '@/components/translation/trans/TransClient'
import { useFormState } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  category: DottedName
  onComplete: () => void
  setFocusedAction: (dottedName: string) => void
}

export default function ActionForm({
  category,
  onComplete,
  setFocusedAction,
}: Props) {
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
      initial={{ opacity: 0, y: '1rem' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-primary-100 rounded-xl border-none p-4 pr-10 text-left shadow-lg">
      <Question question={currentQuestion} key={currentQuestion} />
      <Navigation
        question={currentQuestion}
        onComplete={onComplete}
        isEmbedded
      />

      <button
        className="absolute top-3 right-4"
        onClick={() => setFocusedAction('')}>
        <CloseIcon />
        <span className="sr-only">
          <Trans>Fermer</Trans>
        </span>
      </button>
    </motion.div>
  )
}
