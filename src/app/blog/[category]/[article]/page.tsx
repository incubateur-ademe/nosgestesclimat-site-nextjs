import Trans from '@/components/translation/Trans'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { fetchArticlePageContent } from '@/services/cms/fetchArticlePageContent'
import { fetchArticlePageMetadata } from '@/services/cms/fetchArticlePageMetadata'

import Badge from '@/design-system/layout/Badge'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ArticleBreadcrumbs from './_components/ArticleBreadcrumbs'
import ArticleJSONLD from './_components/ArticleJSONLD'
import AuthorBlock from './_components/AuthorBlock'
import OtherArticles from './_components/OtherArticles'
import StickySidebar from './_components/StickySidebar'

export async function generateMetadata({
  params,
}: {
  params: { category: string; article: string; locale: string }
}) {
  const { metaTitle, metaDescription, image } =
    (await fetchArticlePageMetadata({
      articleSlug: params.article,
    })) || {}

  return getMetadataObject({
    title: metaTitle || 'Blog - Nos Gestes Climat',
    description:
      metaDescription ||
      'Découvrez des conseils pratiques pour réduire votre empreinte écologique.',
    image: image?.url || '',
    alternates: {
      canonical: `/blog/${params.category}/${params.article}`,
    },
  })
}

export default async function ArticlePage({
  params,
}: {
  params: { category: string; article: string; locale: string }
}) {
  const { article, otherArticles } =
    (await fetchArticlePageContent({
      articleSlug: params.article,
    })) || {}

  if (!article) {
    return notFound()
  }

  return (
    <>
      <ArticleJSONLD article={article} />

      <div className="relative max-w-5xl md:mx-auto">
        <ArticleBreadcrumbs
          categorySlug={params.category}
          articleSlug={params.article}
          articleTitle={article.title}
          categoryTitle={article.category?.title ?? ''}
        />

        <div className="mb-16 flex flex-col items-start gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col items-start md:w-8/12">
            <Badge className="mb-4" size="sm">
              {article.category?.title ?? ''}
            </Badge>

            <h1 className="mb-6 text-3xl font-bold md:text-5xl">
              {article.title}
            </h1>

            <div className="flex flex-row gap-3">
              <p className="mb-0 text-lg">
                <span className="text-primary-600">
                  <Trans>Temps de lecture :</Trans>
                </span>{' '}
                {Math.round(article.duration / 60)} <Trans>minutes</Trans>
              </p>

              <span className="text-lg text-gray-500">|</span>

              <p className="mb-0 text-lg">
                <span className="text-primary-600">
                  <Trans>Publié le :</Trans>
                </span>{' '}
                {article.createdAt
                  ? new Date(article.createdAt).toLocaleDateString('fr')
                  : ''}
              </p>
            </div>
          </div>

          <div className="md:w-4/12">
            <Image
              className="rounded-md border border-gray-200"
              src={article.image?.url ?? ''}
              alt={article.image?.alternativeText ?? ''}
              width={420}
              height={420}
            />
          </div>
        </div>

        <StickySidebar
          article={article}
          category={params.category}
          articleSlug={params.article}
        />

        <div className="relative mt-8 flex max-w-5xl flex-col flex-nowrap gap-8 overflow-auto md:mx-auto md:mt-0 md:flex-row md:items-stretch">
          <div className="max-w-full md:w-8/12">
            <div
              className="markdown max-w-full border-b border-gray-300 pb-8"
              dangerouslySetInnerHTML={{ __html: article.htmlContent ?? '' }}
            />
          </div>
        </div>
      </div>
      <div className="mb-12">
        <AuthorBlock author={article.author} />
        <OtherArticles articles={otherArticles} />
      </div>
    </>
  )
}
