'use client'

import { useContext } from 'react'
import formContext from '../../providers/formProvider/context'
import useNavigation from './useNavigation'

/**
 * A hook to help display a form inside the simulation
 */
export default function useForm() {
  const {
    relevantOrderedQuestions,
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    setCurrentCategory,
    remainingQuestions,
    relevantAnsweredQuestions,
    remainingQuestionsByCategories,
  } = useContext(formContext)

  const {
    gotoPrevQuestion,
    gotoNextQuestion,
    noPrevQuestion,
    noNextQuestion,
    isFirstQuestionOfCategory,
    isLastQuestionOfCategory,
  } = useNavigation({
    remainingQuestions,
    relevantOrderedQuestions,
    currentQuestion,
    setCurrentQuestion,
  })

  return {
    /**
     * Every questions (answered and missing) that should be displayed in the form
     */
    relevantOrderedQuestions,
    /**
     * The question that should currently be displayed in the form
     */
    currentQuestion,
    /**
     * The category of the current question
     */
    currentCategory,
    /**
     * Setter for the current question
     */
    setCurrentQuestion,
    /**
     * Setter for the current category (shouldn't be used: use setCurrentQuestion instead)
     */
    setCurrentCategory,
    /**
     * Go to the previous question as determined by relevantOrderedQuestions (and currentQuestion)
     */
    gotoPrevQuestion,
    /**
     * Go to the next question as determined by relevantOrderedQuestions (and currentQuestion)
     */
    gotoNextQuestion,
    /**
     * Is true if there is no previous question in the form
     */
    noPrevQuestion,
    /**
     * Is true if there is no next question in the form
     */
    noNextQuestion,
    /**
     * Is true if there is no previous question in the current category
     */
    isFirstQuestionOfCategory,
    /**
     * Is true if there is no next question in the current category
     */
    isLastQuestionOfCategory,
    /**
     * Every missing questions needed to complete the form
     */
    remainingQuestions,
    /**
     * Every answered questions that are still relevant and should be displayed in the form (foldedsteps minus questions that are disabled by parents and can't enable themselves)
     */
    relevantAnsweredQuestions,
    /**
     * Every missing questions needed to complete the form sorted by category
     */
    remainingQuestionsByCategories,
  }
}
