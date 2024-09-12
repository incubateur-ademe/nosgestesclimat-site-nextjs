import SparklesIcon from '@/components/icons/SparklesIcon'
import PasserTestBanner from '@/components/layout/PasserTestBanner'
import List from '@/components/posts/List'
import Trans from '@/components/translation/Trans'
import InlineLink from '@/design-system/inputs/InlineLink'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getPosts } from '@/helpers/markdown/getPosts'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { currentLocale } from 'next-i18n-router'
import Image from 'next/image'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Les nouveautés - Nos Gestes Climat'),
    description: t(
      'Consultez les nouvelles fonctionnalités et dernières nouvelles de Nos Gestes Climat.'
    ),
    alternates: {
      canonical: '/nouveautes',
    },
  })
}

export default async function Releases() {
  const locale = currentLocale()

  const releases = await getPosts(`src/locales/nouveautes/${locale}/`)

  const { t } = await getServerTranslation()

  return (
    <>
      <PasserTestBanner />

      <div className="mt-4 flex flex-wrap gap-0 pb-8 md:flex-nowrap md:gap-16">
        <div>
          <Title
            data-cypress-id="news-title"
            title={
              <span className="flex items-center">
                <Trans>Les nouveautés</Trans>
                <SparklesIcon className="ml-2 fill-divers-300" />
              </span>
            }
          />

          <p className="max-w-74 mb-0">
            <Trans>
              Nous améliorons le site en continu à partir de{' '}
              <InlineLink href="/contact">vos retours</InlineLink>. Découvrez la
              tambouille interne de Nos Gestes Climat.
            </Trans>
          </p>
        </div>

        <Image
          className="ml-auto w-32 md:-mt-4 md:w-48"
          src="/images/illustrations/girl-cooking.svg"
          width="200"
          height="400"
          alt={t('Une femme préparant un bon petit plat.')}
        />
      </div>
      <List items={releases} path="/nouveautes" />
    </>
  )
}
