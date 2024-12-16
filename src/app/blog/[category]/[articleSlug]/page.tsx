import ContentLarge from '@/components/layout/ContentLarge'
import { fetchArticlePageMetadata } from '@/helpers/blog/fetchArticlePageMetadata'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

import dynamic from 'next/dynamic'

const ArticleBreadcrumbs = dynamic(
  () => import('./_components/ArticleBreadcrumbs'),
  {
    loading: () => <div>Loading...</div>,
  }
)

export async function generateMetadata({
  params,
}: {
  params: { category: string; articleSlug: string; locale: string }
}) {
  const { metaTitle, metaDescription, image } = await fetchArticlePageMetadata({
    locale: params.locale,
  })

  return getMetadataObject({
    title: metaTitle || 'Blog - Nos Gestes Climat',
    description:
      metaDescription ||
      'Découvrez des conseils pratiques pour réduire votre empreinte écologique.',
    image: image.url,
    alternates: {
      canonical: `/blog/${params.category}/${params.articleSlug}`,
    },
  })
}

export default function ArticlePage({
  params,
}: {
  params: { category: string; articleSlug: string }
}) {
  return (
    <>
      <ContentLarge>
        <ArticleBreadcrumbs
          categorySlug={params.category}
          articleSlug={params.articleSlug}
          articleTitle="Titre de l'article"
          categoryTitle="Titre de la catégorie"
        />
      </ContentLarge>
    </>
  )
}
