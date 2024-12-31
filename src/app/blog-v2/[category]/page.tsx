import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

import FAQ from '@/components/landing-pages/FAQ'
import ContentLarge from '@/components/layout/ContentLarge'
import AllBlogCategories from '@/design-system/cms/AllBlogCategories'
import ArticleList from '@/design-system/cms/ArticleList'
import MainArticle from '@/design-system/cms/MainArticle'
import { fetchCategoryPageContent } from '@/services/cms/fetchCategoryPageContent'
import { fetchCategoryPageMetadata } from '@/services/cms/fetchCategoryPageMetadata'
import { redirect } from 'next/navigation'
import AdditionalContent from './_components/AdditionalContent'
import CategoryHero from './_components/CategoryHero'
import CategoryJSONLD from './_components/CategoryJSONLD'

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

  if (!title || !description) {
    return redirect('/404')
  }

  return (
    <div className="-mt-12">
      <CategoryJSONLD
        title={title}
        questions={questions ?? []}
        categorySlug={params.category}
      />

      <CategoryHero
        title={title}
        description={description}
        slug={params.category}
      />

      <ContentLarge tag="div">
        {mainArticle && (
          <MainArticle
            imageSrc={mainArticle.image.url}
            imageAlt={mainArticle.image.alternativeText}
            title={mainArticle.title}
            description={mainArticle.description}
            category={mainArticle.category.title}
            href={`/blog-v2/${mainArticle.category.slug}/${mainArticle.slug}`}
          />
        )}

        {articles && articles.length > 0 && (
          <ArticleList
            articles={articles}
            pageCount={pageCount ?? 0}
            currentPage={page}
          />
        )}
      </ContentLarge>

      {questions && questions.length > 0 && (
        <FAQ
          className="mt-20 !pb-28"
          questions={questions.map((question) => ({
            question: question.question,
            answer: question.htmlAnswer,
          }))}
          subTitle={faqDescription}
          isBackgroundSkewed={false}
          isBackgroundFullWidth={true}
          shouldUseDangerouslySetInnerHTML={true}
        />
      )}

      {additionalContent && image && (
        <AdditionalContent
          content={additionalContent ?? ''}
          image={image ?? { url: '', alternativeText: '' }}
        />
      )}

      <AllBlogCategories />
    </div>
  )
}
