'use client'

import Trans from '@/components/translation/trans/TransClient'
import type { Organisation, OrganisationPoll } from '@/types/organisations'
import { useState } from 'react'
import CustomQuestionForm from '../CustomQuestionForm'
import ToggleField from '../ToggleField'

type Props = {
  organisation: Organisation
  poll: Pick<
    OrganisationPoll,
    'customAdditionalQuestions' | 'defaultAdditionalQuestions'
  >
  onChange: (changes: Record<string, unknown>) => void
  question: string
  isEnabled: boolean
}

export default function CustomQuestion({
  poll,
  question,
  isEnabled,
  onChange,
  organisation,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)

  function handleUpdateCustomQuestions({
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

  function handleDeleteQuestion(question: string) {
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
        organisation={organisation}
        submitLabel={<Trans>Modifier</Trans>}
        poll={poll}
        onCompleted={(changes) => {
          onChange(changes)
          setIsEditing(false)
        }}
        onCancel={() => setIsEditing(false)}
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
      onDelete={handleDeleteQuestion}
      label={question}
    />
  )
}
