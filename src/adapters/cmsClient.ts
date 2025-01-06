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
  } | null
}

export type AuthorType = {
  name: string
  description: string
  htmlDescription?: string | null
  image?: ImageType | null
  articles?: ArticleType[] | null
}

export type MetaType = {
  pagination: {
    pageCount: number
  }
}

type DefaultAttributesType = {
  id: string
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Single types
export type HomePageType = {
  title: string
  htmlTitle?: string | null
  description: string
  htmlDescription: string
  image?: ImageType | null
  mainArticle?: ArticleType | null
  pageMetadata: PageMetadataType
  articles?: ArticleType[] | null
} & DefaultAttributesType

// usage PopulatedHomePageType<"image" | "articles">
export type PopulatedHomePageType<K extends OptionalKeys<HomePageType>> =
  Populate<HomePageType, K>

// Collection types
export type ArticleType = {
  title: string
  duration: number
  image?: ImageType
  description: string
  htmlDescription?: string | null
  content: string
  headings?: HeadingType[] | null
  htmlContent?: string | null
  slug: string
  category?: {
    title: string
    slug: string
  } | null
  author?: AuthorType | null
  pageMetadata: PageMetadataType
} & DefaultAttributesType

export type QuestionType = {
  question: string
  htmlAnswer: string
  order: number
} & DefaultAttributesType

export type CategoryType = {
  slug: string
  title: string
  description: string
  faqDescription: string
  mainArticle?: ArticleType
  articles?: ArticleType[] | null
  questions?: QuestionType[] | null
  additionalContent: string
  image?: ImageType | null
  htmlContent: string
  htmlTitle: string
  pageMetadata: PageMetadataType
} & DefaultAttributesType

export type PopulatedCategoryType<K extends OptionalKeys<CategoryType>> =
  Populate<CategoryType, K>
