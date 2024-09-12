import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import Actions from './subcategories/subcategory/Actions'

const title = {
  small: <Trans>Bien joué 👏</Trans>,
  other: <Trans>Autres actions</Trans>,
}
const subtitle = {
  small: (
    <Trans>Vous êtes très nettement en dessous de la moyenne française.</Trans>
  ),
  other: (
    <Trans>Il n'y a pas que sur votre empreinte que vous pouvez agir !</Trans>
  ),
}
const text = {
  small: (
    <Trans>
      Il y a de grandes chances que votre temps soit plus efficace à{' '}
      <strong>convaincre et aider les autres</strong> qu'à chercher à gagner vos
      "tonnes en trop".
    </Trans>
  ),
  other: (
    <Trans>
      Même si réduire son empreinte individuelle est l'action la plus directe,
      il existe <strong>d'autres façons d'agir à son niveau</strong>. Tous ces
      modes d'action sont complémentaires !
    </Trans>
  ),
}

type Props = {
  isSmallFootprint?: boolean
}
export default function OtherWays({ isSmallFootprint }: Props) {
  const titleContent = isSmallFootprint ? title.small : title.other
  const subtitleContent = isSmallFootprint ? subtitle.small : subtitle.other
  const textContent = isSmallFootprint ? text.small : text.other

  return (
    <div>
      <Title tag="h2" subtitle={subtitleContent}>
        {titleContent}
      </Title>
      <p>{textContent}</p>
      <Actions
        subcategory="ui . pédagogie . empreinte faible"
        noNumberedFootprint
      />
    </div>
  )
}
