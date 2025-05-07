import { Suspense } from 'react'

import ContentLarge from '@/components/layout/ContentLarge'
import Footer from '@/components/layout/Footer'
import JSONLD from '@/components/seo/JSONLD'
import AllBlogCategories from '@/design-system/cms/AllBlogCategories'
import ArticleList from '@/design-system/cms/ArticleList'
import MainArticle from '@/design-system/cms/MainArticle'
import NewslettersBlock from '@/design-system/cms/NewslettersBlock'
import NewslettersBlockSkeleton from '@/design-system/cms/NewslettersBlockSkeleton'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { fetchHomepageContent } from '@/services/cms/fetchHomepageContent'
import { fetchHomepageMetadata } from '@/services/cms/fetchHomepageMetadata'
import type { DefaultPageProps } from '@/types'
import { notFound } from 'next/navigation'
import BlogHero from './_components/BlogHero'
import GroupBlock from './_components/GroupBlock'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params

  const { metaTitle, metaDescription, image } =
    (await fetchHomepageMetadata({ locale })) || {}

  return getMetadataObject({
    locale,
    title:
      metaTitle ??
      'Blog, découvrez nos articles et conseils sur le climat - Nos Gestes Climat',
    description:
      metaDescription ??
      'Découvrez des conseils pratiques pour réduire votre empreinte écologique.',
    image: image?.url ?? '',
    alternates: {
      canonical: '/blog',
    },
  })
}

export default async function BlogHomePage({
  searchParams,
  params,
}: DefaultPageProps<{
  searchParams: { page: string }
  params: { locale: string }
}>) {
  const { locale } = await params

  // Get the page number from the query params from the server side
  const pageParam = searchParams ? (await searchParams).page : undefined
  const page = Number(pageParam) || 1

  const { title, description, image, mainArticle, articles, pageCount } =
    (await fetchHomepageContent({
      page,
      locale,
    })) ?? {}

  if (!title || !description || !image || !articles) {
    notFound()
  }

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
        ]}
      />

      <ContentLarge tag="div" className="overflow-hidden px-4 lg:px-0">
        {title && description && image && (
          <BlogHero title={title} description={description} image={image} />
        )}

        {mainArticle && (
          <MainArticle
            locale={locale}
            title={mainArticle.title}
            description={mainArticle.description}
            imageSrc={mainArticle.image?.url ?? ''}
            imageAlt={mainArticle.image?.alternativeText ?? ''}
            href={`/blog/${mainArticle.category?.slug}/${mainArticle.slug}`}
            category={mainArticle.category?.title ?? ''}
          />
        )}

        {articles && (
          <ArticleList
            locale={locale}
            articles={articles}
            pageCount={pageCount ?? 0}
            currentPage={page}
          />
        )}

        <div className="flex flex-col gap-8 md:flex-row">
          <Suspense fallback={<NewslettersBlockSkeleton />}>
            <NewslettersBlock />
          </Suspense>

          <GroupBlock locale={locale} />
        </div>
      </ContentLarge>

      <AllBlogCategories locale={locale} />

      <Footer />
    </>
  )
}
