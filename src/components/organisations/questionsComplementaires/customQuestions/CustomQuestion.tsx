import Trans from '@/components/translation/Trans'
import { OrganisationPoll } from '@/types/organisations'
import { useState } from 'react'
import CustomQuestionForm from '../CustomQuestionForm'
import ToggleField from '../ToggleField'

type Props = {
  poll:
    | Pick<
        OrganisationPoll,
        'customAdditionalQuestions' | 'defaultAdditionalQuestions'
      >
    | undefined
  onChange: (changes: Record<string, unknown>) => void
  question: string
  isEnabled: boolean
}

export default function CustomQuestion({
  poll,
  question,
  isEnabled,
  onChange,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)

  async function handleUpdateCustomQuestions({
    question,
    value,
  }: {
    question: string
    value: boolean
  }) {
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

    onChange({ customAdditionalQuestions })
  }

  async function handleDeleteQuestion(question: string) {
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

    onChange({ customAdditionalQuestions })
  }

  if (isEditing) {
    return (
      <CustomQuestionForm
        submitLabel={<Trans>Modifier</Trans>}
        poll={poll}
        onCompleted={(changes) => {
          onChange(changes)
          setIsEditing(false)
        }}
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
      onChange={async (isEnabled: boolean) => {
        await handleUpdateCustomQuestions({ question, value: isEnabled })
      }}
      onEdit={() => setIsEditing(true)}
      onDelete={handleDeleteQuestion}
      label={question}
    />
  )
}
