import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useAreCustomQuestionsEnabled } from '@/hooks/organisations/useAreCustomQuestionsEnabled'
import { OrganisationPoll } from '@/types/organisations'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import EditableToggleField from './EditableToggleField'

type Inputs = {
  question: string
}

type Props = {
  poll:
    | Pick<
        OrganisationPoll,
        'customAdditionalQuestions' | 'defaultAdditionalQuestions'
      >
    | undefined
  submitLabel?: string | JSX.Element
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
  onCompleted = () => {},
}: Props) {
  const [isFormDisplayed, setIsFormDisplayed] = useState(isEditMode ?? false)

  const { data: areCustomQuestionsEnabled, isFetched } =
    useAreCustomQuestionsEnabled()

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
        isEnabled: false,
      })
    }

    onCompleted({ customAdditionalQuestions })

    setIsFormDisplayed(false)
  }

  function handleCancel() {
    setIsFormDisplayed(false)
  }

  // Show the form only for organisations with access
  if (!isFetched || !areCustomQuestionsEnabled) {
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
        + <Trans>Ajouter une question personnalisée</Trans>
      </Button>
    )
  }
  return (
    <form
      id="custom-question-form"
      onSubmit={(event) => {
        console.log(event)
        event.preventDefault()
        handleSubmit(onSubmit)(event)
      }}
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
