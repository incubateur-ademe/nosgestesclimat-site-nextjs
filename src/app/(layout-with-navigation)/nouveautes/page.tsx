import SparklesIcon from '@/components/icons/SparklesIcon'
import PasserTestBanner from '@/components/layout/PasserTestBanner'
import List from '@/components/posts/List'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getPosts } from '@/helpers/markdown/getPosts'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { currentLocale } from 'next-i18n-router'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Les nouveautés - Nos Gestes Climat',
    description:
      'Consultez les nouvelles fonctionnalités et dernières nouvelles de Nos Gestes Climat.',
    alternates: {
      canonical: '/nouveautes',
    },
  })
}

export default async function Releases() {
  const locale = currentLocale()

  const releases = await getPosts(`src/locales/nouveautes/${locale}/`)

  return (
    <>
      <PasserTestBanner />

      <Title
        data-cypress-id="news-title"
        title={
          <span className="flex items-center">
            <Trans>Les nouveautés</Trans>
            <SparklesIcon className="ml-2 fill-yellow-default" />
          </span>
        }
      />

      <p>
        <Trans i18nKey={'pages.News.premierParagraphe'}>
          Nous améliorons le site en continu à partir de vos retours. Découvrez
          ici les dernières nouveautés.
        </Trans>
      </p>
      <List items={releases} path="/nouveautes" />
    </>
  )
}
