'use client'

import PollLoader from '@/components/organisations/PollLoader'
import PollStatistics from '@/components/organisations/PollStatistics'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { filterExtremes } from '@/helpers/organisations/filterExtremes'
import { filterSimulations } from '@/helpers/organisations/filterSimulations'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import { useFetchPublicPollDashboard } from '@/hooks/organisations/polls/useFetchPublicPollDashboard'
import { useFetchPublicPollSimulations } from '@/hooks/organisations/polls/useFetchPublicPollSimulations'
import { useHandleRedirectFromLegacy } from '@/hooks/organisations/useHandleRedirectFromLegacy'
import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import { useContext, useMemo } from 'react'
import { FiltersContext } from './_components/FiltersProvider'
import PollNotFound from './_components/PollNotFound'
import PollStatisticsCharts from './_components/PollStatisticsCharts'
import PollStatisticsFilters from './_components/PollStatisticsFilters'

export default function CampagnePage() {
  const searchParams = useSearchParams()

  const isRedirectFromLegacy = Boolean(searchParams.get('isRedirectFromLegacy'))

  useHandleRedirectFromLegacy()

  const { data: poll, isLoading: isLoadingPoll } = useFetchPublicPoll({
    enabled: !isRedirectFromLegacy,
  })

  const { data: dashboard, isLoading: isLoadingDashboard } =
    useFetchPublicPollDashboard()

  const { data: simulations, isLoading: isLoadingSimulations } =
    useFetchPublicPollSimulations()

  const { ageFilters, postalCodeFilters } = useContext(FiltersContext)

  // Remove the values that are too high to avoid polluting the statistics
  const simulationsWithoutExtremes = useMemo(
    () => filterExtremes(simulations ?? []),
    [simulations]
  )

  const filteredSimulations =
    poll &&
    filterSimulations({
      simulations: simulationsWithoutExtremes,
      ageFilters,
      postalCodeFilters,
    })

  if (isLoadingPoll || isLoadingDashboard || isLoadingSimulations) {
    return <PollLoader />
  }

  if (!poll) {
    return <PollNotFound />
  }

  return (
    <div className="mb-4 flex flex-col justify-between md:flex-nowrap">
      <Title
        title={
          <>
            <span className="mr-2">
              <Trans>Campagne de</Trans>{' '}
              <span className="text-primary-700">{poll.organisation.name}</span>
            </span>{' '}
            {!!poll.organisation.administrators && (
              <span className="text-sm text-gray-600">
                <Trans>(définissez un titre dans les paramètres)</Trans>
              </span>
            )}
          </>
        }
        subtitle={
          poll ? (
            <span>
              <Trans>Campagne créée par</Trans>{' '}
              <strong className="text-primary-700">
                {poll.organisation.name}
              </strong>
              <Trans>, le</Trans> {dayjs(poll.createdAt).format('DD/MM/YYYY')}
            </span>
          ) : (
            ''
          )
        }
      />

      <div className="mt-8">
        {/* <AdminSection poll={poll} /> */}

        <PollStatistics
          simulations={simulations ?? []}
          simulationsWithoutExtremes={simulationsWithoutExtremes}
          funFacts={dashboard?.funFacts}
          title={<Trans>Résultats de campagne</Trans>}
        />

        <PollStatisticsFilters
          simulations={simulationsWithoutExtremes}
          filteredSimulations={filteredSimulations ?? []}
          defaultAdditionalQuestions={poll?.defaultAdditionalQuestions ?? []}
        />

        <PollStatisticsCharts
          simulations={filteredSimulations ?? []}
          isAdmin={!!poll?.organisation.administrators}
        />
      </div>
    </div>
  )
}
