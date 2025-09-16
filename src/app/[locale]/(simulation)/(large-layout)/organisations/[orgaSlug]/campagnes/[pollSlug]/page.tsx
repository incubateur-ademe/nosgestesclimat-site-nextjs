'use client'

import SettingsIcon from '@/components/icons/SettingsIcon'
import PollLoader from '@/components/organisations/PollLoader'
import PollStatistics from '@/components/organisations/PollStatistics'
import Trans from '@/components/translation/trans/TransClient'
import { pollDashboardClickParameters } from '@/constants/tracking/pages/pollDashboard'
import { captureClickPollSettings } from '@/constants/tracking/posthogTrackers'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Title from '@/design-system/layout/Title'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { useHandleRedirectFromLegacy } from '@/hooks/organisations/useHandleRedirectFromLegacy'
import { useUser } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import dayjs from 'dayjs'
import { useParams, useSearchParams } from 'next/navigation'
import PollNotFound from './_components/PollNotFound'
import ShareSection from './_components/ShareSection'
import FootprintDistribution from './_components/footPrintDistribution/FootprintDistribution'

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

  const {
    name,
    organisation: pollOrganisation,
    createdAt,
    simulations,
    computedResults,
    userComputedResults,
    funFacts,
  } = poll ?? {}

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
          title={<span className="text-primary-700">{name}</span>}
          subtitle={
            poll ? (
              <span>
                <Trans>Campagne créée par</Trans>{' '}
                <strong className="text-primary-700">
                  {pollOrganisation?.name}
                </strong>
                <Trans>, le</Trans> {dayjs(createdAt).format('DD/MM/YYYY')}
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
        {!!isAdmin && simulations && simulations.count <= 0 && (
          <ShareSection
            className="mt-0"
            poll={poll}
            title={
              <Trans className="pollResults.adminSection.customTitle">
                C'est prêt ! Voici votre lien à partager
              </Trans>
            }
          />
        )}

        <PollStatistics
          simulationsCount={simulations?.finished ?? 0}
          computedResults={computedResults}
          userComputedResults={userComputedResults}
          funFacts={funFacts}
          title={<Trans>Résultats de campagne</Trans>}
          poll={poll}
          isAdmin={!!isAdmin}
        />

        <FootprintDistribution
          computedResults={computedResults}
          userComputedResults={userComputedResults}
          simulationsCount={simulations?.count}
          organisationName={pollOrganisation?.name}
        />

        {!!isAdmin && simulations && simulations.count > 0 && (
          <ShareSection poll={poll} />
        )}
      </div>
    </div>
  )
}
