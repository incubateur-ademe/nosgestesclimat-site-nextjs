'use client'

import SettingsIcon from '@/components/icons/SettingsIcon'
import PollLoader from '@/components/organisations/PollLoader'
import PollStatistics from '@/components/organisations/PollStatistics'
import Trans from '@/components/translation/trans/TransClient'
import { pollDashboardClickParameters } from '@/constants/tracking/pages/pollDashboard'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Card from '@/design-system/layout/Card'
import Loader from '@/design-system/layout/Loader'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { filterExtremes } from '@/helpers/organisations/filterExtremes'
import { filterSimulations } from '@/helpers/organisations/filterSimulations'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import { useFetchPublicPollSimulations } from '@/hooks/organisations/polls/useFetchPublicPollSimulations'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { useHandleRedirectFromLegacy } from '@/hooks/organisations/useHandleRedirectFromLegacy'
import { useUser } from '@/publicodes-state'
import dayjs from 'dayjs'
import { useParams, useSearchParams } from 'next/navigation'
import { useContext, useMemo } from 'react'
import AdminSection from './_components/AdminSection'
import { FiltersContext } from './_components/FiltersProvider'
import PollNotFound from './_components/PollNotFound'
import PollStatisticsCharts from './_components/PollStatisticsCharts'
import PollStatisticsFilters from './_components/PollStatisticsFilters'

const MAX_NUMBER_POLL_SIMULATIONS = 500

export default function CampagnePage() {
  const { orgaSlug, pollSlug } = useParams()
  const searchParams = useSearchParams()

  const isRedirectFromLegacy = Boolean(searchParams.get('isRedirectFromLegacy'))

  useHandleRedirectFromLegacy()

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
    enabled: !!poll && !pollHasTooManyParticipants,
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

  // Organisation can only be fetched by a authentified organisation administrator
  const { data: organisation } = useFetchOrganisation()

  const { user } = useUser()

  // Temp hotfix
  const isAdmin =
    poll?.organisation.administrators ||
    organisation?.administrators.find(
      ({ userId, email }) =>
        userId === user.userId ||
        // Cover possible edge case where admin changes browser and looses his/her original userId
        email === user.organisation?.administratorEmail ||
        // Unsecure remove as soon as possible
        organisation?.slug === user.organisation?.slug
    )

  if (isLoadingPoll) {
    return <PollLoader />
  }

  if (!poll) {
    return <PollNotFound />
  }

  return (
    <div className="mb-4 flex flex-col justify-between md:flex-nowrap">
      <div className="flex flex-col items-start justify-between sm:flex-row md:items-center">
        <Title
          title={<span className="text-primary-700">{poll.name}</span>}
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

        {!!isAdmin && (
          <div>
            <ButtonLink
              href={`/organisations/${orgaSlug}/campagnes/${pollSlug}/parametres`}
              trackingEvent={pollDashboardClickParameters}
              color="secondary"
              size="sm"
              data-cypress-id="poll-admin-section-see-parameters-button"
              className="flex items-center">
              <SettingsIcon className="fill-primary-700 mr-2" />

              <Trans>Voir les paramètres</Trans>
            </ButtonLink>
          </div>
        )}
      </div>

      <div className="mt-8">
        {!!isAdmin && <AdminSection poll={poll} />}

        <PollStatistics
          simulationsCount={poll.simulations.finished}
          simulationsWithoutExtremes={simulationsWithoutExtremes}
          funFacts={poll.funFacts}
          title={<Trans>Résultats de campagne</Trans>}
          poll={poll}
          isAdmin={!!isAdmin}
        />

        {
          // Do not display message for unaware participants, but only for admins
          pollHasTooManyParticipants && !!isAdmin && (
            <Card className="border-primary-300 bg-primary-50 text-primary-950 mb-8 inline-block text-sm font-bold">
              <Trans>
                Les graphiques sont cachés pour les campagnes avec plus de 500
                participations pour des raisons de performance. Nous travaillons
                à l'ajout de cette fonctionnalité pour les plus grosses
                campagnes.
              </Trans>{' '}
              <Emoji className="inline">💪</Emoji>
            </Card>
          )
        }

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
