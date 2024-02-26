import { useMemo } from 'react'
import Choice from './choices/Choice'

type Props = {
  answer: string | null
  choices: string[]
  setAnswer: (value: string) => void
}

export default function Choices({ answer, choices, setAnswer }: Props) {
  const shuffledChoices = useMemo(() => {
    return [...choices].sort(() => Math.random() - 0.5)
  }, [choices])

  return (
    <div className="mb-4">
      {shuffledChoices.map((choice) => (
        <Choice
          key={choice}
          answer={answer}
          choice={choice}
          setAnswer={setAnswer}
        />
      ))}
    </div>
  )
}
