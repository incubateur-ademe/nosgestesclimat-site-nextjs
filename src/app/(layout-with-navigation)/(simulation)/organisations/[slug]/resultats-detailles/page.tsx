'use client'

import ExportDataButton from '@/components/organisations/ExportDataButton'
import OrgaStatistics from '@/components/organisations/OrgaStatistics'
import { organisationsDashboardExportData } from '@/constants/tracking/pages/organisationsDashboard'
import { filterSimulationRecaps } from '@/helpers/organisations/filterSimulationRecaps'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useParams } from 'next/navigation'
import { useContext } from 'react'
import { FiltersContext } from './_components/FiltersProvider'
import OrgaStatisticsCharts from './_components/OrgaStatisticsCharts'
import OrgaStatisticsFilters from './_components/OrgaStatisticsFilters'
import PollNotFound from './_components/PollNotFound'

export default function ResultatsDetaillesPage() {
  const params = useParams()
  const { data: pollData, isFetched } = useFetchPollData({
    orgaSlug: decodeURIComponent(params.slug as string),
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
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 md:flex-nowrap md:gap-0">
        <h1 className="mb-0">
          <NGCTrans>Résultats détaillés de</NGCTrans>{' '}
          <span className="text-primary-700">
            {pollData?.organisationName ?? ''}
          </span>
        </h1>

        {pollData?.isAdmin && (
          <ExportDataButton
            simulationRecaps={pollData?.simulationRecaps ?? []}
            color="secondary"
            onClick={() => {
              trackEvent(organisationsDashboardExportData)
            }}
          />
        )}
      </div>

      <OrgaStatisticsFilters
        simulationRecaps={pollData?.simulationRecaps ?? []}
        filteredSimulationRecaps={filteredSimulationRecaps ?? []}
        defaultAdditionalQuestions={pollData?.defaultAdditionalQuestions ?? []}
      />

      <OrgaStatistics
        simulationRecaps={filteredSimulationRecaps ?? []}
        funFacts={pollData?.funFacts}
        title={<NGCTrans>Chiffres clés</NGCTrans>}
      />

      <OrgaStatisticsCharts simulationRecaps={filteredSimulationRecaps ?? []} />
    </div>
  )
}
