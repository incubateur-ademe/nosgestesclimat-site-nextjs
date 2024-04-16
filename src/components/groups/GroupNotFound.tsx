import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { linkToClassement } from '@/helpers/navigation/classementPages'

export default function GroupNotFound() {
  return (
    <div className="flex flex-col items-start">
      <Title
        title={<NGCTrans>Oups ! Nous n'avons pas trouvé votre groupe</NGCTrans>}
      />

      <p className="mb-8 mt-2">
        <NGCTrans>Ce groupe n'existe pas ou a été supprimé.</NGCTrans>
      </p>

      <ButtonLink href={linkToClassement}>
        <NGCTrans>Retour à la liste des groupes</NGCTrans>
      </ButtonLink>
    </div>
  )
}
