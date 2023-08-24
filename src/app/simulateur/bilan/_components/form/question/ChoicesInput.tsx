import React from 'react'

import { useRule } from '@/publicodes-state'

type Props = {
	question: string
	setValue: Function
}

export default function ChoicesInput({ question, setValue }: Props) {
	const { value, isMissing, choices } = useRule(question)

	return (
		<div className="align flex flex-col items-end">
			{choices &&
				choices.map((choice: any) => {
					const active = isMissing
						? false
						: value === choice.value.substr(1, choice.value.length - 2) ||
						  (!value && choice.value === 'non') ||
						  (value && choice.value === 'oui')
						? true
						: false
					return (
						<button
							key={choice.value}
							className={`mb-2 rounded border border-primary px-4 py-2 text-xl ${
								active ? 'bg-primary text-white' : 'bg-grey-100 text-primary'
							}`}
							onClick={() => setValue(choice.value)}
						>
							<span
								className={`${
									active ? 'before:border-white' : 'before:border-primary'
								} flex items-center gap-2 before:block before:h-5 before:w-5 before:rounded-full before:border-2`}
							>
								{choice.label}
							</span>
						</button>
					)
				})}
		</div>
	)
}
