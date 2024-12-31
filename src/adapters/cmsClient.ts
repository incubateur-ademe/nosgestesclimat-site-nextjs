import { captureException } from '@sentry/nextjs'

export const cmsClient = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const fullUrl = `${process.env.CMS_URL}${url}`
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${process.env.CMS_TOKEN}`,
  }

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
      cache: 'force-cache',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('CMS API Error:', error)

    captureException(error)

    throw error
  }
}

export type HomepageContentType = {
  title: string
  description: string
  image: ImageType
  mainArticle: ArticleType
  articles: ArticleType[]
  pageCount: number
}

export type HomepageMetadataType = {
  metaTitle: string
  metaDescription: string
  image: ImageType
}

export type PageMetadataType = {
  title: string
  description: string
}

export type CategoryType = {
  id: string
  title: string
  slug: string
  description: string
  order: number
  mainArticle: ArticleType
  htmlDescription: string
  htmlContent: string
  questions: QuestionType[]
  faqDescription: string
  pageMetadata: PageMetadataType
}

export type QuestionType = {
  id: string
  question: string
  htmlAnswer: string
  order: number
}

export type CategoryPageContentType = {
  title: string
  description: string
  faqDescription: string
  mainArticle: ArticleType
  articles: ArticleType[]
  pageCount: number
  questions: QuestionType[]
  additionalContent: string
  image: ImageType
}

export type HeadingType = {
  id: string
  text: string
  level: number
}

export type ArticleType = {
  id: string
  documentId: string
  title: string
  slug: string
  description: string
  image: ImageType
  duration: number
  date: string
  category: {
    title: string
    slug: string
  }
  content: string
  htmlContent: string
  modifiedAt: string
  publishedAt: string
  createdAt: string
  headings: HeadingType[]
  author: AuthorType
  pageMetadata: PageMetadataType
}

export type ImageType = {
  url: string
  alternativeText: string
  formats?: {
    small: {
      url: string
    }
    medium: {
      url: string
    }
    thumbnail: {
      url: string
    }
  }
}

export type AuthorType = {
  name: string
  description: string
  image?: ImageType
}

export type MetaType = {
  pagination: {
    pageCount: number
  }
}
