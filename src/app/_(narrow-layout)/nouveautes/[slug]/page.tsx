import Link from '@/components/Link'
import PasserTestBanner from '@/components/layout/PasserTestBanner'
import Trans from '@/components/translation/Trans'
import Markdown from '@/design-system/utils/Markdown'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getPost } from '@/helpers/markdown/getPost'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { capitalizeString } from '@/utils/capitalizeString'
import { currentLocale } from 'next-i18n-router'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params: { slug } }: Props) {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: `${capitalizeString(decodeURI(slug))?.replaceAll(
      '-',
      ' '
    )}, ${t('nouveautés - Nos Gestes Climat')}`,
    description: t('Découvrez les nouveautés du site Nos Gestes Climat.'),
    params: { slug },
  })
}

export default async function Release({ params: { slug } }: Props) {
  const locale = currentLocale()
  const nouveaute = await getPost(`src/locales/nouveautes/${locale}/`, slug)

  return (
    <div>
      <Link href="/nouveautes" className="mb-8 block text-sm">
        ← <Trans>Retour à la liste des nouveautes</Trans>
      </Link>

      <PasserTestBanner />

      {nouveaute ? (
        <Markdown>{nouveaute?.content}</Markdown>
      ) : (
        <Trans>Oups, nous n'avons pas d'article correspondant</Trans>
      )}
    </div>
  )
}
