'use client'

import TransClient from '@/components/translation/TransClient'
import { useUser } from '@/publicodes-state'
import { Simulation } from '@/types/simulation'
import HasSimulationBanner from './HasSimulationBanner'
import NoSimulationBanner from './NoSimulationBanner'
import SimulationList from './SimulationList'
import Localisation from './localisation/Localisation'
import SimulationAnswerList from './simulationAnswerList/SimulationAnswerList'

export default function ProfilPageContent() {
  const { simulations, currentSimulationId } = useUser()

  const currentSimulation = (simulations as Simulation[]).find(
    (simulation: Simulation) => simulation.id === currentSimulationId
  )
  const { persona } = currentSimulation || {}
  return (
    <>
      {persona && (
        <p>
          <em>
            <TransClient>👤 Vous utilisez actuellement le persona</TransClient>{' '}
            <code>{(persona as any).nom}</code>
          </em>
        </p>
      )}

      <NoSimulationBanner />

      <HasSimulationBanner />

      <Localisation />

      <SimulationAnswerList />

      {simulations && <SimulationList />}
    </>
  )
}
