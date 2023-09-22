'use client'

import Trans from '@/components/translation/Trans'
import { useUser } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'
import { Simulation } from '@/types/simulation'
import HasSimulationBanner from './HasSimulationBanner'
import NoSimulationBanner from './NoSimulationBanner'
import SimulationList from './SimulationList'
import Localisation from './localisation/Localisation'
import SimulationAnswerList from './simulationAnswerList/SimulationAnswerList'

type Props = {
  supportedRegions: SuppportedRegions
}
export default function ProfilPageContent({ supportedRegions }: Props) {
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
            <Trans>👤 Vous utilisez actuellement le persona</Trans>{' '}
            <code>{(persona as any).nom}</code>
          </em>
        </p>
      )}

      <NoSimulationBanner />

      <HasSimulationBanner />

      <Localisation supportedRegions={supportedRegions} />

      <SimulationAnswerList />

      {simulations && <SimulationList />}
    </>
  )
}
