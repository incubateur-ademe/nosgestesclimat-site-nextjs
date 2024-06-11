'use client'

import PollLoader from '@/components/organisations/PollLoader'
import PollStatistics from '@/components/organisations/PollStatistics'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { filterExtremes } from '@/helpers/organisations/filterExtremes'
import { filterSimulationRecaps } from '@/helpers/organisations/filterSimulationRecaps'
import { getComputedResults } from '@/helpers/simulation/getComputedResults'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import { useHandleRedirectFromLegacy } from '@/hooks/organisations/useHandleRedirectFromLegacy'
import { useRules } from '@/hooks/useRules'
import { useSimulation } from '@/publicodes-state'
import { getDisposableEngine } from '@/publicodes-state/helpers/getDisposableEngine'
import { SimulationRecap } from '@/types/organisations'
import dayjs from 'dayjs'
import { useParams, useSearchParams } from 'next/navigation'
import { useCallback, useContext, useMemo } from 'react'
import AdminSection from './_components/AdminSection'
import { FiltersContext } from './_components/FiltersProvider'
import PollNotFound from './_components/PollNotFound'
import PollStatisticsCharts from './_components/PollStatisticsCharts'
import PollStatisticsFilters from './_components/PollStatisticsFilters'

export default function CampagnePage() {
  const { pollSlug, orgaSlug } = useParams()

  const searchParams = useSearchParams()

  const { categories } = useSimulation()

  const { data: rules } = useRules()

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

  const handleMissingComputedResults = useCallback(
    (simulationRecaps: SimulationRecap[]) => {
      return simulationRecaps.map((simulationRecap: SimulationRecap) => {
        if (simulationRecap.bilan !== 0) return simulationRecap

        const { safeEvaluate } = getDisposableEngine({
          rules,
          situation: simulationRecap.situation,
        })

        const computedResults = getComputedResults(categories, safeEvaluate)

        return {
          ...simulationRecap,
          bilan: computedResults.bilan,
          categories: computedResults.categories,
        }
      })
    },
    [categories, rules]
  )

  const fixedMissingComputedResultsSimulationRecaps = useMemo(() => {
    if (!pollData?.simulationRecaps || !rules) return []

    return handleMissingComputedResults(pollData?.simulationRecaps ?? [])
  }, [pollData?.simulationRecaps, handleMissingComputedResults, rules])

  const simulationRecapsWithoutExtremes = useMemo(
    () => filterExtremes(fixedMissingComputedResultsSimulationRecaps),
    [fixedMissingComputedResultsSimulationRecaps]
  )

  const filteredSimulationRecaps =
    pollData &&
    filterSimulationRecaps({
      simulationRecaps: simulationRecapsWithoutExtremes,
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
          simulationRecaps={fixedMissingComputedResultsSimulationRecaps}
          simulationRecapsWithoutExtremes={simulationRecapsWithoutExtremes}
          funFacts={pollData?.funFacts}
          title={<Trans>Résultats de campagne</Trans>}
        />

        <PollStatisticsFilters
          simulationRecaps={simulationRecapsWithoutExtremes ?? []}
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
