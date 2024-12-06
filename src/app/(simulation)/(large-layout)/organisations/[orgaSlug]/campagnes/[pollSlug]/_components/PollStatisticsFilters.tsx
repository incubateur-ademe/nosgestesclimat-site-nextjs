import Trans from '@/components/translation/Trans'
import { PollDefaultAdditionalQuestion } from '@/constants/organisations/pollDefaultAdditionalQuestion'
import type { OrganisationPoll, Simulation } from '@/types/organisations'
import AgeFilter from './pollStatisticsFilters/AgeFilter'
import DepartementFilter from './pollStatisticsFilters/DepartementFilter'
import InfoTooltipIcon from './pollStatisticsFilters/InfoTooltipIcon'

export default function PollStatisticsFilters({
  simulations,
  filteredSimulations,
  defaultAdditionalQuestions,
}: {
  simulations: Simulation[]
  filteredSimulations: Simulation[]
  defaultAdditionalQuestions: OrganisationPoll['defaultAdditionalQuestions']
}) {
  if (defaultAdditionalQuestions?.length === 0 || simulations?.length < 3) {
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
        {defaultAdditionalQuestions?.includes(
          PollDefaultAdditionalQuestion.birthdate
        ) && <AgeFilter filteredSimulations={filteredSimulations} />}

        {defaultAdditionalQuestions?.includes(
          PollDefaultAdditionalQuestion.postalCode
        ) && (
          <DepartementFilter
            simulations={simulations}
            filteredSimulations={filteredSimulations}
          />
        )}
        <InfoTooltipIcon className="hidden md:block" />
      </div>
    </div>
  )
}
