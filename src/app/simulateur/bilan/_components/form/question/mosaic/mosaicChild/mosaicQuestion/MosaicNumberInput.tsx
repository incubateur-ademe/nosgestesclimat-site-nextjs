import React from 'react'

import { useRule } from '@/publicodes-state'
type Props = {
	question: string
	title: string
}

export default function NumberInput({ question, title }: Props) {
	const { value, setValue, isMissing } = useRule(question)

	return (
		<>
			{title}
			<input
				className="mb-4 border border-white bg-black"
				type="number"
				value={isMissing ? '' : value}
				placeholder={value}
				onChange={(event) => setValue(event.target.value)}
			/>
		</>
	)
}
