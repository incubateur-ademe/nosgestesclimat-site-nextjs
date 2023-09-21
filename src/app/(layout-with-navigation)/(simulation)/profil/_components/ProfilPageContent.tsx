'use client'

import Trans from '@/components/translation/Trans'
import { useUser } from '@/publicodes-state'
import { Simulation } from '@/types/simulation'
import { capitaliseString } from '@/utils/capitaliseString'
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
          <Trans>👤 Vous utilisez actuellement le persona</Trans>{' '}
          <span className="font-bold">
            {capitaliseString(persona.split(' . ')[1])}
          </span>
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
