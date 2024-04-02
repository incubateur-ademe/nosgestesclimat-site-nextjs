import Link from '@/components/Link'
import PasserTestBanner from '@/components/layout/PasserTestBanner'
import Trans from '@/components/translation/Trans'
import Markdown from '@/design-system/utils/Markdown'
import { getPost } from '@/helpers/markdown/getPost'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { capitalizeString } from '@/utils/capitalizeString'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params: { slug } }: Props) {
  return getMetadataObject({
    title: `${capitalizeString(decodeURI(slug))?.replaceAll(
      '-',
      ' '
    )}, article du blog - Nos Gestes Climat`,
    description: 'Découvrez les articles de blog du site Nos Gestes Climat.',
    params: { slug },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  })
}

export default async function BlogPost({ params: { slug } }: Props) {
  const content = await getPost('src/locales/blog/fr/', slug)

  return (
    <div>
      <Link href="/blog" className="mb-8 block text-sm">
        ← <Trans>Retour à la liste des articles</Trans>
      </Link>

      <PasserTestBanner />

      {content ? (
        <Markdown>{content}</Markdown>
      ) : (
        <Trans>Oups, nous n'avons pas d'article correspondant</Trans>
      )}
    </div>
  )
}
