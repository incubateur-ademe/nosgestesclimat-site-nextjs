import { endClickActions } from '@/constants/tracking/pages/end'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import RecommendedActions from './howToAct/RecommendedActions'

export default function HowToAct({ shouldLeadToTest = true }) {
  return (
    <>
      <h2>
        <NGCTrans>Comment agir ?</NGCTrans>
      </h2>

      <p className="text-gray-600">
        {shouldLeadToTest ? (
          <NGCTrans>
            Découvrez nos pistes pour agir dès aujourd’hui pour le climat, ou
            passez le test pour obtenir des recommandations personnalisées.
          </NGCTrans>
        ) : (
          <NGCTrans>
            Découvrez nos pistes pour agir dès aujourd’hui pour le climat.
          </NGCTrans>
        )}
      </p>

      <RecommendedActions />

      <div className="mt-4">
        <ButtonLink
          href="/actions"
          color="secondary"
          trackingEvent={endClickActions}>
          <NGCTrans>Voir toutes les actions</NGCTrans>
        </ButtonLink>
      </div>
    </>
  )
}
