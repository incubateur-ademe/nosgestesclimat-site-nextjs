import List from '@/components/blog/List'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import posts from './_data/articles'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Les nouveautés - Nos Gestes Climat',
    description:
      'Consultez les nouvelles fonctionnalités et dernières nouvelles de Nos Gestes Climat.',
  })
}

export default async function News() {
  const { t } = await getServerTranslation()

  return (
    <>
      <Title data-cypress-id="news-title" title={t('Les nouveautés ✨')} />

      <p>
        <Trans i18nKey={'pages.News.premierParagraphe'}>
          Nous améliorons le site en continu à partir de vos retours. Découvrez
          ici les dernières nouveautés.
        </Trans>
      </p>
      <List items={posts} path="/nouveautes" />
    </>
  )
}
