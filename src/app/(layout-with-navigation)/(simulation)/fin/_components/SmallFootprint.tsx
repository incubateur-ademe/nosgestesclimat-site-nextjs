import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'

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
          Il y a de grandes chances que votre temps soit plus efficace à
          convaincre et aider les autres qu'à chercher à gagner vos "tonnes en
          trop" (même s'il faudra le faire un jour).
        </Trans>
      </p>
    </div>
  )
}
