import Trans from '@/components/translation/Trans'
import Badge from '@/design-system/layout/Badge'
import { fetchArticlePageContent } from '@/helpers/blog/fetchArticlePageContent'
import { fetchArticlePageMetadata } from '@/helpers/blog/fetchArticlePageMetadata'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { defaultLocale } from '@/i18nConfig'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import StickySummary from './_components/StickySummary'

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

  if (!article) {
    return redirect('/404')
  }

  const articleDate =
    article.modifiedAt || article.publishedAt || article.createdAt

  return (
    <div className="relative">
      <ArticleBreadcrumbs
        categorySlug={params.category}
        articleSlug={params.articleSlug}
        articleTitle="Titre de l'article"
        categoryTitle="Titre de la catégorie"
      />

      <div className="flex flex-col items-start gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col items-start gap-8 md:w-8/12">
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

        <div className="md:w-4/12">
          <Image
            src={article.image.url}
            alt={article.image.alternativeText}
            width={420}
            height={420}
          />
        </div>
      </div>

      <div className="mt-10 flex min-h-screen flex-col flex-nowrap gap-8 overflow-auto md:flex-row md:items-start">
        <div className="max-w-full flex-1 md:w-[600px]">
          <div
            className="markdown min-h-[100vh] max-w-full border-b border-gray-300 pb-10"
            dangerouslySetInnerHTML={{ __html: article.htmlContent }}
          />

          <div className="mt-10 flex flex-row items-center gap-2">
            <div>
              <Image
                className="overflow-hidden rounded-full"
                src={article.author.image?.url}
                alt={article.author.image?.alternativeText}
                width={60}
                height={60}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                <Trans>Auteur :</Trans>
              </h2>
              <p className="text-lg">{article.author.name}</p>
            </div>
          </div>
        </div>

        <div className="hidden h-[600px] w-[1px] bg-gray-300 md:block" />

        <StickySummary headings={article.headings} />
      </div>
    </div>
  )
}
