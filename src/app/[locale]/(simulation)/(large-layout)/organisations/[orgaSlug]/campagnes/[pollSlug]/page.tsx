'use client'

import PollLoader from '@/components/organisations/PollLoader'
import PollStatistics from '@/components/organisations/PollStatistics'
import Trans from '@/components/translation/trans/TransClient'
import Card from '@/design-system/layout/Card'
import Loader from '@/design-system/layout/Loader'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { filterExtremes } from '@/helpers/organisations/filterExtremes'
import { filterSimulations } from '@/helpers/organisations/filterSimulations'
import { displayErrorToast } from '@/helpers/toasts/displayErrorToast'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
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

const MAX_NUMBER_POLL_SIMULATIONS = 500

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

  const pollHasTooManyParticipants =
    (poll?.simulations?.count ?? 0) > MAX_NUMBER_POLL_SIMULATIONS

  const {
    data: simulations,
    isLoading: isLoadingSimulations,
    error: errorSimulations,
  } = useFetchPublicPollSimulations({
    enabled: !!poll && pollHasTooManyParticipants,
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
    if (errorPoll || errorSimulations) {
      displayErrorToast(
        t(
          'Aie, une erreur est survenue lors du chargement de la campagne. Si le problème persiste merci de nous envoyer un message via notre page de contact.'
        )
      )
    }
  }, [errorPoll, errorSimulations, t])

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

        <PollStatistics
          simulationsCount={poll.simulations.count}
          simulationsWithoutExtremes={simulationsWithoutExtremes}
          funFacts={poll.funFacts}
          title={<Trans>Résultats de campagne</Trans>}
        />

        {!pollHasTooManyParticipants && (
          <Card className="mb-8 inline-block border-orange-300 bg-orange-50 text-sm font-bold text-orange-800">
            <Trans>
              Oups ! Votre campagne a atteint un nombre de participations trop
              important pour permettre d'afficher notre graphique correctement.
              Nous travaillons à résoudre le problème au plus vite.
            </Trans>{' '}
            <Emoji className="inline">💪</Emoji>
          </Card>
        )}

        {isLoadingSimulations && !pollHasTooManyParticipants && (
          <div className="mb-8 flex h-full items-center gap-2">
            <Loader color="dark" size="sm" />
            <Trans>Chargement des résultats détaillés de campagne...</Trans>
          </div>
        )}

        {!isLoadingSimulations && !pollHasTooManyParticipants && (
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
