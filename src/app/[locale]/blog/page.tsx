import { Suspense } from 'react'

import ContentLarge from '@/components/layout/ContentLarge'
import Footer from '@/components/layout/Footer'
import JSONLD from '@/components/seo/JSONLD'
import AllBlogCategories from '@/design-system/cms/AllBlogCategories'
import ArticleList from '@/design-system/cms/ArticleList'
import MainArticle from '@/design-system/cms/MainArticle'
import NewslettersBlock from '@/design-system/cms/NewslettersBlock'
import NewslettersBlockSkeleton from '@/design-system/cms/NewslettersBlockSkeleton'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getLangButtonsDisplayed } from '@/helpers/language/getLangButtonsDisplayed'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { Locale } from '@/i18nConfig'
import i18nConfig from '@/i18nConfig'
import { fetchHomepageContent } from '@/services/cms/fetchHomepageContent'
import { fetchHomepageMetadata } from '@/services/cms/fetchHomepageMetadata'
import type { DefaultPageProps } from '@/types'
import { notFound } from 'next/navigation'
import QueryClientProviderWrapper from '../_components/mainLayoutProviders/QueryClientProviderWrapper'
import BlogHero from './_components/BlogHero'
import GroupBlock from './_components/GroupBlock'

export async function generateStaticParams({
  params,
}: DefaultPageProps<{ params: { locale: Locale } }>) {
  const { locale } = await params
  const { pageCount } =
    (await fetchHomepageContent({
      page: 0,
      locale,
    })) ?? {}

  const locales = i18nConfig.locales
  const pages = Array.from(
    { length: pageCount ?? 3 },
    (_, index: number) => index
  )

  return locales.flatMap((locale) =>
    pages.map((page) => ({ locale, page: (page + 1).toString() }))
  )
}

export async function generateMetadata({
  params,
  searchParams,
}: DefaultPageProps<{
  params: { locale: Locale }
  searchParams: { page: string }
}>) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  const pageParam = searchParams ? (await searchParams).page : undefined

  const page = Number(pageParam) || 1

  const { metaTitle, metaDescription, image } =
    (await fetchHomepageMetadata({ locale })) || {}

  const { pageCount } =
    (await fetchHomepageContent({
      page,
      locale,
    })) ?? {}

  return getMetadataObject({
    locale,
    title: metaTitle
      ? `${metaTitle}${t('blog.metaTitleSuffix', ', page {{page}} sur {{pageCount}}', { page, pageCount })}`
      : t(
          'blog.metaTitle',
          'Blog, découvrez nos articles et conseils sur le climat, page {{page}} sur {{pageCount}} - Nos Gestes Climat',
          { page, pageCount }
        ),
    description:
      metaDescription ??
      t(
        'blog.metaDescription',
        'Découvrez des conseils pratiques pour réduire votre empreinte écologique.'
      ),
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
  params: { locale: Locale }
}>) {
  const { locale } = await params

  const { t } = await getServerTranslation({ locale })

  // Get the page number from the query params from the server side
  const pageParam = searchParams ? (await searchParams).page : undefined

  const page = Number(pageParam) || 1

  const { title, description, image, mainArticle, articles, pageCount } =
    (await fetchHomepageContent({
      page,
      locale,
    })) ?? {}

  const langButtonsDisplayed = await getLangButtonsDisplayed()

  if (!title || !description || !articles) {
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
            logo: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/petit_logo_006dd01955.png',
          },
        ]}
      />

      <ContentLarge tag="div" className="overflow-hidden px-4 lg:px-0">
        {title && description && (
          <BlogHero
            title={title}
            description={description}
            image={
              image ?? {
                url: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/medium_girl_reading_newspaper_d171290d3d.png',
                alternativeText: t(
                  'Un femme lisant le journal au coin du feu avec un chien assoupi.'
                ),
              }
            }
          />
        )}

        {mainArticle && (
          <MainArticle
            locale={locale}
            title={mainArticle.title}
            description={mainArticle.description}
            imageSrc={mainArticle.image?.url ?? ''}
            imageAlt={mainArticle.image?.alternativeText ?? ''}
            href={`/blog/${mainArticle.blogCategory?.slug}/${mainArticle.slug}`}
            category={mainArticle.blogCategory?.title ?? ''}
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
          <QueryClientProviderWrapper>
            <Suspense fallback={<NewslettersBlockSkeleton />}>
              <NewslettersBlock />
            </Suspense>
          </QueryClientProviderWrapper>

          <GroupBlock locale={locale} />
        </div>
      </ContentLarge>

      <AllBlogCategories locale={locale} />

      <Footer langButtonsDisplayed={langButtonsDisplayed} />
    </>
  )
}
