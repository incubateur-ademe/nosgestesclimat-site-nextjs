import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

import FAQ from '@/components/landing-pages/FAQ'
import ContentLarge from '@/components/layout/ContentLarge'
import Footer from '@/components/layout/Footer'
import { NOT_FOUND_PATH } from '@/constants/urls/paths'
import AllBlogCategories from '@/design-system/cms/AllBlogCategories'
import ArticleList from '@/design-system/cms/ArticleList'
import MainArticle from '@/design-system/cms/MainArticle'
import { getLangButtonsDisplayed } from '@/helpers/language/getLangButtonsDisplayed'
import type { Locale } from '@/i18nConfig'
import { fetchCategoryPageContent } from '@/services/cms/fetchCategoryPageContent'
import { fetchCategoryPageMetadata } from '@/services/cms/fetchCategoryPageMetadata'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'
import AdditionalContent from './_components/AdditionalContent'
import CategoryHero from './_components/CategoryHero'
import CategoryJSONLD from './_components/CategoryJSONLD'

export async function generateMetadata({
  params,
}: DefaultPageProps<{
  params: { category: string; locale: Locale }
}>) {
  const { category, locale } = await params

  const { metaTitle, metaDescription, image } =
    (await fetchCategoryPageMetadata({
      slug: category,
      locale,
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
}: DefaultPageProps<{
  params: { category: string; locale: Locale }
  searchParams: { page: string }
}>) {
  const { category, locale } = await params

  const pageParam = searchParams ? (await searchParams).page : undefined

  // Get the page number from the query params from the server side
  const page = Number(pageParam) || 1

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
      locale,
    })) || {}

  const langButtonsDisplayed = await getLangButtonsDisplayed({
    category,
  })

  if (!title || !description) {
    return redirect(NOT_FOUND_PATH)
  }

  return (
    <>
      <div className="-mt-12">
        <CategoryJSONLD
          title={title}
          questions={questions ?? []}
          categorySlug={category}
        />

        <CategoryHero title={title} description={description} slug={category} />

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
            className="pb-10!"
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
            (additionalContent && image) ||
            (!(additionalContent || image) && !questions?.length)
              ? 'before:bg-white'
              : 'before:bg-[#F6F6F5]'
          }
          locale={locale}
        />
      </div>

      <Footer langButtonsDisplayed={langButtonsDisplayed} />
    </>
  )
}
