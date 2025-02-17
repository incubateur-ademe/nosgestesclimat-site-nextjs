'use client'

import TransClient from '@/components/translation/trans/TransClient'
import Button from '@/design-system/inputs/Button'
import type { Organisation, OrganisationPoll } from '@/types/organisations'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm as useReactHookForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import EditableToggleField from './EditableToggleField'
type Inputs = { question: string }

type Props = {
  organisation: Organisation
  poll: Pick<
    OrganisationPoll,
    'customAdditionalQuestions' | 'defaultAdditionalQuestions'
  >
  submitLabel?: string | ReactNode
  isEditMode?: boolean
  onCompleted?: (changes: Record<string, unknown>) => void
  question?: string
}

const MAX_NUMBER_QUESTIONS = 4

export default function CustomQuestionForm({
  poll,
  submitLabel,
  question,
  isEditMode,
  organisation,
  onCompleted = () => {},
}: Props) {
  const [isFormDisplayed, setIsFormDisplayed] = useState(isEditMode ?? false)

  const { register, handleSubmit, setValue, reset } = useReactHookForm<Inputs>()

  useEffect(() => {
    if (question) {
      setValue('question', question)
    }
  }, [question, setValue])

  const onSubmit: SubmitHandler<Inputs> = async ({
    question: questionValue,
  }) => {
    const customAdditionalQuestions = [
      ...(poll?.customAdditionalQuestions || []),
    ]

    if (isEditMode && question !== questionValue) {
      const questionIndex = customAdditionalQuestions.findIndex(
        ({ question: questionSearched }) => questionSearched === question
      )

      if (questionIndex === -1) {
        return
      }

      customAdditionalQuestions[questionIndex].question = questionValue
    } else {
      customAdditionalQuestions.push({
        question: questionValue,
        isEnabled: true,
      })
    }

    onCompleted({ customAdditionalQuestions })

    setIsFormDisplayed(false)
  }

  function handleCancel() {
    setIsFormDisplayed(false)
  }

  // Show the form only for organisations with access
  if (!organisation.hasCustomQuestionEnabled) {
    return null
  }

  const hasReachedMaxQuestions =
    (poll?.customAdditionalQuestions || [])?.length >= MAX_NUMBER_QUESTIONS

  if (!isFormDisplayed) {
    return (
      <Button
        color="link"
        size="sm"
        aria-disabled={hasReachedMaxQuestions}
        onClick={
          hasReachedMaxQuestions
            ? () => {}
            : () => {
                // Reset the form if it was previously used
                reset()
                setIsFormDisplayed(true)
              }
        }>
        + <TransClient>Ajouter une question personnalisée</TransClient>
      </Button>
    )
  }
  return (
    <form
      id="custom-question-form"
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(onSubmit)(event)
      }}
      className="flex w-full flex-col items-start">
      {!isEditMode && (
        <label htmlFor="question" className="mb-2 text-sm">
          <TransClient>Votre question à ajouter</TransClient>
        </label>
      )}

      <EditableToggleField {...register('question')} />

      <div
        className={twMerge('mt-2 flex gap-4', `${isEditMode ? 'mt-1' : ''}`)}>
        <Button
          onClick={handleCancel}
          type="button"
          size={isEditMode ? 'xs' : 'sm'}
          color="secondary"
          className="mt-4">
          <TransClient>Annuler</TransClient>
        </Button>

        <Button type="submit" size={isEditMode ? 'xs' : 'sm'} className="mt-4">
          {submitLabel ?? <TransClient>Ajouter la question</TransClient>}
        </Button>
      </div>
    </form>
  )
}
