'use client'

import TransClient from '@/components/translation/TransClient'
import InlineLink from '@/design-system/inputs/InlineLink'

export default function QuestionsBlock() {
	return (
		<div className="mx-auto w-full max-w-3xl px-4 pb-10 pt-4 md:px-8">
			<h2 className="mt-8">
				<TransClient>Des questions ?</TransClient>
			</h2>
			<p>
				<TransClient>
					Retrouvez les réponses aux questions courantes sur notre page{' '}
					<InlineLink href="/questions-frequentes">FAQ</InlineLink>.
				</TransClient>
			</p>
		</div>
	)
}
