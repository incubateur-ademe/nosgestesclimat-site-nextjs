'use client'

import { useCurrentSimulation, useEngine } from '@/publicodes-state'

import { NOT_FOUND_PATH } from '@/constants/urls/paths'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import FormContext from './context'
import useCurrent from './hooks/useCurrent'
import useProgression from './hooks/useProgression'
import useQuestions from './hooks/useQuestions'

type Props = {
  root?: DottedName
}

function FormProvider({ root = 'bilan', children }: PropsWithChildren<Props>) {
  const {
    categories,
    subcategories,
    safeEvaluate,
    everyQuestions,
    everyMosaicChildrenWithParent,
  } = useEngine()

  const { situation, foldedSteps, updateCurrentSimulation } =
    useCurrentSimulation()

  const {
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    setCurrentCategory,
  } = useCurrent()

  const {
    remainingQuestions,
    relevantAnsweredQuestions,
    relevantQuestions,
    questionsByCategories,
  } = useQuestions({
    root,
    safeEvaluate,
    categories,
    subcategories,
    foldedSteps,
    situation,
    everyQuestions,
    everyMosaicChildrenWithParent,
  })

  const { remainingQuestionsByCategories } = useProgression({
    categories,
    remainingQuestions,
    relevantQuestions,
    updateCurrentSimulation,
  })

  return (
    <FormContext.Provider
      value={{
        questionsByCategories,
        relevantQuestions,
        remainingQuestions,
        relevantAnsweredQuestions,
        remainingQuestionsByCategories,
        currentQuestion,
        currentCategory,
        setCurrentQuestion,
        setCurrentCategory,
      }}>
      {children}
    </FormContext.Provider>
  )
}

/**
 * This is not the real provider but a failsafe: if root is invalid we do not go further
 */
export default function FailSafeFormProvider({
  root = 'bilan',
  children,
}: PropsWithChildren<{
  root?: DottedName
}>) {
  const { safeEvaluate, rules } = useEngine()

  const isRootSafe = useMemo<boolean>(() => {
    if (!rules) return true

    return safeEvaluate(root) ? true : false
  }, [safeEvaluate, root, rules])

  if (!isRootSafe) {
    window.location.href = NOT_FOUND_PATH
    return
  }
  return <FormProvider root={root}>{children}</FormProvider>
}
