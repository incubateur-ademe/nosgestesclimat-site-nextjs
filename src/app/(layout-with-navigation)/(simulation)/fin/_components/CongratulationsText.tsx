import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'

export default function CongratulationsText() {
  return (
    <>
      <h1>
        <Trans>
          <span className="flex gap-2">
            Vous avez terminé le test ! <Emoji>👏</Emoji>
          </span>
        </Trans>
      </h1>

      <p>
        <Trans>
          Découvrez vos résultats, et nos idées d'actions pour vous améliorer.
        </Trans>
      </p>

      <Separator />
    </>
  )
}
