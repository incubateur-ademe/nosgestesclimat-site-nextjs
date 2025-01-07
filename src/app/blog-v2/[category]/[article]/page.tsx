import Trans from '@/components/translation/Trans'
import Badge from '@/design-system/layout/Badge'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { fetchArticlePageContent } from '@/services/cms/fetchArticlePageContent'
import { fetchArticlePageMetadata } from '@/services/cms/fetchArticlePageMetadata'

import ShareIcon from '@/components/icons/ShareIcon'
import CopyButton from '@/design-system/inputs/CopyButton'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ArticleBreadcrumbs from './_components/ArticleBreadcrumbs'
import ArticleJSONLD from './_components/ArticleJSONLD'
import AuthorBlock from './_components/AuthorBlock'
import OtherArticles from './_components/OtherArticles'
import StickySummary from './_components/StickySummary'

export async function generateMetadata({
  params,
}: {
  params: { category: string; articleSlug: string; locale: string }
}) {
  const { metaTitle, metaDescription, image } =
    (await fetchArticlePageMetadata({
      articleSlug: params.articleSlug,
    })) || {}

  return getMetadataObject({
    title: metaTitle || 'Blog - Nos Gestes Climat',
    description:
      metaDescription ||
      'Découvrez des conseils pratiques pour réduire votre empreinte écologique.',
    image: image?.url || '',
    alternates: {
      canonical: `/blog/${params.category}/${params.articleSlug}`,
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

  const articleDate =
    article.updatedAt || article.publishedAt || article.createdAt

  return (
    <>
      <ArticleJSONLD
        article={article}
        categorySlug={params.category}
        articleSlug={params.article}
      />

      <div className="relative">
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
                {articleDate
                  ? new Date(articleDate).toLocaleDateString('fr')
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

        <div className="mb-20 flex min-h-screen flex-col flex-nowrap gap-8 overflow-auto md:flex-row md:items-start">
          <div className="max-w-full md:w-8/12">
            <div
              className="markdown min-h-[100vh] max-w-full border-b border-gray-300 pb-8"
              dangerouslySetInnerHTML={{ __html: article.htmlContent ?? '' }}
            />

            <AuthorBlock author={article.author} />
          </div>

          <div className="h-[600px] w-[1px] bg-gray-300 md:block" />

          <div className="flex flex-col items-start gap-4 md:w-[calc(33%-8px)] md:items-end">
            <CopyButton
              className="w-auto"
              textToCopy={`https://nosgestesclimat.fr/blog/${params.category}/${params.article}`}
              copiedStateText={<Trans>Lien copié</Trans>}>
              <ShareIcon className="mr-2 h-8 w-8 fill-primary-700" />
              <Trans>Partager l'article</Trans>
            </CopyButton>

            <StickySummary headings={article.headings ?? []} />
          </div>
        </div>

        <OtherArticles articles={otherArticles} />
      </div>
    </>
  )
}
