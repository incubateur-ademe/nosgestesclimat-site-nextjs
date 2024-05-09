import Trans from '@/components/translation/Trans'
import { useUpdateCustomQuestions } from '@/hooks/organisations/useUpdateCustomQuestions'
import { Organisation, OrganisationPoll } from '@/types/organisations'
import { captureException } from '@sentry/react'
import CustomQuestion from './customQuestions/CustomQuestion'

type Props = {
  organisation: Organisation | undefined
  poll: OrganisationPoll | undefined
  showAndHideConfirmationMessage: () => void
  refetchOrganisation: () => void
}

export default function CustomQuestions({
  organisation,
  poll,
  showAndHideConfirmationMessage,
  refetchOrganisation,
}: Props) {
  const { mutateAsync: updateCustomQuestions, isPending } =
    useUpdateCustomQuestions({
      pollSlug: organisation?.polls[0].slug ?? '',
      orgaSlug: organisation?.slug ?? '',
    })

  async function handleUpdateCustomQuestions({
    question,
    value,
  }: {
    question: string
    value: boolean
  }) {
    try {
      const customAdditionalQuestions = [
        ...(poll?.customAdditionalQuestions || []),
      ]

      const questionIndex = customAdditionalQuestions.findIndex(
        ({ question: questionSearched }) => questionSearched === question
      )

      if (questionIndex === -1) {
        return
      }

      customAdditionalQuestions[questionIndex].isEnabled = value

      await updateCustomQuestions({ customAdditionalQuestions })

      showAndHideConfirmationMessage()

      refetchOrganisation()
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDeleteQuestion(question: string) {
    try {
      const customAdditionalQuestions = [
        ...(poll?.customAdditionalQuestions || []),
      ]

      const questionIndex = customAdditionalQuestions.findIndex(
        ({ question: questionSearched }) => questionSearched === question
      )

      if (questionIndex === -1) {
        return
      }

      customAdditionalQuestions.splice(questionIndex, 1)

      await updateCustomQuestions({ customAdditionalQuestions })

      showAndHideConfirmationMessage()

      refetchOrganisation()
    } catch (error) {
      captureException(error)
    }
  }

  if (poll?.customAdditionalQuestions?.length === 0) {
    return null
  }

  return (
    <>
      <h3 className="mt-8">
        <Trans>Questions personnalisées</Trans>
      </h3>
      <div className="flex flex-col gap-4">
        {poll?.customAdditionalQuestions?.map(({ question, isEnabled }) => (
          <CustomQuestion
            organisation={organisation}
            refetchOrganisation={refetchOrganisation}
            key={question}
            question={question}
            isEnabled={isEnabled}
            handleUpdateCustomQuestions={handleUpdateCustomQuestions}
            handleDeleteQuestion={handleDeleteQuestion}
            isLoadingUpdate={isPending}
          />
        ))}
      </div>
    </>
  )
}
