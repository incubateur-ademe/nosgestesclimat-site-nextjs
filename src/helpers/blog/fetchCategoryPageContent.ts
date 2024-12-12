import type { CategoryPageContentType } from '@/types/blog'
import axios from 'axios'

const PAGE_SIZE = 12

export async function fetchCategoryPageContent({
  slug,
  page,
}: {
  slug: string
  page: number
}): Promise<CategoryPageContentType> {
  try {
    const categoryResponse = await axios.get(
      `${process.env.CMS_URL}/api/categories?locale=fr&filters[slug][$eq]=${slug}&populate[0]=mainArticle`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    const mainArticleDocumentId =
      categoryResponse.data.data[0].mainArticle.documentId

    const mainArticleResponse = await axios.get(
      `${process.env.CMS_URL}/api/articles/${mainArticleDocumentId}?locale=fr&fields[0]=title&fields[1]=description&fields[2]=slug&populate[0]=image&populate[1]=category`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    const articlesResponse = await axios.get(
      `${process.env.CMS_URL}/api/articles?locale=fr&fields[0]=title&fields[1]=description&fields[2]=slug&populate[0]=image&populate[1]=category&filters[documentId][$ne]=${mainArticleDocumentId}&filters[category][$eq]=${categoryResponse.data.data[0].id}&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )
    console.log(categoryResponse.data.data[0])
    return {
      title: categoryResponse.data.data[0].title,
      description: categoryResponse.data.data[0].description,
      mainArticle: mainArticleResponse.data.data,
      articles: articlesResponse.data.data,
      pageCount: articlesResponse.data.meta.pagination.pageCount,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific HTTP errors
      console.error('API Error:', error.response?.status, error.response?.data)
    } else {
      // Handle other errors
      console.error('Error:', error)
    }
    return {
      title: '',
      description: '',
      mainArticle: {
        id: '',
        title: '',
        slug: '',
        description: '',
        href: '',
        image: {
          url: '',
          alternativeText: '',
        },
        category: {
          id: '',
          title: '',
          slug: '',
        },
      },
      articles: [],
      pageCount: 0,
    }
  }
}
