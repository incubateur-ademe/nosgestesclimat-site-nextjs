import Title from '@/design-system/layout/Title'

import { getServerTranslation } from '@/helpers/getServerTranslation'
import NewsList from './_components/NewsList'

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
