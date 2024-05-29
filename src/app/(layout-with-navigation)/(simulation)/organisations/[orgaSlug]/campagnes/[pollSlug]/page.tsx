'use client'

import PollStatistics from '@/components/organisations/PollStatistics'
import Trans from '@/components/translation/Trans'
import Loader from '@/design-system/layout/Loader'
import Title from '@/design-system/layout/Title'
import { filterSimulationRecaps } from '@/helpers/organisations/filterSimulationRecaps'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import dayjs from 'dayjs'
import { useParams, useSearchParams } from 'next/navigation'
import { useContext } from 'react'
import AdminSection from './_components/AdminSection'
import { FiltersContext } from './_components/FiltersProvider'
import PollNotFound from './_components/PollNotFound'
import PollStatisticsCharts from './_components/PollStatisticsCharts'
import PollStatisticsFilters from './_components/PollStatisticsFilters'

export default function CampagnePage() {
  const { pollSlug, orgaSlug } = useParams()

  const searchParams = useSearchParams()

  const isRedirectFromLegacy = Boolean(searchParams.get('isRedirectFromLegacy'))

  const {
    data: pollData,
    isLoading,
    isFetched,
  } = useFetchPollData({
    orgaSlug: decodeURIComponent(orgaSlug as string),
    pollSlug: decodeURIComponent(pollSlug as string),
    forceUseFirstPoll: isRedirectFromLegacy,
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

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <Loader color="dark" className="mb-8" />
        <p>Nous récupérons les données de la campagne...</p>
      </div>
    )
  }

  return (
    <div className="mb-4 flex flex-col justify-between md:flex-nowrap">
      <Title
        title={isLoading ? '...' : pollData?.name ?? <Trans>Ma Campagne</Trans>}
        subtitle={
          pollData ? (
            <span>
              <Trans>Créée le</Trans>{' '}
              {dayjs(pollData?.createdAt).format('DD/MM/YYYY')}
            </span>
          ) : (
            ''
          )
        }
      />

      <div className="mt-8">
        <AdminSection pollData={pollData} />

        <PollStatisticsFilters
          simulationRecaps={pollData?.simulationRecaps ?? []}
          filteredSimulationRecaps={filteredSimulationRecaps ?? []}
          defaultAdditionalQuestions={
            pollData?.defaultAdditionalQuestions ?? []
          }
        />

        <PollStatistics
          simulationRecaps={filteredSimulationRecaps ?? []}
          funFacts={pollData?.funFacts}
          title={<Trans>Résultats de campagne</Trans>}
        />

        <PollStatisticsCharts
          simulationRecaps={filteredSimulationRecaps ?? []}
        />
      </div>
    </div>
  )
}
