import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Markdown from '@/design-system/utils/Markdown'
import getPost from '@/helpers/markdown/getPost'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { capitalizeString } from '@/utils/capitalizeString'
import { currentLocale } from 'next-i18n-router'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params: { slug } }: Props) {
  return getMetadataObject({
    title: `${capitalizeString(decodeURI(slug))?.replaceAll(
      '-',
      ' '
    )}, nouveautés - Nos Gestes Climat`,
    description: 'Découvrez les nouveautés du site Nos Gestes Climat.',
    params: { slug },
    alternates: {
      canonical: `/nouveautes/${slug}`,
    },
  })
}

export default async function Release({ params: { slug } }: Props) {
  const locale = currentLocale()
  const content = await getPost(`src/locales/nouveautes/${locale}/`, slug)

  return (
    <div>
      <Link href="/nouveautes" className="text-sm">
        ← <Trans>Retour à la liste des nouveautes</Trans>
      </Link>
      <br />
      <br />
      {content ? (
        <Markdown>{content}</Markdown>
      ) : (
        <Trans>Oups, nous n'avons pas d'article correspondant</Trans>
      )}
    </div>
  )
}
