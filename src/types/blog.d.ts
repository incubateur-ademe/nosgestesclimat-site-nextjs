export type HomepageContentType = {
  title: string
  description: string
  image: {
    url: string
    alternativeText: string
    formats: {
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
  mainArticle: ArticleType
  articles: ArticleType[]
  pageCount: number
}

export type HomepageMetadataType = {
  metaTitle: string
  metaDescription: string
  image: {
    url: string
    alternativeText: string
  }
}

export type CategoryType = {
  id: string
  title: string
  slug: string
  description: string
  order: number
  mainArticle: ArticleType
}

export type QuestionType = {
  id: string
  question: string
  htmlAnswer: string
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
  image: {
    url: string
    alternativeText: string
  }
}

export type HeadingType = {
  id: string
  text: string
  level: number
}

export type ArticleType = {
  documentId: string
  title: string
  slug: string
  description: string
  image: {
    url: string
    alternativeText: string
  }
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
  author: {
    name: string
    description: string
    image: {
      url: string
      alternativeText: string
    }
  }
}

export type AuthorType = {
  name: string
  description: string
  image: {
    url: string
    alternativeText: string
  }
}
