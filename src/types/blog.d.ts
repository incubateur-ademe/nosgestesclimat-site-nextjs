export type ArticleType = {
  id: string
  title: string
  description: string
  image: {
    url: string
    alternativeText: string
  }
  slug: string
  category: {
    title: string
    slug: string
  }
}

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
  metaImage: {
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
}
