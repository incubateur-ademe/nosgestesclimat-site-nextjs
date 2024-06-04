import Link from '@/components/Link'
import PasserTestBanner from '@/components/layout/PasserTestBanner'
import Trans from '@/components/translation/Trans'
import Badge from '@/design-system/layout/Badge'
import Title from '@/design-system/layout/Title'
import Markdown from '@/design-system/utils/Markdown'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getPost } from '@/helpers/markdown/getPost'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { Post } from '@/types/posts'
import { capitalizeString } from '@/utils/capitalizeString'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params: { slug } }: Props) {
  const { t } = await getServerTranslation()

  const post = (await getPost('src/locales/blog/fr/', slug)) as Post

  return getMetadataObject({
    title: `${capitalizeString(decodeURI(slug))?.replaceAll(
      '-',
      ' '
    )}, ${t('article du blog - Nos Gestes Climat')}`,
    description: t('Découvrez les articles de blog du site Nos Gestes Climat.'),
    params: { slug },
    image: post.data.image,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  })
}

export default async function BlogPost({ params: { slug } }: Props) {
  const post = (await getPost('src/locales/blog/fr/', slug)) as Post

  const lastEditDate = await fetch(
    `https://api.github.com/repos/incubateur-ademe/nosgestesclimat-site-nextjs/commits?path=src%2Flocales%2Fblog%2Ffr%2F${slug}.mdx&page=1&per_page=1`
  )
    .then((res) => res.json())
    .then((json) => {
      return json[0]?.commit?.committer?.date
    })

  const content = post.content
  const data = post.data

  return (
    <div>
      <Link href="/blog" className="mb-6 block text-sm">
        ← <Trans>Retour à la liste des articles</Trans>
      </Link>

      <PasserTestBanner />
      <Title title={data.title} />

      {content ? (
        <>
          <div className="flex flex-wrap"></div>

          <p className="text-sm text-gray-500">
            <Trans>Un article de </Trans>
            <strong>{data?.author}</strong>, <Trans>mis à jour le</Trans>{' '}
            {new Date(lastEditDate ?? data?.date).toLocaleDateString('fr')}
          </p>

          {data?.categories && data?.categories?.split(',')?.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {data.categories.split(',').map((category) => (
                <Badge className="inline-block text-xs" key={category}>
                  {category}
                </Badge>
              ))}
            </div>
          )}

          <Markdown>{content}</Markdown>
        </>
      ) : (
        <Trans>Oups, nous n'avons pas d'article correspondant</Trans>
      )}
    </div>
  )
}
