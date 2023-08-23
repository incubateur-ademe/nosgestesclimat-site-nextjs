import React from 'react'

import { useRule } from '@/publicodes-state'
import { useForm } from '@/publicodes-state'

type Props = {
	question: string
}

export default function CategoryQuestion({ question }: Props) {
	const { label, title, isMissing, displayValue } = useRule(question)

	const { currentQuestion, setCurrentQuestion } = useForm()

	const isCurrentQuestion = currentQuestion === question
	return (
		<button
			className={`mb-2 block text-left hover:text-primary ${
				isCurrentQuestion ? 'underline' : ''
			} ${isMissing && !isCurrentQuestion ? 'text-gray-600' : ''}`}
			onClick={() => setCurrentQuestion(question)}
		>
			<span className="font-bold">{label || title}</span>
			<br />({question}) : <strong>{displayValue}</strong>
		</button>
	)
}
