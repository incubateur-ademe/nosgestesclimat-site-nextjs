import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

import AllBlogCategories from '@/design-system/cms/AllBlogCategories'
import ArticleList from '@/design-system/cms/ArticleList'
import MainArticle from '@/design-system/cms/MainArticle'
import { fetchCategoryPageContent } from '@/helpers/blog/fetchCategoryPageContent'
import CategoryHero from './_components/CategoryHero'

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}) {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Blog - Nos Gestes Climat'),
    description: t(
      'Découvrez des conseils pratiques pour réduire votre empreinte écologique.'
    ),
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

  const { title, description, mainArticle, articles, pageCount } =
    await fetchCategoryPageContent({
      slug: params.category,
      page,
    })

  return (
    <div className="-mt-12">
      <CategoryHero
        title={title}
        description={description}
        slug={params.category}
      />

      <MainArticle
        imageSrc={mainArticle.image.url}
        imageAlt={mainArticle.image.alternativeText}
        title={mainArticle.title}
        description={mainArticle.description}
        category={mainArticle.category.title}
        href={mainArticle.href}
      />

      <ArticleList
        articles={articles}
        pageCount={pageCount}
        currentPage={page}
      />

      <AllBlogCategories />
    </div>
  )
}
