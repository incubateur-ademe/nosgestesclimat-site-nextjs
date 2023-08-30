import Title from '@/design-system/layout/Title'

import Main from '@/design-system/layout/Main'
import { getServerPathname } from '@/helpers/getServerPathname'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import NewsList from './_components/NewsList'

export default async function News() {
  const { t } = await getServerTranslation()

  const pathname = getServerPathname() as unknown as string

  const path = decodeURIComponent(pathname)

  const isReleasePage = path.length > '/nouveautés/'.length

  const title = t('Les nouveautés ✨')

  return (
    <Main maxWidth='3xl'>
      <Title data-cypress-id='news-title' title={title} />
      <p>{t('pages.News.premierParagraphe')}</p>
      <NewsList />
    </Main>
  )
}
