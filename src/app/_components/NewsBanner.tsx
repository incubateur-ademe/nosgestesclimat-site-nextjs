import getPosts from '@/helpers/markdown/getPosts'
import { currentLocale } from 'next-i18n-router'
import Banner from './newsBanner/Banner'
export const localStorageKey = 'last-viewed-release'

export default async function NewsBanner() {
  const locale = currentLocale()
  const releases = await getPosts(`src/locales/nouveautes/${locale ?? 'fr'}/`)

  return <Banner releases={releases} />
}
