import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'

export default function CongratulationsText() {
  return (
    <>
      <h1 className="mt-4">
        <span className="inline-block">
          <Trans>Vous avez terminé le test</Trans>&nbsp;👏
        </span>
      </h1>

      <p className="mb-0">
        <Trans>
          Découvrez vos résultats, et nos idées d'actions pour vous améliorer.
        </Trans>
      </p>

      <Separator className="my-6" />
    </>
  )
}
