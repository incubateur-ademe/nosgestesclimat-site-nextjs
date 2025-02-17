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
  params: Promise<{ category: string; locale: string }>
}) {
  const { category, locale } = await params

  const { metaTitle, metaDescription, image } =
    (await fetchCategoryPageMetadata({
      slug: category,
    })) || {}

  return getMetadataObject({
    locale,
    title: metaTitle ?? 'Blog - Nos Gestes Climat',
    description:
      metaDescription ??
      'Découvrez des conseils pratiques pour réduire votre empreinte écologique.',
    image: image?.url ?? '',
    alternates: {
      canonical: `/blog/${category}`,
    },
  })
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; locale: string }>
  searchParams: { page: string }
}) {
  const { category, locale } = await params

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
      slug: category,
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
        categorySlug={category}
      />

      <CategoryHero
        title={title}
        description={description}
        slug={category}
        locale={locale}
      />

      <ContentLarge tag="div" className="overflow-hidden px-4 lg:px-0">
        {mainArticle && (
          <MainArticle
            imageSrc={mainArticle.image?.url ?? ''}
            imageAlt={mainArticle.image?.alternativeText ?? ''}
            title={mainArticle.title}
            description={mainArticle.description}
            category={title}
            href={`/blog/${category}/${mainArticle.slug}`}
            locale={locale}
          />
        )}

        {articles && articles.length > 0 && (
          <ArticleList
            articles={articles}
            pageCount={pageCount ?? 0}
            currentPage={page}
            locale={locale}
          />
        )}
      </ContentLarge>

      {questions && questions.length > 0 && (
        <FAQ
          className="!pb-10"
          questions={questions.map((question) => ({
            question: question.question,
            answer: question.htmlAnswer,
          }))}
          subTitle={faqDescription}
          isBackgroundSkewed={false}
          shouldUseDangerouslySetInnerHTML={true}
        />
      )}

      {additionalContent && image && (
        <AdditionalContent
          content={additionalContent ?? ''}
          image={image ?? { url: '', alternativeText: '' }}
        />
      )}

      <AllBlogCategories
        className={
          additionalContent && image ? 'before:bg-white' : 'before:bg-[#F6F6F5]'
        }
        locale={locale}
      />
    </div>
  )
}
