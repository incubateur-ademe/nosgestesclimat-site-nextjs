import { captureException } from '@sentry/nextjs'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export const cmsClient = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const fullUrl = new URL(`${process.env.CMS_URL}${path}`)
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${process.env.CMS_TOKEN}`,
  }

  fullUrl.searchParams.set('status', isProduction ? 'published' : 'draft')

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
      // In seconds, production => 5 minutes, dev => 5 seconds
      next: { revalidate: isProduction ? 5 : 60 * 5 },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
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

export type PartnerCategoryType = {
  category: string
}

export type PartnerType = {
  name: string
  imageSrc: string
  link: string
  order: number
  category: PartnerCategoryType
}
