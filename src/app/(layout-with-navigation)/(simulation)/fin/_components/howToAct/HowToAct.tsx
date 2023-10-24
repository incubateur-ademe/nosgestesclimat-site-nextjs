import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import RecommendedActions from './RecommendedActions'

export default function HowToAct() {
  return (
    <div className="mb-8">
      <h2>Comment agir ?</h2>

      <p className="text-gray-600">
        <Trans>
          Découvre nos pistes pour agir dès aujourd’hui pour le climat, ou passe
          le test pour obtenir des recommandations personnalisées.
        </Trans>
      </p>

      <RecommendedActions />

      <div className="mt-4">
        <ButtonLink href="/actions" color="secondary">
          Voir toutes les actions
        </ButtonLink>
      </div>
    </div>
  )
}
