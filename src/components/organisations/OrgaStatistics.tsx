'use client'

import Separator from '@/design-system/layout/Separator'
import { SimulationRecap } from '@/types/organisations'
import { usePathname } from 'next/navigation'
import FunFacts from './orgaStatistics/FunFacts'
import SeeDetailedReportAndExport from './orgaStatistics/SeeDetailedReportAndExport'
import StatisticsBlocks from './orgaStatistics/StatisticsBlocks'

export default function OrgaStatistics({
  title,
  simulationRecaps,
  funFacts,
}: {
  title?: string | JSX.Element
  simulationRecaps: SimulationRecap[]
  funFacts: any
}) {
  const pathname = usePathname()

  const hasAtLeastThreeParticipants = simulationRecaps?.length > 2

  return (
    <>
      <h2>{title ?? <NGCTrans>Statistiques</NGCTrans>}</h2>

      <Separator className="mt-1" />

      <section className="relative mb-8 flex gap-4">
        <StatisticsBlocks simulationRecaps={simulationRecaps} />
      </section>

      {hasAtLeastThreeParticipants && (
        <FunFacts funFacts={funFacts} className="mb-12" />
      )}

      {hasAtLeastThreeParticipants &&
        !pathname.includes('resultats-detailles') && (
          <SeeDetailedReportAndExport />
        )}
    </>
  )
}
