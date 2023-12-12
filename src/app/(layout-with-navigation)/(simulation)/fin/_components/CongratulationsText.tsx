import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'

export default function CongratulationsText() {
  return (
    <>
      <h1 className="mt-4 text-xl md:text-2xl" data-cypress-id="fin-title">
        <span className="inline-block">
          <Trans>Vous avez terminé le test !</Trans>&nbsp;
          <Emoji className="inline-block">👏</Emoji>
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
