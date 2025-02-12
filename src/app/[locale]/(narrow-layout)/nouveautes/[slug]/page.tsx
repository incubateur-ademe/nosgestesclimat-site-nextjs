import Link from '@/components/Link'
import PasserTestBanner from '@/components/layout/PasserTestBanner'
import TransServer from '@/components/translation/trans/TransServer'
import Markdown from '@/design-system/utils/Markdown'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getPost } from '@/helpers/markdown/getPost'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { capitalizeString } from '@/utils/capitalizeString'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const { t } = await getServerTranslation(locale)

  return getMetadataObject({
    locale,
    title: `${capitalizeString(decodeURI(slug))?.replaceAll(
      '-',
      ' '
    )}, ${t('nouveautés - Nos Gestes Climat')}`,
    description: t('Découvrez les nouveautés du site Nos Gestes Climat.'),
    params: { slug },
  })
}

export default async function Release({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const nouveaute = await getPost(`src/locales/nouveautes/${locale}/`, slug)

  return (
    <div>
      <Link href="/nouveautes" className="mb-8 block text-sm">
        ←{' '}
        <TransServer locale={locale}>
          Retour à la liste des nouveautes
        </TransServer>
      </Link>

      <PasserTestBanner />

      {nouveaute ? (
        <Markdown>{nouveaute?.content}</Markdown>
      ) : (
        <TransServer locale={locale}>
          Oups, nous n'avons pas d'article correspondant
        </TransServer>
      )}
    </div>
  )
}
