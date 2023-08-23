import React from 'react'

import { useUser, useEngine } from '@/publicodes-state'

type Props = {
	persona: any
	rules: any
	dottedName: string
}

export default function Persona({ persona, rules, dottedName }: Props) {
	const { getValue } = useEngine({ rules, situation: persona.situation })
	const { initSimulation } = useUser()
	return (
		<div className="mb-4 rounded border border-white p-4">
			<h2>
				{persona.nom} ({getValue('bilan')}&nbsp;kgCO2e)
			</h2>
			<p className="text-xs">{persona.description}</p>
			<button
				className="rounded bg-white px-4 py-2 text-black disabled:bg-gray-500"
				onClick={() =>
					initSimulation({ situation: persona.situation, persona: dottedName })
				}
			>
				Selectionner
			</button>
		</div>
	)
}
