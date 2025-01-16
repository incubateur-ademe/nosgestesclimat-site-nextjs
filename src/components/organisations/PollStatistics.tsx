'use client'

import Trans from '@/components/translation/Trans'
import type { Simulation } from '@/types/organisations'
import type { FunFacts } from '@abc-transitionbascarbone/near-modele'
import DetailedStatistics from './orgaStatistics/DetailedStatistics'
import FunFactsBlock from './orgaStatistics/FunFactsBlock'
import StatisticsBlocks from './orgaStatistics/StatisticsBlocks'

export default function PollStatistics({
  title,
  simulations,
  simulationsWithoutExtremes,
  funFacts,
}: {
  title?: string | JSX.Element
  simulations: Simulation[]
  simulationsWithoutExtremes: Simulation[]
  funFacts: FunFacts | undefined
}) {
  const hasAtLeastThreeParticipants = simulations?.length > 2

  return (
    <>
      <h2>{title ?? <Trans>Statistiques</Trans>}</h2>

      <section className="relative mb-8 flex gap-4">
        <StatisticsBlocks
          simulations={simulations}
          simulationsWithoutExtremes={simulationsWithoutExtremes}
        />
      </section>

      {hasAtLeastThreeParticipants && (
        <>
          <FunFactsBlock funFacts={funFacts} className="mb-12" />

          <DetailedStatistics funFacts={funFacts} />
        </>
      )}
    </>
  )
}
