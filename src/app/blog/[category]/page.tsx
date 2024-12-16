import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

import FAQ from '@/components/landing-pages/FAQ'
import ContentLarge from '@/components/layout/ContentLarge'
import JSONLD from '@/components/seo/JSONLD'
import AllBlogCategories from '@/design-system/cms/AllBlogCategories'
import ArticleList from '@/design-system/cms/ArticleList'
import MainArticle from '@/design-system/cms/MainArticle'
import { fetchCategoryPageContent } from '@/helpers/blog/fetchCategoryPageContent'
import { fetchCategoryPageMetadata } from '@/helpers/blog/fetchCategoryPageMetadata'
import { defaultLocale } from '@/i18nConfig'
import { currentLocale } from 'next-i18n-router'
import CategoryHero from './_components/CategoryHero'

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}) {
  const locale = currentLocale()

  const { metaTitle, metaDescription, image } = await fetchCategoryPageMetadata(
    {
      locale: locale ?? defaultLocale,
    }
  )

  return getMetadataObject({
    title: metaTitle ?? 'Blog - Nos Gestes Climat',
    description:
      metaDescription ??
      'Découvrez des conseils pratiques pour réduire votre empreinte écologique.',
    image: image?.url ?? '',
    alternates: {
      canonical: `/blog/${params.category}`,
    },
  })
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string }
  searchParams: { page: string }
}) {
  // Get the page number from the query params from the server side
  const page = Number(searchParams.page) || 1

  const {
    title,
    description,
    mainArticle,
    articles,
    pageCount,
    questions,
    faqDescription,
  } = await fetchCategoryPageContent({
    slug: params.category,
    page,
  })

  return (
    <div className="-mt-12">
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
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: questions.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          },
        ]}
      />

      <CategoryHero
        title={title}
        description={description}
        slug={params.category}
      />

      <ContentLarge>
        <MainArticle
          imageSrc={mainArticle.image.url}
          imageAlt={mainArticle.image.alternativeText}
          title={mainArticle.title}
          description={mainArticle.description}
          category={mainArticle.category.title}
          href={`/blog/${mainArticle.category.slug}/${mainArticle.slug}`}
        />

        <ArticleList
          articles={articles}
          pageCount={pageCount}
          currentPage={page}
        />
      </ContentLarge>

      <FAQ
        className="!pb-28"
        questions={questions}
        subTitle={faqDescription}
        isBackgroundSkewed={false}
        isBackgroundFullWidth={true}
      />

      <AllBlogCategories />
    </div>
  )
}
