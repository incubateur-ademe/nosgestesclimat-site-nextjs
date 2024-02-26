import { useMemo } from 'react'
import Choice from './choices/Choice'

type Props = {
  choices: string[]
  isAnswerValidated: boolean
  setAnswer: (value: string) => void
}

export default function Choices({
  choices,
  isAnswerValidated,
  setAnswer,
}: Props) {
  const shuffledChoices = useMemo(() => {
    return choices.sort(() => Math.random() - 0.5)
  }, [choices])

  return (
    <div>
      {shuffledChoices.map((choice) => (
        <Choice
          key={choice}
          choice={choice}
          isHeaviest={choice === choices[0]}
          isAnswerValidated={isAnswerValidated}
          setAnswer={setAnswer}
        />
      ))}
    </div>
  )
}
