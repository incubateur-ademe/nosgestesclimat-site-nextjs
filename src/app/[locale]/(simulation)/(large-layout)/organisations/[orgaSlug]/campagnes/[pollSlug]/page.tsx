'use client'

import SettingsIcon from '@/components/icons/SettingsIcon'
import PollLoader from '@/components/organisations/PollLoader'
import PollStatistics from '@/components/organisations/PollStatistics'
import Trans from '@/components/translation/trans/TransClient'
import { pollDashboardClickParameters } from '@/constants/tracking/pages/pollDashboard'
import { captureClickPollSettings } from '@/constants/tracking/posthogTrackers'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Loader from '@/design-system/layout/Loader'
import Title from '@/design-system/layout/Title'
import { filterExtremes } from '@/helpers/organisations/filterExtremes'
import { filterSimulations } from '@/helpers/organisations/filterSimulations'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import { useFetchPublicPollSimulations } from '@/hooks/organisations/polls/useFetchPublicPollSimulations'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { useHandleRedirectFromLegacy } from '@/hooks/organisations/useHandleRedirectFromLegacy'
import { useUser } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import dayjs from 'dayjs'
import { useParams, useSearchParams } from 'next/navigation'
import { useContext, useMemo } from 'react'
import AdminSection from './_components/AdminSection'
import { FiltersContext } from './_components/FiltersProvider'
import PollNotFound from './_components/PollNotFound'
import PollStatisticsFilters from './_components/PollStatisticsFilters'
import FootprintDistribution from './_components/footPrintDistribution/FootprintDistribution'

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
              onClick={() => {
                trackEvent(pollDashboardClickParameters)
                trackPosthogEvent(captureClickPollSettings())
              }}
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

            <FootprintDistribution />
          </>
        )}
      </div>
    </div>
  )
}
