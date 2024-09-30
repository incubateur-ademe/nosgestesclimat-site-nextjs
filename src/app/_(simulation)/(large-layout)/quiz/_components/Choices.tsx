'use client'

import { quizClickAnswer } from '@/constants/tracking/pages/quiz'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useMemo } from 'react'
import Choice from './choices/Choice'

type Props = {
  answer: DottedName | null
  choices: DottedName[]
  setAnswer: (value: DottedName) => void
}

export default function Choices({ answer, choices, setAnswer }: Props) {
  const shuffledChoices = useMemo(() => {
    return [...choices].sort(() => Math.random() - 0.5)
  }, [choices])

  return (
    <div className="mb-4 flex flex-col gap-4">
      {shuffledChoices.map((choice) => (
        <Choice
          key={choice}
          answer={answer}
          choice={choice}
          setAnswer={(answer) => {
            trackEvent(quizClickAnswer(answer))
            setAnswer(answer)
          }}
        />
      ))}
    </div>
  )
}
