type Props = {
  answer: string | null
  choices: string[]
  isAnswerValidated: boolean
  setAnswer: (value: string) => void
}

export default function Choices({
  answer,
  choices,
  isAnswerValidated,
  setAnswer,
}: Props) {
  return null
  //return <div>{choices.map(choice => <Choice choice={choice} answer={answer} isAnswerValidated={isAnswerValidated})}</div>
}
