'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import TransClient from '../translation/trans/TransClient'

export default function GroupNotFound() {
  return (
    <div className="flex flex-col items-start">
      <Title
        title={
          <TransClient>Oups ! Nous n'avons pas trouvé votre groupe</TransClient>
        }
      />

      <p className="mb-8 mt-2">
        <TransClient>Ce groupe n'existe pas ou a été supprimé.</TransClient>
      </p>

      <ButtonLink href={linkToClassement}>
        <TransClient>Retour à la liste des groupes</TransClient>
      </ButtonLink>
    </div>
  )
}
