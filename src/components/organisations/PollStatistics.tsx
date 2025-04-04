'use client'

import Trans from '@/components/translation/trans/TransClient'
import type { PublicPollSimulation } from '@/types/organisations'
import type { FunFacts } from '@incubateur-ademe/nosgestesclimat'
import type { ReactNode } from 'react'
import DetailedStatistics from './orgaStatistics/DetailedStatistics'
import FunFactsBlock from './orgaStatistics/FunFactsBlock'
import StatisticsBlocks from './orgaStatistics/StatisticsBlocks'

export default function PollStatistics({
  title,
  simulations,
  simulationsWithoutExtremes,
  funFacts,
}: {
  title?: string | ReactNode
  simulations: PublicPollSimulation[]
  simulationsWithoutExtremes: PublicPollSimulation[]
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
