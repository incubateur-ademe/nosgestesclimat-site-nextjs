'use client'

import PollLoader from '@/components/organisations/PollLoader'
import PollStatistics from '@/components/organisations/PollStatistics'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { filterSimulationRecaps } from '@/helpers/organisations/filterSimulationRecaps'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import { useHandleRedirectFromLegacy } from '@/hooks/organisations/useHandleRedirectFromLegacy'
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

  useHandleRedirectFromLegacy()

  const {
    data: pollData,
    isLoading,
    isFetched,
  } = useFetchPollData({
    orgaSlug: decodeURIComponent(orgaSlug as string),
    pollSlug: decodeURIComponent(pollSlug as string),
    enabled: !isRedirectFromLegacy,
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
    return <PollLoader />
  }

  return (
    <div className="mb-4 flex flex-col justify-between md:flex-nowrap">
      <Title
        title={
          isLoading
            ? '...'
            : pollData?.name ?? (
                <>
                  <span className="mr-2 italic text-gray-600">
                    <Trans>Sans titre</Trans>
                  </span>{' '}
                  <span className="text-sm text-gray-600">
                    <Trans>(définissez un titre dans les paramètres)</Trans>
                  </span>
                </>
              )
        }
        subtitle={
          pollData ? (
            <span>
              <Trans>Campagne créée par</Trans>{' '}
              <strong className="text-primary-700">
                {pollData?.organisationName}
              </strong>
              <Trans>, le</Trans>{' '}
              {dayjs(pollData?.createdAt).format('DD/MM/YYYY')}
            </span>
          ) : (
            ''
          )
        }
      />

      <div className="mt-8">
        <AdminSection pollData={pollData} />

        <PollStatistics
          simulationRecaps={
            pollData?.simulationRecaps?.filter(({ bilan }) => bilan !== 0) ?? []
          }
          funFacts={pollData?.funFacts}
          title={<Trans>Résultats de campagne</Trans>}
        />

        <PollStatisticsFilters
          simulationRecaps={pollData?.simulationRecaps ?? []}
          filteredSimulationRecaps={filteredSimulationRecaps ?? []}
          defaultAdditionalQuestions={
            pollData?.defaultAdditionalQuestions ?? []
          }
        />

        <PollStatisticsCharts
          simulationRecaps={filteredSimulationRecaps ?? []}
          isAdmin={pollData?.isAdmin}
        />
      </div>
    </div>
  )
}
