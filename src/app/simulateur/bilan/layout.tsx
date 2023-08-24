'use client'

import { useEffect } from 'react'

import rules from './co2-model.FR-lang.fr-opti.json'

import { useUser, SimulationProvider } from '@/publicodes-state'
import PageLayout from '@/components/layout/PageLayout'

export default function SimulateurLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const {
		simulations,
		currentSimulation,
		initSimulation,
		updateSituationOfCurrentSimulation,
	} = useUser()

	useEffect(() => {
		if (!currentSimulation) {
			initSimulation()
		}
	}, [initSimulation, currentSimulation])
	return currentSimulation ? (
		<SimulationProvider
			key={currentSimulation}
			rules={rules}
			categoryOrder={[
				'transport',
				'alimentation',
				'logement',
				'divers',
				'services sociétaux',
			]}
			loader={<div>Loading</div>}
			situation={
				simulations.find(
					(simulation: any) => simulation.id === currentSimulation,
				)?.situation || {}
			}
			updateSituation={updateSituationOfCurrentSimulation}
		>
			<PageLayout shouldShowMenu>
				<div>{children}</div>
			</PageLayout>
		</SimulationProvider>
	) : (
		'Initialisation'
	)
}
