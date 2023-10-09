import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import NewsList from './_components/NewsList'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Les nouveautés - Nos Gestes Climat',
    description:
      'Consultez les nouvelles fonctionnalités et dernières nouvelles de Nos Gestes Climat.',
  })
}

export default async function News() {
  const { t } = await getServerTranslation()

  const title = t('Les nouveautés ✨')

  return (
    <>
      <Title data-cypress-id="news-title" title={title} />

      <p>
        <Trans i18nKey={'pages.News.premierParagraphe'}>
          Nous améliorons le site en continu à partir de vos retours. Découvrez
          ici les dernières nouveautés.
        </Trans>
      </p>

      <NewsList />
    </>
  )
}
