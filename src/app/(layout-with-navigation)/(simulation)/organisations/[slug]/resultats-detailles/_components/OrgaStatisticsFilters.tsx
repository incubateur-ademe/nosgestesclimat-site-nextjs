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
    <div className="mb-8 flex flex-col justify-between gap-4 rounded-lg bg-gray-100 px-4 py-4 sm:flex-row sm:items-center md:px-6">
      <div className="flex items-center gap-2">
        <p className="mb-0 md:text-xl">
          <NGCTrans>Filtrer par</NGCTrans>
        </p>
        <InfoTooltipIcon className="z-10 inline-block md:hidden" />
      </div>

      <div className="flex flex-col gap-2 xs:flex-row xs:items-center md:gap-4">
        {defaultAdditionalQuestions.includes('birthdate') && (
          <AgeFilter filteredSimulationRecaps={filteredSimulationRecaps} />
        )}

        {defaultAdditionalQuestions.includes('postalCode') && (
          <DepartementFilter
            simulationRecaps={simulationRecaps}
            filteredSimulationRecaps={filteredSimulationRecaps}
          />
        )}
        <InfoTooltipIcon className="hidden md:block" />
      </div>
    </div>
  )
}
