'use client'

import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import CloseIcon from '@/components/icons/Close'
import Trans from '@/components/translation/trans/TransClient'
import { filterRelevantMissingVariables } from '@/helpers/actions/filterRelevantMissingVariables'
import {
  useEngine,
  useFormState,
  useRule,
  useTempEngine,
} from '@/publicodes-state'
import { checkIfDottedNameShouldNotBeIgnored } from '@/publicodes-state/helpers/checkIfDottedNameShouldNotBeIgnored'
import type { Action, MissingVariables } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  action: Action
  category: DottedName
  onComplete: () => void
  setActionWithFormOpen?: (dottedName: string) => void
  handleUpdatePersistedActions?: () => void
}

export default function ActionForm({
  action,
  category,
  onComplete,
  setActionWithFormOpen = () => {},
  handleUpdatePersistedActions = () => {},
}: Props) {
  const {
    currentQuestion,
    remainingQuestionsByCategories,
    setCurrentQuestion,
    setCurrentCategory,
    currentCategory,
  } = useFormState()

  const { everyQuestions, rawMissingVariables, safeEvaluate } = useEngine()

  const { extendedFoldedSteps } = useTempEngine()

  const { numericValue } = useRule(action.dottedName)

  const { missingVariables } = action

  const remainingQuestions = filterRelevantMissingVariables({
    everyQuestions,
    missingVariables: Object.keys(missingVariables || {}) as DottedName[],
    extendedFoldedSteps,
    rawMissingVariables,
    safeEvaluate,
  })

  const isActionApplicable =
    checkIfDottedNameShouldNotBeIgnored({
      dottedName: action.dottedName,
      safeEvaluate,
      rawMissingVariables: {} as MissingVariables,
    }) && numericValue !== 0

  useEffect(() => {
    if (category && !currentCategory) {
      setCurrentCategory(category)
    }
  }, [category, currentCategory, setCurrentCategory])

  useEffect(() => {
    if (currentCategory && !currentQuestion) {
      setCurrentQuestion(remainingQuestions?.[0])
    }
  }, [currentCategory, currentQuestion, remainingQuestions, setCurrentQuestion])

  if (!currentQuestion || !currentCategory) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: '1rem' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-live="polite"
      className="bg-primary-100 rounded-xl border-none p-4 pr-10 text-left shadow-lg">
      <button
        className="absolute top-3 right-4"
        onClick={() => setActionWithFormOpen('')}>
        <CloseIcon />
        <span className="sr-only">
          <Trans>Fermer</Trans>
        </span>
      </button>

      <Question question={currentQuestion} key={currentQuestion} />

      {!isActionApplicable && (
        <p className="text-primary-800 text-sm">
          <Trans>
            Vos réponses ne vous permettent pas de sélectionner ce geste ; il va
            être retiré de la liste de vos actions suggérées.
          </Trans>
        </p>
      )}

      <Navigation
        question={currentQuestion}
        onComplete={() => {
          onComplete()
          handleUpdatePersistedActions()
        }}
        isEmbedded
        remainingQuestions={remainingQuestions}
      />
    </motion.div>
  )
}
