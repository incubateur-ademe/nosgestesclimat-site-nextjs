import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import RecommendedActions from './howToAct/RecommendedActions'

export default function HowToAct() {
  return (
    <>
      <h2>
        <Trans>Comment agir ?</Trans>
      </h2>
      <p className="text-gray-600">
        <Trans>
          Découvre nos pistes pour agir dès aujourd’hui pour le climat, ou passe
          le test pour obtenir des recommandations personnalisées.
        </Trans>
      </p>
      <RecommendedActions />
      <div className="mt-4">
        <ButtonLink href="/actions" color="secondary">
          <Trans>Voir toutes les actions</Trans>
        </ButtonLink>
      </div>
    </>
  )
}
