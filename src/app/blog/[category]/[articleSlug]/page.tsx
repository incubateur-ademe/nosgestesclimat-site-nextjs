import ContentLarge from '@/components/layout/ContentLarge'
import Trans from '@/components/translation/Trans'
import Badge from '@/design-system/layout/Badge'
import { fetchArticlePageContent } from '@/helpers/blog/fetchArticlePageContent'
import { fetchArticlePageMetadata } from '@/helpers/blog/fetchArticlePageMetadata'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { defaultLocale } from '@/i18nConfig'

import dynamic from 'next/dynamic'
import Image from 'next/image'

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

export default async function ArticlePage({
  params,
}: {
  params: { category: string; articleSlug: string; locale: string }
}) {
  const article = await fetchArticlePageContent({
    articleSlug: params.articleSlug,
    locale: params.locale || defaultLocale,
  })
  console.log(article)
  const articleDate =
    article.modifiedAt || article.publishedAt || article.createdAt

  return (
    <>
      <ContentLarge>
        <ArticleBreadcrumbs
          categorySlug={params.category}
          articleSlug={params.articleSlug}
          articleTitle="Titre de l'article"
          categoryTitle="Titre de la catégorie"
        />

        <div className="flex flex-col items-start gap-12 md:flex-row">
          <div className="flex flex-col items-start gap-8">
            <h1 className="mb-0 text-5xl font-bold">{article.title}</h1>
            <Badge size="sm">{article.category.title}</Badge>

            <div className="flex flex-row gap-2">
              <p className="mb-0 text-lg">
                <span className="text-primary-700">
                  <Trans>Temps de lecture :</Trans>
                </span>{' '}
                {Math.round(article.duration / 60)} <Trans>minutes</Trans>
              </p>
              <span className="text-lg">|</span>
              <p className="mb-0 text-lg">
                <span className="text-primary-700">
                  <Trans>Publié le :</Trans>
                </span>{' '}
                {articleDate ? new Date(articleDate).toLocaleDateString() : ''}
              </p>
            </div>
          </div>

          <div>
            <Image
              src={article.image.url}
              alt={article.image.alt}
              width={420}
              height={420}
            />
          </div>
        </div>
      </ContentLarge>
    </>
  )
}
