'use client'

import { PreventNavigationContext } from '@/app/[locale]/_components/mainLayoutProviders/PreventNavigationProvider'
import Trans from '@/components/translation/trans/TransClient'
import { endClickPoll } from '@/constants/tracking/pages/end'
import Confirmation from '@/design-system/alerts/Confirmation'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { getLinkToPollDashboard } from '@/helpers/navigation/pollPages'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import { useCurrentSimulation } from '@/publicodes-state'
import { useContext, useEffect } from 'react'

export default function Poll() {
  const { polls } = useCurrentSimulation()

  const lastPollSlug = polls?.[polls?.length - 1]

  const { data: poll, isLoading } = useFetchPublicPoll({
    pollIdOrSlug: lastPollSlug,
  })

  const { shouldPreventNavigation, handleUpdateShouldPreventNavigation } =
    useContext(PreventNavigationContext)

  useEffect(() => {
    if (shouldPreventNavigation) {
      handleUpdateShouldPreventNavigation(false)
    }
  }, [shouldPreventNavigation, handleUpdateShouldPreventNavigation])

  // If there is no poll attached to the simulation, we don't display the block
  if (!lastPollSlug) {
    return null
  }

  // If the poll is not loading and there is still no poll, we don't display the block
  if (!isLoading && !poll) {
    return null
  }

  return (
    <Confirmation>
      <Title
        title={
          <span className="inline-block">
            <Trans>Vous avez terminé le test !</Trans> <Emoji>💪</Emoji>
          </span>
        }
        tag="h2"
      />

      <p className="text-sm md:text-base">
        {
          // Temp code to remove when info is dynamically stored in CMS
          lastPollSlug &&
          process.env.NEXT_PUBLIC_POLL_CONTEST_SLUGS &&
          Array.isArray(process.env.NEXT_PUBLIC_POLL_CONTEST_SLUGS) &&
          process.env.NEXT_PUBLIC_POLL_CONTEST_SLUGS.includes(lastPollSlug) ? (
            <Trans>Votre participation au jeu concours est enregistrée.</Trans>
          ) : (
            <Trans>Merci d'avoir complété votre test.</Trans>
          )
        }
      </p>

      <p className="text-sm md:text-base">
        <Trans>Découvrez les résultats de cette campagne :</Trans>
      </p>

      <div className="mt-8 flex items-start justify-start">
        <ButtonLink
          href={getLinkToPollDashboard({
            orgaSlug: poll?.organisation.slug || '', // TODO: handle this better
            pollSlug: lastPollSlug || '',
          })}
          trackingEvent={endClickPoll}>
          Voir les résultats
        </ButtonLink>
      </div>
    </Confirmation>
  )
}
