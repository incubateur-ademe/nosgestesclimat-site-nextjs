import type { HomepageContentType } from '@/types/blog'
import axios from 'axios'

const PAGE_SIZE = 12

export async function fetchHomepageContent({
  page,
}: {
  page: number
}): Promise<HomepageContentType> {
  try {
    const homepageResponse = await axios.get(
      `${process.env.CMS_URL}/api/home-page?locale=fr&populate[0]=image&populate[1]=mainArticle`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    const mainArticleDocumentId =
      homepageResponse.data.data.mainArticle.documentId

    const mainArticleResponse = await axios.get(
      `${process.env.CMS_URL}/api/articles/${mainArticleDocumentId}?locale=fr&fields[0]=title&fields[1]=description&fields[2]=slug&populate[0]=image&populate[1]=category`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    const articlesResponse = await axios.get(
      `${process.env.CMS_URL}/api/articles?locale=fr&fields[0]=title&fields[1]=description&fields[2]=slug&populate[0]=image&populate[1]=category&filters[id][$ne]=${homepageResponse.data.data.mainArticle.id}&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    console.log(articlesResponse.data.data)

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
    return {
      title: '',
      description: '',
      image: {
        url: '',
        alternativeText: '',
        formats: {
          small: { url: '' },
          medium: { url: '' },
          thumbnail: { url: '' },
        },
      },
      mainArticle: {
        title: '',
        description: '',
        image: { url: '', alternativeText: '' },
        slug: '',
        category: { title: '', slug: '' },
        id: '',
      },
      articles: [],
      pageCount: 0,
    }
  }
}
