import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function CreateOrganisation() {
  const { t } = await getServerTranslation()
  return (
    <>
      <p className="max-w-3xl">
        <Trans>Vous souhaitez mobiliser votre</Trans>{' '}
        <strong className="text-primary-500">
          <Trans>entreprise</Trans>
        </strong>
        <Trans>, votre</Trans>{' '}
        <strong className="text-primary-500">
          <Trans>organisation</Trans>
        </strong>
        ,{' '}
        <strong className="text-primary-500">
          <Trans>association</Trans>
        </strong>
        , <Trans>ou </Trans>{' '}
        <strong className="text-primary-500">
          <Trans>salle de classe</Trans>
        </strong>
        &nbsp;? {t(`Découvrez nos outils pour vous simplifier la vie\u202f!`)}
      </p>
      <Link className="font-bold" href="/organisations/connexion">
        <Trans>Créer mon organisation</Trans>
      </Link>
    </>
  )
}
