'use client'

import Trans from '@/components/translation/Trans'
import { SimulationRecap } from '@/types/organisations'
import { FunFacts } from '@incubateur-ademe/nosgestesclimat'
import FunFactsBlock from './orgaStatistics/FunFactsBlock'
import StatisticsBlocks from './orgaStatistics/StatisticsBlocks'

export default function PollStatistics({
  title,
  simulationRecaps,
  funFacts,
}: {
  title?: string | JSX.Element
  simulationRecaps: SimulationRecap[]
  funFacts: FunFacts | undefined
}) {
  const hasAtLeastThreeParticipants = simulationRecaps?.length > 2

  return (
    <>
      <h2>{title ?? <Trans>Statistiques</Trans>}</h2>

      <section className="relative mb-8 flex gap-4">
        <StatisticsBlocks simulationRecaps={simulationRecaps} />
      </section>

      {hasAtLeastThreeParticipants && (
        <FunFactsBlock funFacts={funFacts} className="mb-12" />
      )}
    </>
  )
}
