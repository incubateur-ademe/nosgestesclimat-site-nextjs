import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

import AllBlogCategories from '@/design-system/cms/AllBlogCategories'
import NewslettersBlockSkeleton from '@/design-system/cms/NewslettersBlockSkeleton'
import { fetchHomepageContent } from '@/helpers/blog/fetchHomepageContent'
import { fetchHomepageMetadata } from '@/helpers/blog/fetchHomepageMetadata'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import ArticleList from '@/design-system/cms/ArticleList'
import GroupBlock from './_components/GroupBlock'

import ContentLarge from '@/components/layout/ContentLarge'
import JSONLD from '@/components/seo/JSONLD'
import MainArticle from '@/design-system/cms/MainArticle'
import { notFound } from 'next/navigation'
import BlogHero from './_components/BlogHero'
const NewslettersBlockDynamic = dynamic(
  () => import('@/design-system/cms/NewslettersBlock'),
  {
    ssr: false,
  }
)

export async function generateMetadata() {
  const { metaTitle, metaDescription, image } =
    (await fetchHomepageMetadata()) || {}

  return getMetadataObject({
    title: metaTitle ?? 'Blog - Nos Gestes Climat',
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
}: {
  searchParams: { page: string }
}) {
  // Get the page number from the query params from the server side
  const page = Number(searchParams.page) || 1

  const { title, description, image, mainArticle, articles, pageCount } =
    (await fetchHomepageContent({
      page,
    })) ?? {}

  if (!title || !description || !image || !mainArticle || !articles) {
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

      <ContentLarge tag="div" className="mt-20">
        <BlogHero title={title} description={description} image={image} />

        <MainArticle
          title={mainArticle.title}
          description={mainArticle.description}
          imageSrc={mainArticle.image.url}
          imageAlt={mainArticle.image.alternativeText}
          href={`/blog/${mainArticle.category.slug}/${mainArticle.slug}`}
          category={mainArticle.category.title}
        />

        <ArticleList
          articles={articles}
          pageCount={pageCount ?? 0}
          currentPage={page}
        />

        <div className="mb-40 mt-24 flex flex-col gap-8 md:flex-row">
          <Suspense fallback={<NewslettersBlockSkeleton />}>
            <NewslettersBlockDynamic />
          </Suspense>

          <GroupBlock />
        </div>
      </ContentLarge>

      <AllBlogCategories />
    </>
  )
}
