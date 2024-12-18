import Trans from '@/components/translation/Trans'
import Badge from '@/design-system/layout/Badge'
import { fetchArticlePageContent } from '@/helpers/blog/fetchArticlePageContent'
import { fetchArticlePageMetadata } from '@/helpers/blog/fetchArticlePageMetadata'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

import JSONLD from '@/components/seo/JSONLD'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import AuthorBlock from './_components/AuthorBlock'
import OtherArticles from './_components/OtherArticles'
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
  const { article, otherArticles } = await fetchArticlePageContent({
    articleSlug: params.article,
  })

  if (!article) {
    return notFound()
  }

  const articleDate =
    article.modifiedAt || article.publishedAt || article.createdAt

  return (
    <>
      <JSONLD
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: 'https://nosgestesclimat.fr',
            name: 'Nos Gestes Climat',
            logo: 'https://nosgestesclimat.fr/_next/image?url=%2Fimages%2Fmisc%2Fpetit-logo%403x.png&w=640&q=75',
          },
          {
            '@context': 'https://schema.org/',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Accueil Blog',
                item: 'https://nosgestesclimat.fr/blog',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: article.category.title,
                item: `https://nosgestesclimat.fr/blog/${params.category}`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: article.title,
                item: `https://nosgestesclimat.fr/blog/${params.category}/${params.article}`,
              },
            ],
          },
        ]}
      />
      <div className="relative">
        <ArticleBreadcrumbs
          categorySlug={params.category}
          articleSlug={params.article}
          articleTitle={article.title}
          categoryTitle={article.category.title}
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
              className="rounded-md border border-gray-200"
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
              className="markdown min-h-[100vh] max-w-full border-b border-gray-300 pb-8"
              dangerouslySetInnerHTML={{ __html: article.htmlContent }}
            />

            <AuthorBlock author={article.author} />
          </div>

          <div className="hidden h-[600px] w-[1px] bg-gray-300 md:block" />

          <StickySummary headings={article.headings} />
        </div>

        <OtherArticles articles={otherArticles} />
      </div>
    </>
  )
}
