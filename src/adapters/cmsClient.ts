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
      // In seconds, production => 5 minutes, dev => 5 seconds
      next: { revalidate: process.env.NODE_ENV !== 'production' ? 5 : 60 * 5 },
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
  htmlTitle: string
  description: string
  htmlDescription: string
  image?: ImageType | null
  mainArticle?: ArticleType | null
  articles?: ArticleType[] | null
  pageMetadata?: PageMetadataType
} & DefaultAttributesType

// usage PopulatedHomePageType<"image" | "articles">
export type PopulatedHomePageType<K extends OptionalKeys<HomePageType>> =
  Populate<HomePageType, K>

// Collection types
export type ArticleType = {
  title: string
  duration: number
  description: string
  htmlDescription: string
  content: string
  htmlContent: string
  headings: HeadingType[]
  slug: string
  image?: ImageType | null
  category?: CategoryType | null
  author?: AuthorType | null
  pageMetadata?: PageMetadataType
} & DefaultAttributesType

export type PopulatedArticleType<K extends OptionalKeys<ArticleType>> =
  Populate<ArticleType, K>

export type AuthorType = {
  name: string
  description: string
  htmlDescription: string
  image?: ImageType | null
  articles?: ArticleType[] | null
}

export type PopulatedAuthorType<K extends OptionalKeys<AuthorType>> = Populate<
  AuthorType,
  K
>

export type CategoryType = {
  slug: string
  title: string
  description: string
  faqDescription: string
  additionalContent: string
  htmlContent: string
  htmlTitle: string
  image?: ImageType | null
  articles?: ArticleType[] | null
  questions?: QuestionType[] | null
  pageMetadata?: PageMetadataType
  mainArticle?: ArticleType | null
} & DefaultAttributesType

export type PopulatedCategoryType<K extends OptionalKeys<CategoryType>> =
  Populate<CategoryType, K>

export type QuestionType = {
  question: string
  answer: string
  htmlAnswer: string
  order: number
  category?: CategoryType | null
} & DefaultAttributesType

export type ArticleItemType = Pick<
  PopulatedArticleType<'image' | 'category'>,
  'id' | 'documentId' | 'title' | 'description' | 'slug' | 'image' | 'category'
>

export type BannerType = {
  text: string
  link: {
    URL: string
    label: string
  }
  startDate: string
  endDate: string
} & DefaultAttributesType
