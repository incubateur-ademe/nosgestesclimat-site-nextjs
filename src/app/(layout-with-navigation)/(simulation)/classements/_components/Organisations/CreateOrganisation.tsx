'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { classementCreateOrganisation } from '@/constants/tracking/pages/classements'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { Organisation } from '@/types/organisations'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  organisation?: Organisation
}

export default function CreateOrganisation({ organisation }: Props) {
  const { t } = useClientTranslation()

  if (organisation) {
    return null
  }

  return (
    <>
      <p className="max-w-3xl">
        <Trans>Vous souhaitez mobiliser votre</Trans>{' '}
        <strong className="text-primary-700">
          <Trans>entreprise</Trans>
        </strong>
        <Trans>, votre</Trans>{' '}
        <strong className="text-primary-700">
          <Trans>organisation</Trans>
        </strong>
        ,{' '}
        <strong className="text-primary-700">
          <Trans>association</Trans>
        </strong>
        , <Trans>ou </Trans>{' '}
        <strong className="text-primary-700">
          <Trans>salle de classe</Trans>
        </strong>
        &nbsp;? {t(`Découvrez nos outils pour vous simplifier la vie\u202f!`)}
      </p>
      <Link
        className="font-bold"
        href="/organisations/connexion"
        onClick={() => trackEvent(classementCreateOrganisation)}>
        <Trans>Créer mon organisation</Trans>
      </Link>
    </>
  )
}
