import Trans from '@/components/translation/Trans'
import { PollData, SimulationRecap } from '@/types/organisations'
import AgeFilter from './pollStatisticsFilters/AgeFilter'
import DepartementFilter from './pollStatisticsFilters/DepartementFilter'
import InfoTooltipIcon from './pollStatisticsFilters/InfoTooltipIcon'

export default function PollStatisticsFilters({
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
          <Trans>Filtrer par</Trans>
        </p>
        <InfoTooltipIcon className="z-10 inline-block md:hidden" />
      </div>

      <div className="flex flex-col gap-2 md:gap-4 xs:flex-row xs:items-center">
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
