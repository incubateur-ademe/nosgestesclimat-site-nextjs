'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import Trans from '../translation/trans/TransClient'

export default function GroupNotFound() {
  return (
    <div className="flex flex-col items-start">
      <Title
        title={<Trans>Oups ! Nous n'avons pas trouvé votre groupe</Trans>}
      />

      <p className="mt-2 mb-8">
        <Trans>Ce groupe n'existe pas ou a été supprimé.</Trans>
      </p>

      <ButtonLink href={linkToClassement}>
        <Trans>Retour à la liste des groupes</Trans>
      </ButtonLink>
    </div>
  )
}
