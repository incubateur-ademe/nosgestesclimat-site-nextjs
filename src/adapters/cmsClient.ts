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

type OptionalKeys<T> = Exclude<
  { [P in keyof T]: undefined extends T[P] ? P : never }[keyof T],
  undefined
>

type Populate<T, KEYS extends OptionalKeys<T>> = Omit<T, OptionalKeys<T>> &
  Required<Pick<T, KEYS>>

// Components
export type PageMetadataType = {
  title: string
  description?: string | null
}

export type HeadingType = {
  id: string
  text: string
  level: number
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

// Single types
export type HomePageType = {
  title: string
  htmlTitle: string
  description: string
  htmlDescription: string
  image?: ImageType
  mainArticle?: ArticleType | null
  articles?: ArticleType[]
  pageMetadata?: PageMetadataType
}

// usage PopulatedHomePageType<"image" | "articles">
export type PopulatedHomePageType<K extends OptionalKeys<HomePageType>> =
  Populate<HomePageType, K>

// Collection types
export type ArticleType = {
  id: number
  documentId: string
  title: string
  duration: number
  description: string
  htmlDescription: string
  content: string
  htmlContent: string
  slug: string
  date: string
  headings: HeadingType[]
  updatedAt: string
  publishedAt: string
  createdAt: string
  category: {
    title: string
    slug: string
  }
  author?: AuthorType | null
  image?: ImageType
  pageMetadata?: PageMetadataType
}

export type QuestionType = {
  id: string
  question: string
  htmlAnswer: string
  order: number
}

export type CategoryType = {
  title: string
  description: string
  faqDescription: string
  mainArticle: ArticleType
  articles: ArticleType[]
  questions: QuestionType[]
  additionalContent: string
  image: ImageType
}

export type AuthorType = {
  name: string
  description: string
  image?: ImageType | null
}

export type MetaType = {
  pagination: {
    pageCount: number
  }
}
