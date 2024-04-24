import Trans from '@/components/translation/Trans'
import { endClickActions } from '@/constants/tracking/pages/end'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import RecommendedActions from './howToAct/RecommendedActions'

export default function HowToAct({ shouldLeadToTest = true }) {
  return (
    <>
      <h2>
        <Trans>Comment agir ?</Trans>
      </h2>

      <p className="text-gray-600">
        {shouldLeadToTest ? (
          <Trans>
            Découvrez nos pistes pour agir dès aujourd’hui pour le climat, ou
            passez le test pour obtenir des recommandations personnalisées.
          </Trans>
        ) : (
          <Trans>
            Découvrez nos pistes pour agir dès aujourd’hui pour le climat.
          </Trans>
        )}
      </p>

      <RecommendedActions />

      <div className="mt-4">
        <ButtonLink
          href="/actions"
          color="secondary"
          trackingEvent={endClickActions}>
          <Trans>Voir toutes les actions</Trans>
        </ButtonLink>
      </div>
    </>
  )
}
