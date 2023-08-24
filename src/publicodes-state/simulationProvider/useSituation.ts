import { useState, useEffect } from 'react'

type Props = {
	engine: any
	defaultSituation?: any
	externalSituation: any
	updateExternalSituation: Function
}
export default function useSituation({
	engine,
	defaultSituation = {},
	externalSituation,
	updateExternalSituation,
}: Props) {
	const [situation, setSituation] = useState(defaultSituation)

	const updateSituation = (situationToAdd: any) => {
		console.log('update situation', situationToAdd)
		const oldTotal = engine.evaluate('bilan').nodeValue
		updateExternalSituation(situationToAdd)

		// TODO: this is shit
		return new Promise((resolve) => {
			requestAnimationFrame(() => {
				const newTotal = engine.evaluate('bilan').nodeValue
				resolve({ oldTotal, newTotal })
			})
		})
	}

	useEffect(() => {
		console.log('set situation', externalSituation)
		engine.setSituation(externalSituation)
		setSituation(externalSituation)
	}, [externalSituation, engine])

	return {
		situation,
		updateSituation,
	}
}
