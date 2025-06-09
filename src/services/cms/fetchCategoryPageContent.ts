import type {
  ArticleItemType,
  PopulatedArticleType,
  PopulatedCategoryType,
} from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import { getLocaleWithoutEs } from '@/helpers/language/getLocaleWithoutEs'
import { type Locale } from '@/i18nConfig'

const PAGE_SIZE = 12

export async function fetchCategoryPageContent({
  slug,
  page,
  locale,
}: {
  slug: string
  page: number
  locale: Locale
}): Promise<
  | (Partial<
      PopulatedCategoryType<'questions' | 'image'> & {
        mainArticle: PopulatedArticleType<'image'>
        articles: ArticleItemType[]
      }
    > & {
      pageCount: number
    })
  | undefined
> {
  try {
    const localeUsed = getLocaleWithoutEs(locale)
    const categorySearchParams = new URLSearchParams({
      locale: localeUsed,
      'filters[slug][$eq]': slug,
      'populate[0]': 'image',
      'populate[1]': 'questions',
      'populate[2]': 'mainArticle',
      'populate[3]': 'mainArticle.image',
      sort: 'questions.order:asc',
    })

    const categoryResponse = await cmsClient<{
      data: [
        PopulatedCategoryType<'questions' | 'image'> & {
          mainArticle: PopulatedArticleType<'image'>
        },
      ]
    }>(`/api/categories?${categorySearchParams}`)

    if (categoryResponse?.data?.length !== 1) {
      console.error(`Error: fetch category error for categorySlug: ${slug}`)
    }

    const {
      data: [category],
    } = categoryResponse

    const { id: categoryId, mainArticle } = category

    const { documentId } = mainArticle || {}

    const articlesSearchParams = new URLSearchParams({
      locale: localeUsed,
      'fields[0]': 'title',
      'fields[1]': 'description',
      'fields[2]': 'slug',
      'populate[0]': 'image',
      'populate[1]': 'category',
      ...(documentId ? { 'filters[documentId][$ne]': documentId } : {}),
      ...(categoryId ? { 'filters[category][$eq]': categoryId } : {}),
      'pagination[page]': page.toString(),
      'pagination[pageSize]': PAGE_SIZE.toString(),
      sort: 'createdAt:desc',
    })

    const articlesResponse = await cmsClient<{
      data: ArticleItemType[]
      meta: { pagination: { pageCount: number } }
    }>(`/api/articles?${articlesSearchParams}`)

    const { data: articles, meta } = articlesResponse

    return {
      title: category.title,
      description: category.description,
      mainArticle: category.mainArticle,
      additionalContent: category.htmlContent,
      image: category.image,
      articles,
      pageCount: meta.pagination.pageCount,
      questions: category.questions,
      faqDescription: category.faqDescription,
    }
  } catch (error) {
    return undefined
  }
}
