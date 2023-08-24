import { useState, useEffect } from 'react'

type Props = {
	storageKey: string
	forgetSimulations?: boolean
}
export default function usePersistentSimulations({
	storageKey,
	forgetSimulations,
}: Props) {
	const [initialized, setInitialized] = useState(false)

	const [simulations, setSimulations] = useState<any[]>([])
	const [currentSimulation, setCurrentSimulation] = useState<string>('')

	useEffect(() => {
		const storedSimulations: any[] = forgetSimulations
			? []
			: JSON.parse(localStorage.getItem(storageKey) || '{}').simulations || []
		const storedCurrentSimulation: string = forgetSimulations
			? ''
			: JSON.parse(localStorage.getItem(storageKey) || '{}')
					.currentSimulation || ''

		setSimulations(storedSimulations)
		setCurrentSimulation(storedCurrentSimulation)
		setInitialized(true)
	}, [storageKey, forgetSimulations])

	useEffect(() => {
		if (initialized) {
			const currentStorage = JSON.parse(
				localStorage.getItem(storageKey) || '{}',
			)
			const updatedStorage = { ...currentStorage, simulations }
			localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
		}
	}, [storageKey, simulations, initialized])

	useEffect(() => {
		if (initialized) {
			const currentStorage = JSON.parse(
				localStorage.getItem(storageKey) || '{}',
			)
			const updatedStorage = { ...currentStorage, currentSimulation }
			localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
		}
	}, [storageKey, currentSimulation, initialized])

	return {
		simulations,
		setSimulations,
		currentSimulation,
		setCurrentSimulation,
	}
}
