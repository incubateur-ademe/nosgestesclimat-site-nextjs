import Title from '@/design-system/layout/Title'
import { useServerTranslation } from '@/locales'

import { getServerPathname } from '@/helpers/getServerPathname'
import NewsList from './_components/NewsList'

export default async function News() {
	const { t } = await useServerTranslation()

	const pathname = getServerPathname() as unknown as string

	const path = decodeURIComponent(pathname)

	const isReleasePage = path.length > '/nouveautés/'.length

	const title = t('Les nouveautés ✨')

	return (
		<div className={'ui__ container ' + (isReleasePage ? '' : 'fluid')}>
			<Title data-cypress-id="news-title" title={title} />
			<p>{t('pages.News.premierParagraphe')}</p>
			<NewsList />
		</div>
	)
}
