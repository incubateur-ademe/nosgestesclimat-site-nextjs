import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

import FAQ from '@/components/landing-pages/FAQ'
import ContentLarge from '@/components/layout/ContentLarge'
import JSONLD from '@/components/seo/JSONLD'
import AllBlogCategories from '@/design-system/cms/AllBlogCategories'
import ArticleList from '@/design-system/cms/ArticleList'
import MainArticle from '@/design-system/cms/MainArticle'
import { fetchCategoryPageContent } from '@/helpers/blog/fetchCategoryPageContent'
import { fetchCategoryPageMetadata } from '@/helpers/blog/fetchCategoryPageMetadata'
import { redirect } from 'next/navigation'
import AdditionalContent from './_components/AdditionalContent'
import CategoryHero from './_components/CategoryHero'

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}) {
  const { metaTitle, metaDescription, image } =
    (await fetchCategoryPageMetadata({
      slug: params.category,
    })) || {}

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
    additionalContent,
    image,
  } =
    (await fetchCategoryPageContent({
      slug: params.category,
      page,
    })) || {}

  if (!title || !description || !mainArticle || !articles || !questions) {
    return redirect('/404')
  }

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
                text: faq.htmlAnswer,
              },
            })),
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
                name: title,
                item: `https://nosgestesclimat.fr/blog/${params.category}`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Articles',
                item: `https://nosgestesclimat.fr/blog/${params.category}?page=1`,
              },
            ],
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
          pageCount={pageCount ?? 0}
          currentPage={page}
        />
      </ContentLarge>

      <FAQ
        className="!pb-28"
        questions={questions.map((question) => ({
          question: question.question,
          answer: question.htmlAnswer,
        }))}
        subTitle={faqDescription}
        isBackgroundSkewed={false}
        isBackgroundFullWidth={true}
        shouldUseDangerouslySetInnerHTML={true}
      />

      <AdditionalContent
        content={additionalContent ?? ''}
        image={image ?? { url: '', alternativeText: '' }}
      />

      <AllBlogCategories />
    </div>
  )
}
