import Trans from '@/components/translation/Trans'
import { PollData, SimulationRecap } from '@/types/organisations'
import AgeFilter from './orgaStatisticsFilters/AgeFilter'
import DepartementFilter from './orgaStatisticsFilters/DepartementFilter'
import InfoTooltipIcon from './orgaStatisticsFilters/InfoTooltipIcon'

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
  if (
    defaultAdditionalQuestions?.length === 0 ||
    simulationRecaps?.length < 3
  ) {
    return null
  }

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 rounded-lg bg-grey-100 px-6 py-4 sm:flex-row sm:items-center">
      <div>
        <p className="mb-0 text-xl">
          <Trans>Filtrer par</Trans>
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {defaultAdditionalQuestions.includes('birthdate') && (
          <AgeFilter filteredSimulationRecaps={filteredSimulationRecaps} />
        )}

        {defaultAdditionalQuestions.includes('postalCode') && (
          <DepartementFilter
            simulationRecaps={simulationRecaps}
            filteredSimulationRecaps={filteredSimulationRecaps}
          />
        )}
        <InfoTooltipIcon />
      </div>
    </div>
  )
}
