'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
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
  onCancel?: () => void
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
  onCancel,
}: Props) {
  const [isFormDisplayed, setIsFormDisplayed] = useState(isEditMode ?? false)

  const { t } = useClientTranslation()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useReactHookForm<Inputs>({
    defaultValues: {
      question: '',
    },
  })

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

    // Editing an existing question
    if (isEditMode && question !== questionValue) {
      const questionIndex = customAdditionalQuestions.findIndex(
        ({ question: questionSearched }) => questionSearched === question
      )

      if (questionIndex === -1) {
        return
      }

      customAdditionalQuestions[questionIndex].question = questionValue
    } else {
      // Adding a new question
      customAdditionalQuestions.push({
        question: questionValue,
        // Enabled by default
        isEnabled: true,
      })
    }

    onCompleted({ customAdditionalQuestions })

    setIsFormDisplayed(false)
  }

  function handleCancel() {
    setIsFormDisplayed(false)
    onCancel?.()
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
                reset()
                setIsFormDisplayed(true)
              }
        }>
        + <Trans>Ajouter une question personnalisée</Trans>
      </Button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-start">
      {!isEditMode && (
        <label htmlFor="question" className="mb-2 text-sm">
          <Trans>Votre question à ajouter</Trans>
        </label>
      )}

      <EditableToggleField
        {...register('question', { required: t('Ce champ est requis') })}
        error={errors.question?.message}
      />

      <div
        className={twMerge('mt-2 flex gap-4', `${isEditMode ? 'mt-1' : ''}`)}>
        <Button
          onClick={handleCancel}
          type="button"
          size={isEditMode ? 'xs' : 'sm'}
          color="secondary"
          className="mt-4">
          <Trans>Annuler</Trans>
        </Button>

        <Button type="submit" size={isEditMode ? 'xs' : 'sm'} className="mt-4">
          {submitLabel ?? <Trans>Ajouter la question</Trans>}
        </Button>
      </div>
    </form>
  )
}
