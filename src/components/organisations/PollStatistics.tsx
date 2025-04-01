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
  simulationsCount,
  simulationsWithoutExtremes,
  funFacts,
}: {
  title?: string | ReactNode
  simulationsCount: number
  simulationsWithoutExtremes: PublicPollSimulation[]
  funFacts?: FunFacts | null
}) {
  const hasAtLeastThreeParticipants = simulationsCount > 2

  return (
    <>
      <h2>{title ?? <Trans>Statistiques</Trans>}</h2>

      <section className="relative mb-8 flex gap-4">
        <StatisticsBlocks
          simulationsCount={simulationsCount}
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
