'use client'

import PollLoader from '@/components/organisations/PollLoader'
import PollStatistics from '@/components/organisations/PollStatistics'
import Trans from '@/components/translation/trans/TransClient'
import Loader from '@/design-system/layout/Loader'
import Title from '@/design-system/layout/Title'
import { filterExtremes } from '@/helpers/organisations/filterExtremes'
import { filterSimulations } from '@/helpers/organisations/filterSimulations'
import { displayErrorToast } from '@/helpers/toasts/displayErrorToast'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import { useFetchPublicPollDashboard } from '@/hooks/organisations/polls/useFetchPublicPollDashboard'
import { useFetchPublicPollSimulations } from '@/hooks/organisations/polls/useFetchPublicPollSimulations'
import { useHandleRedirectFromLegacy } from '@/hooks/organisations/useHandleRedirectFromLegacy'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import { useContext, useEffect, useMemo } from 'react'
import AdminSection from './_components/AdminSection'
import { FiltersContext } from './_components/FiltersProvider'
import PollNotFound from './_components/PollNotFound'
import PollStatisticsCharts from './_components/PollStatisticsCharts'
import PollStatisticsFilters from './_components/PollStatisticsFilters'

// TODO: temporary fix to avoid breaking the page when there are too many simulations
const MAX_SIMULATIONS_FOR_DASHBOARD = 5000

export default function CampagnePage() {
  const searchParams = useSearchParams()

  const isRedirectFromLegacy = Boolean(searchParams.get('isRedirectFromLegacy'))

  useHandleRedirectFromLegacy()

  const { t } = useClientTranslation()

  const {
    data: poll,
    isLoading: isLoadingPoll,
    error: errorPoll,
  } = useFetchPublicPoll({
    enabled: !isRedirectFromLegacy,
  })

  const {
    data: dashboard,
    isLoading: isLoadingDashboard,
    error: errorDashboard,
  } = useFetchPublicPollDashboard({
    enabled: !!poll && poll.simulations.count < MAX_SIMULATIONS_FOR_DASHBOARD,
  })

  const {
    data: simulations,
    isLoading: isLoadingSimulations,
    error: errorSimulations,
  } = useFetchPublicPollSimulations({
    enabled: !!poll && poll.simulations.count < MAX_SIMULATIONS_FOR_DASHBOARD,
  })

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

  useEffect(() => {
    if (errorPoll || errorDashboard || errorSimulations) {
      displayErrorToast(
        t(
          'Aie, une erreur est survenue lors du chargement de la campagne. Si le problème persiste merci de nous envoyer un message via notre page de contact.'
        )
      )
    }
  }, [errorPoll, errorDashboard, errorSimulations, t])

  if (isLoadingPoll) {
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
              <span className="text-primary-700">{poll.name}</span>
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
        <AdminSection poll={poll} />

        {poll.simulations.count > MAX_SIMULATIONS_FOR_DASHBOARD && (
          <div className="flex h-full items-center justify-center">
            <Trans>
              Cette campagne comporte plus de {MAX_SIMULATIONS_FOR_DASHBOARD}{' '}
              simulations. Les statistiques globales ne sont pas disponibles
              pour le moment. Nous nous excusons pour la gêne occasionnée, nos
              équipes sont sur le coup.
            </Trans>
          </div>
        )}

        {isLoadingDashboard ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
            <Trans>Chargement des statistiques globales de campagne...</Trans>
          </div>
        ) : (
          <PollStatistics
            simulations={simulations ?? []}
            simulationsWithoutExtremes={simulationsWithoutExtremes}
            funFacts={dashboard?.funFacts}
            title={<Trans>Résultats de campagne</Trans>}
          />
        )}

        {isLoadingSimulations ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
            <Trans>Chargement des résultats détaillés de campagne...</Trans>
          </div>
        ) : (
          <>
            <PollStatisticsFilters
              simulations={simulationsWithoutExtremes}
              filteredSimulations={filteredSimulations ?? []}
              defaultAdditionalQuestions={
                poll?.defaultAdditionalQuestions ?? []
              }
            />

            <PollStatisticsCharts
              simulations={filteredSimulations ?? []}
              isAdmin={!!poll?.organisation.administrators}
            />
          </>
        )}
      </div>
    </div>
  )
}
