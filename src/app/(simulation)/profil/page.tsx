'use client'

import TransClient from '@/components/translation/TransClient'

import { useUser } from '@/publicodes-state'
import { Simulation } from '@/types/simulation'

import Title from '@/design-system/layout/Title'
import HasSimulationBanner from './_components/HasSimulationBanner'
import NoSimulationBanner from './_components/NoSimulationBanner'
import SimulationList from './_components/SimulationList'
import Localisation from './_components/localisation/Localisation'
import SimulationAnswerList from './_components/simulationAnswerList/SimulationAnswerList'
/*
export const metadata: Metadata = {
  title: 'Mon profil',
  description:
    'Explorez et modifiez les informations que vous avez saisies dans le parcours nosgestesclimat.',
}
*/

export default function Profil() {
  const { simulations, currentSimulation: currentSimulationId } = useUser()

  const currentSimulation = simulations.find(
    (simulation: Simulation) => simulation.id === currentSimulationId
  )
  const { persona } = currentSimulation || {}

  return (
    <>
      <Title title={<TransClient>Mon profil</TransClient>} />

      {persona && (
        <p>
          <em>
            <TransClient>👤 Vous utilisez actuellement le persona</TransClient>{' '}
            <code>{persona.nom}</code>
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
