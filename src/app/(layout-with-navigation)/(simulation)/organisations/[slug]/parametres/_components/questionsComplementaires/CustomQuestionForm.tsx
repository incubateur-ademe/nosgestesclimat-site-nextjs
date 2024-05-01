import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useAreCustomQuestionsEnabled } from '@/hooks/organisations/useAreCustomQuestionsEnabled'
import { useUpdateCustomQuestions } from '@/hooks/organisations/useUpdateCustomQuestions'
import { Organisation } from '@/types/organisations'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import EditableToggleField from './EditableToggleField'

type Inputs = {
  question: string
}

type Props = {
  organisation: Organisation | undefined
  refetchOrganisation: () => void
  submitLabel?: string | JSX.Element
  isEditMode?: boolean
  onCompleted?: () => void
  question?: string
}

const MAX_NUMBER_QUESTIONS = 4

export default function CustomQuestionForm({
  organisation,
  refetchOrganisation,
  submitLabel,
  question,
  isEditMode,
  onCompleted = () => {},
}: Props) {
  const [isFormDisplayed, setIsFormDisplayed] = useState(isEditMode ?? false)

  const { data: areCustomQuestionsEnabled, isFetched } =
    useAreCustomQuestionsEnabled(organisation)

  const { register, handleSubmit, setValue, reset } = useReactHookForm<Inputs>()

  useEffect(() => {
    if (question) {
      setValue('question', question)
    }
  }, [question, setValue])

  const { mutateAsync: updateCustomQuestions } = useUpdateCustomQuestions({
    pollSlug: organisation?.polls[0].slug ?? '',
    orgaSlug: organisation?.slug ?? '',
  })

  const onSubmit: SubmitHandler<Inputs> = async ({
    question: questionValue,
  }) => {
    try {
      const customAdditionalQuestions = [
        ...(organisation?.polls[0].customAdditionalQuestions || []),
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
          isEnabled: false,
        })
      }

      await updateCustomQuestions({ customAdditionalQuestions })

      setIsFormDisplayed(false)
      refetchOrganisation()
      onCompleted()
    } catch (error) {
      console.error(error)
    }
  }

  function handleCancel() {
    setIsFormDisplayed(false)
    onCompleted()
  }

  // Show the form only for organisations with access
  if (!isFetched || !areCustomQuestionsEnabled) {
    return null
  }

  const hasReachedMaxQuestions =
    (organisation?.polls?.[0]?.customAdditionalQuestions || [])?.length >=
    MAX_NUMBER_QUESTIONS

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
        + <Trans>Ajouter une question personnalisée</Trans>
      </Button>
    )
  }
  return (
    <form
      id="custom-question-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-start">
      {!isEditMode && (
        <label htmlFor="question" className="mb-2 text-sm">
          <Trans>Votre question à ajouter</Trans>
        </label>
      )}

      <EditableToggleField {...register('question')} />

      <div
        className={twMerge('mt-2 flex gap-4', `${isEditMode ? 'mt-1' : ''}`)}>
        <Button
          onClick={handleCancel}
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
