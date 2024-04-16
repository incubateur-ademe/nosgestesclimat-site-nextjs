'use client'

import Link from '@/components/Link'
import Baseline from '@/components/organisations/Baseline'
import Trans from '@/components/translation/Trans'
import { Organisation } from '@/types/organisations'

type Props = {
  organisation?: Organisation
}

export default function CreateOrganisation({ organisation }: Props) {
  if (organisation) {
    return null
  }

  return (
    <>
      <Baseline />

      <Link className="font-bold" href="/organisations/connexion">
        <Trans>Créer mon organisation</Trans>
      </Link>
    </>
  )
}
