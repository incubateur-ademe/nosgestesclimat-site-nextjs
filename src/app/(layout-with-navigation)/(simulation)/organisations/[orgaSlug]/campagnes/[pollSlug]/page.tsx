'use client'

import OrgaStatistics from '@/components/organisations/OrgaStatistics'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { filterSimulationRecaps } from '@/helpers/organisations/filterSimulationRecaps'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import { useParams } from 'next/navigation'
import { useContext } from 'react'
import AdminSection from './_components/AdminSection'
import { FiltersContext } from './_components/FiltersProvider'
import OrgaStatisticsCharts from './_components/OrgaStatisticsCharts'
import OrgaStatisticsFilters from './_components/OrgaStatisticsFilters'
import PollNotFound from './_components/PollNotFound'

export default function CampagnePage() {
  const { pollSlug, orgaSlug } = useParams()

  const {
    data: pollData,
    isLoading,
    isFetched,
  } = useFetchPollData({
    orgaSlug: decodeURIComponent(orgaSlug as string),
    pollSlug: decodeURIComponent(pollSlug as string),
  })

  const { ageFilters, postalCodeFilters } = useContext(FiltersContext)

  const filteredSimulationRecaps =
    pollData &&
    filterSimulationRecaps({
      simulationRecaps: pollData?.simulationRecaps,
      ageFilters,
      postalCodeFilters,
    })

  if (isFetched && !pollData) {
    return <PollNotFound />
  }

  return (
    <div className="mb-4 flex flex-col justify-between md:flex-nowrap">
      <Title title={isLoading ? '...' : pollData?.name} />

      <AdminSection pollData={pollData} />

      <OrgaStatisticsFilters
        simulationRecaps={pollData?.simulationRecaps ?? []}
        filteredSimulationRecaps={filteredSimulationRecaps ?? []}
        defaultAdditionalQuestions={pollData?.defaultAdditionalQuestions ?? []}
      />

      <OrgaStatistics
        simulationRecaps={filteredSimulationRecaps ?? []}
        funFacts={pollData?.funFacts}
        title={<Trans>Résultats de campagne</Trans>}
      />

      <OrgaStatisticsCharts simulationRecaps={filteredSimulationRecaps ?? []} />
    </div>
  )
}
