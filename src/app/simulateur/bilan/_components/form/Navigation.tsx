'use client'

import { useForm, useRule } from '@/publicodes-state'

import Button from '@/design-system/inputs/Button'

type Props = {
	question: string
}

export default function Form({ question }: Props) {
	const {
		gotoPrevQuestion,
		gotoNextQuestion,
		noPrevQuestion,
		noNextQuestion,
		noNextQuestionInCategory,
	} = useForm()
	const { isMissing } = useRule(question)

	return (
		<div className="flex justify-end  gap-4">
			<Button disabled={noPrevQuestion} onClick={gotoPrevQuestion}>
				← Précédent
			</Button>
			<Button disabled={noNextQuestion} onClick={gotoNextQuestion}>
				{isMissing
					? 'Je ne sais pas →'
					: noNextQuestionInCategory
					? 'Next category →'
					: 'Suivant →'}
			</Button>
		</div>
	)
}
