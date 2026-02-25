'use client'

import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { endClickPoll } from '@/constants/tracking/pages/end'
import { MON_ESPACE_GROUPS_PATH } from '@/constants/urls/paths'
import Confirmation from '@/design-system/alerts/Confirmation'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { getLinkToPollDashboard } from '@/helpers/navigation/pollPages'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import { useCurrentSimulation } from '@/publicodes-state'

export default function Poll() {
  const { polls } = useCurrentSimulation()

  const lastPollSlug = polls?.[polls?.length - 1]?.slug

  const {
    data: poll,
    isLoading,
    isError,
  } = useFetchPublicPoll({
    pollIdOrSlug: lastPollSlug,
  })

  // If there is no poll attached to the simulation, we don't display the block
  if (!lastPollSlug) {
    return null
  }

  // If the poll is not loading and there is still no poll, we don't display the block
  if (!isLoading && !poll) {
    return null
  }

  if (isError) {
    return (
      <DefaultErrorAlert>
        <Trans>
          Oups ! Une erreur s'est produite au moment de récupérer les
          informations de votre campagne. Vous pouvez la retrouver depuis{' '}
        </Trans>
        <Link href={MON_ESPACE_GROUPS_PATH}>
          <Trans>la page groupes</Trans>
        </Link>
      </DefaultErrorAlert>
    )
  }

  return (
    <Confirmation>
      <Title
        title={
          <span className="inline-block" data-testid="poll-confirmation-block">
            <Trans>Vous avez terminé le test !</Trans> <Emoji>💪</Emoji>
          </span>
        }
        tag="h2"
      />

      <p className="text-sm md:text-base">
        {
          // Temp code to remove when info is dynamically stored in CMS
          lastPollSlug &&
          process.env.NEXT_PUBLIC_POLL_CONTEST_SLUGS?.split(',') &&
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
          data-testid="poll-see-results-button"
          trackingEvent={endClickPoll}>
          <Trans i18nKey="endPage.poll.seeResults.button.label">
            Voir les résultats
          </Trans>
        </ButtonLink>
      </div>
    </Confirmation>
  )
}
