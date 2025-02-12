import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import Trans from '../translation/Trans'

export default function GroupNotFound() {
  return (
    <div className="flex flex-col items-start">
      <Title
        title={
          <Trans locale={locale}>
            Oups ! Nous n'avons pas trouvé votre groupe
          </Trans>
        }
      />

      <p className="mt-2 mb-8">
        <Trans locale={locale}>Ce groupe n'existe pas ou a été supprimé.</Trans>
      </p>

      <ButtonLink href={linkToClassement}>
        <Trans locale={locale}>Retour à la liste des groupes</Trans>
      </ButtonLink>
    </div>
  )
}
