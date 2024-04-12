'use client'

import { quizClickAnswer } from '@/constants/tracking/pages/quiz'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
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
    <div className="mb-4">
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
