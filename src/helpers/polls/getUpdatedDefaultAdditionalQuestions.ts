import { PollDefaultAdditionalQuestion } from '@/constants/organisations/pollDefaultAdditionalQuestion'

interface Props {
  defaultAdditionalQuestions: PollDefaultAdditionalQuestion[]
  questionKey: PollDefaultAdditionalQuestion
  value: boolean
}

export function getUpdatedDefaultAdditionalQuestions({
  defaultAdditionalQuestions,
  questionKey,
  value,
}: Props) {
  const updatedDefaultAdditionalQuestions = [...defaultAdditionalQuestions]

  if (value && !updatedDefaultAdditionalQuestions.includes(questionKey)) {
    updatedDefaultAdditionalQuestions.push(questionKey)
  } else if (
    !value &&
    updatedDefaultAdditionalQuestions.includes(questionKey)
  ) {
    updatedDefaultAdditionalQuestions.splice(
      updatedDefaultAdditionalQuestions.indexOf(questionKey),
      1
    )
  }

  // Always return an array with the same order, postalCode first if it is present, then birthdate
  updatedDefaultAdditionalQuestions.sort((a, b) => {
    if (a === PollDefaultAdditionalQuestion.postalCode) return -1
    if (b === PollDefaultAdditionalQuestion.postalCode) return 1
    return 0
  })

  return updatedDefaultAdditionalQuestions
}
