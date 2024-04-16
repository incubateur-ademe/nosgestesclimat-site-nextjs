import ButtonLink from '@/design-system/inputs/ButtonLink'

export default function PollNotFound() {
  return (
    <>
      <h1 className="text-xl">
        <NGCTrans>
          Oups, nous n'avons pas trouvé les résultats de cette organisation
        </NGCTrans>
      </h1>

      <p>
        Il semblerait que cette organisation n'ait pas encore de résultats ou
        bien qu'une erreur soit survenue.
      </p>

      <ButtonLink href="/organisations">Revenir à l'écran d'accueil</ButtonLink>
    </>
  )
}
