import Link from '@/components/Link'
import PasserTestBanner from '@/components/layout/PasserTestBanner'
import Markdown from '@/design-system/utils/Markdown'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getPost } from '@/helpers/markdown/getPost'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { capitalizeString } from '@/utils/capitalizeString'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params: { slug } }: Props) {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: `${capitalizeString(decodeURI(slug))?.replaceAll(
      '-',
      ' '
    )}, ${t('article du blog - Nos Gestes Climat')}`,
    description: t('Découvrez les articles de blog du site Nos Gestes Climat.'),
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
        ← <NGCTrans>Retour à la liste des articles</NGCTrans>
      </Link>

      <PasserTestBanner />

      {content ? (
        <Markdown>{content}</Markdown>
      ) : (
        <NGCTrans>Oups, nous n'avons pas d'article correspondant</NGCTrans>
      )}
    </div>
  )
}
