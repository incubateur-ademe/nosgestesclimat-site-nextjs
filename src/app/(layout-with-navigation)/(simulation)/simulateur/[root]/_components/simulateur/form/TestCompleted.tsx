import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Emoji from '@/design-system/utils/Emoji'
import { formatResultToDetailParam } from '@/helpers/url/formatResultToDetailParam'
import { useEngine, useForm } from '@/publicodes-state'
import Star from './testCompleted/Star'

export default function TestCompleted() {
  const { categories } = useForm()
  const { getValue } = useEngine()

  const detailsParamString = formatResultToDetailParam({ categories, getValue })

  return (
    <div className="mb-4 flex flex-col items-center rounded-lg bg-grey-100 p-4">
      <Star />
      <p className="mb-4 text-lg">
        <Trans>Vous avez terminé le test</Trans>&nbsp;
        <Emoji className="inline-block">👏</Emoji>
      </p>
      <ButtonLink
        //TODO: there should be a helper for that
        href={`/fin${detailsParamString ? `?${detailsParamString}` : ''}`}>
        <Trans>Voir mon résultat</Trans>
      </ButtonLink>
      <p className="mb-0 mt-4 text-lg">
        <Trans>ou</Trans>
      </p>
      <ButtonLink color="text" href="/profil">
        <Trans>Modifier mes réponses</Trans>
      </ButtonLink>
    </div>
  )
}
