import Trans from '@/components/translation/Trans'
import { PollData, SimulationRecap } from '@/types/organisations'
import AgeFilter from './orgaStatisticsFilters/AgeFilter'
import DepartementFilter from './orgaStatisticsFilters/DepartementFilter'

export default function OrgaStatisticsFilters({
  simulationRecaps,
  filteredSimulationRecaps,
  defaultAdditionalQuestions,
}: {
  simulationRecaps: SimulationRecap[]
  filteredSimulationRecaps: SimulationRecap[]
  defaultAdditionalQuestions: Pick<
    PollData,
    'defaultAdditionalQuestions'
  >['defaultAdditionalQuestions']
}) {
  if (defaultAdditionalQuestions?.length === 0) {
    return null
  }

  return (
    <div className="mb-8 flex items-center justify-between rounded-lg bg-grey-100 px-6 py-4">
      <div>
        <p className="mb-0 text-xl">
          <Trans>Filtrer par</Trans>
        </p>
      </div>

      <div className="flex gap-6">
        {defaultAdditionalQuestions.includes('birthdate') && (
          <AgeFilter filteredSimulationRecaps={filteredSimulationRecaps} />
        )}

        {defaultAdditionalQuestions.includes('postalCode') && (
          <DepartementFilter
            simulationRecaps={simulationRecaps}
            filteredSimulationRecaps={filteredSimulationRecaps}
          />
        )}
      </div>
    </div>
  )
}
