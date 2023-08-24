import React from 'react'

import { useRule } from '@/publicodes-state'
import MosaicChild from './mosaic/MosaicChild'

type Props = {
	question: string
	setValue: Function
}

export default function Mosaic({ question }: Props) {
	const { childrenOfMosaic } = useRule(question)

	return (
		<div className="grid grid-cols-2 gap-4">
			{childrenOfMosaic.map((childOfMosaic) => (
				<MosaicChild key={childOfMosaic} child={childOfMosaic} />
			))}
		</div>
	)
}
