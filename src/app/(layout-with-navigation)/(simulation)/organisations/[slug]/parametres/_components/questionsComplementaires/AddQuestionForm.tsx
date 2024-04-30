import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useAreCustomQuestionsEnabled } from '@/hooks/organisations/useAreCustomQuestionsEnabled'
import { useUpdateCustomQuestions } from '@/hooks/organisations/useUpdateCustomQuestions'
import { Organisation } from '@/types/organisations'
import { useState } from 'react'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'
import EditableToggleField from './EditableToggleField'

type Inputs = {
  question: string
}

type Props = {
  organisation: Organisation | undefined
  refetchOrganisation: () => void
}

export default function AddQuestionForm({
  organisation,
  refetchOrganisation,
}: Props) {
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)

  const { data: areCustomQuestionsEnabled, isFetched } =
    useAreCustomQuestionsEnabled(organisation)

  const { register, handleSubmit } = useReactHookForm<Inputs>()

  const { mutateAsync: updateCustomQuestions } = useUpdateCustomQuestions({
    pollSlug: organisation?.polls[0].slug ?? '',
    orgaSlug: organisation?.slug ?? '',
  })

  const onSubmit: SubmitHandler<Inputs> = async ({ question }) => {
    try {
      const customAdditionalQuestions = {
        ...(organisation?.polls[0].customAdditionalQuestions || {}),
        [question]: false,
      }

      await updateCustomQuestions({ customAdditionalQuestions })

      setIsAddingQuestion(false)
      refetchOrganisation()
    } catch (error) {
      console.error(error)
    }
  }

  // Show the form only for organisations with access
  if (!isFetched || !areCustomQuestionsEnabled) {
    return null
  }

  if (!isAddingQuestion) {
    return (
      <Button color="link" size="sm" onClick={() => setIsAddingQuestion(true)}>
        + <Trans>Ajouter une question personnalisée</Trans>
      </Button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex w-full flex-col items-start">
      <label htmlFor="question" className="mb-2 text-sm">
        <Trans>Votre question à ajouter</Trans>
      </label>

      <EditableToggleField {...register('question')} />

      <div className="flex gap-4">
        <Button
          onClick={() => setIsAddingQuestion(false)}
          size="sm"
          color="secondary"
          className="mt-4">
          <Trans>Annuler</Trans>
        </Button>

        <Button type="submit" size="sm" className="mt-4">
          <Trans>Ajouter la question</Trans>
        </Button>
      </div>
    </form>
  )
}
