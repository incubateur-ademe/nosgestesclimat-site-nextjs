import Trans from '@/components/translation/Trans'
import { SimulationRecap } from '@/types/organisations'
import AgeFilter from './orgaStatisticsFilters/AgeFilter'
import DepartementFilter from './orgaStatisticsFilters/DepartementFilter'

export default function OrgaStatisticsFilters({
  simulationRecaps,
  filteredSimulationRecaps,
}: {
  simulationRecaps: SimulationRecap[]
  filteredSimulationRecaps: SimulationRecap[]
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-grey-100 px-6 py-4">
      <div>
        <p className="mb-0 text-xl">
          <Trans>Filtrer par</Trans>
        </p>
      </div>

      <div className="flex gap-6">
        <AgeFilter filteredSimulationRecaps={filteredSimulationRecaps} />

        <DepartementFilter
          simulationRecaps={simulationRecaps}
          filteredSimulationRecaps={filteredSimulationRecaps}
        />
      </div>
    </div>
  )
}