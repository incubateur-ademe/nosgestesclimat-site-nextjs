'use client'

import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import { SimulationRecap } from '@/types/organisations'
import { usePathname } from 'next/navigation'
import FunFacts from './orgaStatistics/FunFacts'
import ResultsSoonBanner from './orgaStatistics/ResultsSoonBanner'
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

  return (
    <>
      <h2 className="mt-12">{title ?? <Trans>Statistiques</Trans>}</h2>

      <Separator />

      <section className="relative mb-8 flex gap-4">
        <StatisticsBlocks simulationRecaps={simulationRecaps} />

        {simulationRecaps?.length <= 0 && <ResultsSoonBanner />}
      </section>

      <FunFacts funFacts={funFacts} />

      {!pathname.includes('resultats-detailles') && (
        <SeeDetailedReportAndExport />
      )}
    </>
  )
}
