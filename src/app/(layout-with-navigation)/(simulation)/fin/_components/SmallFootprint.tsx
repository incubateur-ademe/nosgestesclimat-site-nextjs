import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import Actions from './subcategories/subcategory/Actions'

export default function SmallFootprint() {
  return (
    <div>
      <Title
        tag="h2"
        subtitle={
          <Trans>
            Vous êtes très nettement en dessous de la moyenne française.
          </Trans>
        }>
        Bien joué 👏
      </Title>
      <p>
        <Trans>
          Il y a de grandes chances que votre temps soit plus efficace à{' '}
          <strong>convaincre et aider les autres</strong> qu'à chercher à gagner
          vos "tonnes en trop".
        </Trans>
      </p>
      <Actions subcategory="ui . pédagogie . empreinte faible" shouldHideLink />
    </div>
  )
}
