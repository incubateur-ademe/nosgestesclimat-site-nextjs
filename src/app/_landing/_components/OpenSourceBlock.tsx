'use client'

import TransClient from '@/components/translation/TransClient'
import { PropsWithChildren } from 'react'

export default function OpenSourceBlock({ children }: PropsWithChildren) {
	return (
		<div className="mx-auto w-full max-w-3xl px-4 pb-4 pt-10 md:px-8">
			<h2>
				<TransClient>Ouvert, documenté et contributif</TransClient>
			</h2>
			{children}
		</div>
	)
}
