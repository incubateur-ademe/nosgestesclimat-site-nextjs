import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'

export default function CongratulationsText() {
  return (
    <>
      <h1 className="mt-4">
        <span className="flex gap-2">
          <Trans>Vous avez terminé le test&nbsp;!</Trans>&nbsp;<Emoji>👏</Emoji>
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
