import Trans from '@/components/translation/Trans'
import { Organisation } from '@/types/organisations'
import { useState } from 'react'
import CustomQuestionForm from '../CustomQuestionForm'
import ToggleField from '../ToggleField'

type Props = {
  organisation: Organisation | undefined
  refetchOrganisation: () => void
  question: string
  isEnabled: boolean
  handleUpdateCustomQuestions: ({
    question,
    value,
  }: {
    question: string
    value: boolean
  }) => void
}

export default function CustomQuestion({
  organisation,
  refetchOrganisation,
  question,
  isEnabled,
  handleUpdateCustomQuestions,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <CustomQuestionForm
        submitLabel={<Trans>Modifier</Trans>}
        organisation={organisation}
        refetchOrganisation={refetchOrganisation}
        onCompleted={() => setIsEditing(false)}
        isEditMode
        question={question}
      />
    )
  }

  return (
    <ToggleField
      key={question}
      name={question}
      value={isEnabled}
      isCustomQuestion
      onChange={(isEnabled: boolean) => {
        handleUpdateCustomQuestions({ question, value: isEnabled })
      }}
      onEdit={() => setIsEditing(true)}
      onDelete={() => console.log('Open modal')}
      label={question}
    />
  )
}
