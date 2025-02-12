import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'

export default function PollNotFound() {
  return (
    <>
      <h1 className="text-xl">
        <Trans>
          Oups, nous n'avons pas trouvé les résultats de cette campagne
        </Trans>
      </h1>

      <p>
        Il semblerait que cette campagne n'ait pas encore de résultats ou bien
        qu'une erreur soit survenue.
      </p>

      <ButtonLink href="/organisations">Revenir à l'écran d'accueil</ButtonLink>
    </>
  )
}
