import Trans from '@/components/translation/Trans'
import { useUpdateCustomQuestions } from '@/hooks/organisations/useUpdateCustomQuestions'
import { Organisation, OrganisationPoll } from '@/types/organisations'
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
  const { mutateAsync: updateCustomQuestions } = useUpdateCustomQuestions({
    pollSlug: organisation?.polls[0].slug ?? '',
    orgaSlug: organisation?.slug ?? '',
  })

  function handleUpdateCustomQuestions({
    question,
    value,
  }: {
    question: string
    value: boolean
  }) {
    const customAdditionalQuestions = {
      ...(poll?.customAdditionalQuestions || {}),
      [question]: value,
    }
    updateCustomQuestions({ customAdditionalQuestions })

    showAndHideConfirmationMessage()

    refetchOrganisation()
  }

  return (
    <>
      <h3 className="mt-8">
        <Trans>Questions personnalisées</Trans>
      </h3>
      <div className="flex flex-col gap-4">
        {Object.entries(poll?.customAdditionalQuestions || {}).map(
          ([question, isEnabled]) => (
            <CustomQuestion
              organisation={organisation}
              refetchOrganisation={refetchOrganisation}
              key={question}
              question={question}
              isEnabled={isEnabled}
              handleUpdateCustomQuestions={handleUpdateCustomQuestions}
            />
          )
        )}
      </div>
    </>
  )
}
