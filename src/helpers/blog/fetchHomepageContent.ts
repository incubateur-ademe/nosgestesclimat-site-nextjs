import type { HomepageContentType } from '@/types/blog'
import axios from 'axios'

const PAGE_SIZE = 12

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchHomepageContent({
  page,
}: {
  page: number
}): Promise<HomepageContentType | undefined> {
  try {
    const homepageResponse = await axios.get(
      `${process.env.CMS_URL}/api/home-page?locale=fr&populate[0]=image&populate[1]=mainArticle${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    const mainArticleDocumentId =
      homepageResponse.data.data.mainArticle.documentId

    const mainArticleResponse = await axios.get(
      `${process.env.CMS_URL}/api/articles/${mainArticleDocumentId}?locale=fr&fields[0]=title&fields[1]=description&fields[2]=slug&populate[0]=image&populate[1]=category${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    const articlesResponse = await axios.get(
      `${process.env.CMS_URL}/api/articles?locale=fr&fields[0]=title&fields[1]=description&fields[2]=slug&populate[0]=image&populate[1]=category&filters[id][$ne]=${homepageResponse.data.data.mainArticle.id}&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    return {
      title: homepageResponse.data.data.title,
      description: homepageResponse.data.data.description,
      image: homepageResponse.data.data.image,
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
    return undefined
  }
}
