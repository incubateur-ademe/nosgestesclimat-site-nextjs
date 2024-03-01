'use client'

import ExportDataButton from '@/components/organisations/ExportDataButton'
import OrgaStatistics from '@/components/organisations/OrgaStatistics'
import Trans from '@/components/translation/Trans'
import { clickExportDataDetailledResultsPageEvent } from '@/constants/matomo/organisations'
import { filterSimulationRecaps } from '@/helpers/organisations/filterSimulationRecaps'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useRef } from 'react'
import { FiltersContext } from './_components/FiltersProvider'
import OrgaStatisticsCharts from './_components/OrgaStatisticsCharts'
import OrgaStatisticsFilters from './_components/OrgaStatisticsFilters'

export default function ResultatsDetaillesPage() {
  const params = useParams()

  const { data: pollData, refetch } = useFetchPollData({
    orgaSlug: String(params.slug),
  })

  const { ageFilters, postalCodeFilters } = useContext(FiltersContext)

  const intervalRef = useRef<NodeJS.Timeout>()

  const filteredSimulationRecaps =
    pollData &&
    filterSimulationRecaps({
      simulationRecaps: pollData?.simulationRecaps,
      ageFilters,
      postalCodeFilters,
    })

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      refetch()
    }, 30000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 md:flex-nowrap md:gap-0">
        <h1 className="mb-0">
          <Trans>Résultats détaillés de</Trans>{' '}
          <span className="text-primary-500">
            {pollData?.organisationName ?? ''}
          </span>
        </h1>

        {pollData?.isAdmin && (
          <ExportDataButton
            simulationRecaps={pollData?.simulationRecaps ?? []}
            color="secondary"
            onClick={() => {
              trackEvent(clickExportDataDetailledResultsPageEvent)
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
        title={<Trans>Chiffres clés</Trans>}
      />

      <OrgaStatisticsCharts simulationRecaps={filteredSimulationRecaps ?? []} />
    </div>
  )
}
