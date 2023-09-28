import Title from '@/design-system/layout/Title'

import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import NewsList from './_components/NewsList'

export function generateMetadata() {
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

      <p>{t('pages.News.premierParagraphe')}</p>

      <NewsList />
    </>
  )
}
