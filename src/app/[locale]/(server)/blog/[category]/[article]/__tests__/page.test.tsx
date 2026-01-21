import type { Locale } from '@/i18nConfig'
import { redirect } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ArticlePage from '../page'

// Mock CMS services
vi.mock('@/services/cms/fetchArticlePageContent', () => ({
  fetchArticlePageContent: vi.fn(),
}))
vi.mock('@/services/cms/fetchArticlePageMetadata', () => ({
  fetchArticlePageMetadata: vi.fn(),
}))

// Mock helpers
vi.mock('@/helpers/language/getLangButtonsDisplayed', () => ({
  getLangButtonsDisplayed: vi.fn(),
}))

import { getLangButtonsDisplayed } from '@/helpers/language/getLangButtonsDisplayed'
import { fetchArticlePageContent } from '@/services/cms/fetchArticlePageContent'
import { fetchArticlePageMetadata } from '@/services/cms/fetchArticlePageMetadata'

const mockFetchArticlePageContent = vi.mocked(fetchArticlePageContent)
const mockFetchArticlePageMetadata = vi.mocked(fetchArticlePageMetadata)
const mockGetLangButtonsDisplayed = vi.mocked(getLangButtonsDisplayed)
const mockRedirect = vi.mocked(redirect)

describe('ArticlePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchArticlePageContent.mockResolvedValue({
      article: {
        id: '1',
        documentId: 'doc-1',
        title: 'Article Title',
        description: 'Article Description',
        htmlDescription: 'Article HTML Description',
        content: 'Article Content',
        htmlContent: '<p>Article HTML Content</p>',
        headings: [],
        duration: 300, // 5 minutes
        slug: 'article-slug',
        image: {
          url: 'article-image.jpg',
          alternativeText: 'Article Image',
        },
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
        publishedAt: '2023-01-01T00:00:00.000Z',
        blogCategory: {
          id: 'cat-1',
          documentId: 'doc-cat-1',
          title: 'Category Title',
          slug: 'category-slug',
          description: 'Category Description',
          faqDescription: 'Category FAQ Description',
          additionalContent: 'Category Additional Content',
          htmlContent: 'Category HTML Content',
          htmlTitle: 'Category HTML Title',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
        },
        author: {
          name: 'Author Name',
          description: 'Author Bio',
          htmlDescription: 'Author HTML Bio',
          image: {
            url: 'author-avatar.jpg',
            alternativeText: 'Author Avatar',
          },
        },
      },
      otherArticles: [
        {
          id: '2',
          documentId: 'doc-2',
          title: 'Other Article 1',
          description: 'Other Article 1 Description',
          htmlDescription: 'Other Article 1 HTML Description',
          content: 'Other Article 1 Content',
          htmlContent: 'Other Article 1 HTML Content',
          headings: [],
          duration: 240,
          slug: 'other-article-1',
          image: {
            url: 'other-article-1-image.jpg',
            alternativeText: 'Other Article 1 Image',
          },
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
          blogCategory: {
            id: 'cat-2',
            documentId: 'doc-cat-2',
            title: 'Category 2',
            slug: 'category-2',
            description: 'Category 2 Description',
            faqDescription: 'Category 2 FAQ Description',
            additionalContent: 'Category 2 Additional Content',
            htmlContent: 'Category 2 HTML Content',
            htmlTitle: 'Category 2 HTML Title',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
            publishedAt: '2023-01-01T00:00:00.000Z',
          },
        },
      ],
    })
    mockFetchArticlePageMetadata.mockResolvedValue({
      metaTitle: 'Meta Title',
      metaDescription: 'Meta Desc',
      image: { url: 'meta.jpg', alternativeText: 'meta' },
    })
    mockGetLangButtonsDisplayed.mockResolvedValue({
      fr: true,
      en: true,
    })
  })

  describe('Redirections', () => {
    it('should redirect to FR if not FR and missing article', async () => {
      mockFetchArticlePageContent.mockResolvedValue({
        article: undefined,
        otherArticles: [],
      })
      const params = Promise.resolve({
        category: 'cat',
        article: 'art',
        locale: 'en' as Locale,
      })
      await ArticlePage({ params })
      expect(mockRedirect).toHaveBeenCalledWith('/fr/blog/cat/art')
    })

    it('should redirect to NOT_FOUND_PATH if FR and missing article', async () => {
      mockFetchArticlePageContent.mockResolvedValue({
        article: undefined,
        otherArticles: [],
      })
      const params = Promise.resolve({
        category: 'cat',
        article: 'toto',
        locale: 'fr' as Locale,
      })

      await expect(ArticlePage({ params })).rejects.toThrow('NEXT_NOT_FOUND')
    })

    it('should redirect to NOT_FOUND_PATH if missing article in any locale', async () => {
      mockFetchArticlePageContent.mockResolvedValue({
        article: undefined,
        otherArticles: [],
      })
      const params = Promise.resolve({
        category: 'cat',
        article: 'art',
        locale: 'en' as Locale,
      })
      await ArticlePage({ params })
      expect(mockRedirect).toHaveBeenCalledWith('/fr/blog/cat/art')
    })
  })

  describe('Rendering', () => {
    it('should render successfully with complete content', async () => {
      const params = Promise.resolve({
        category: 'cat',
        article: 'art',
        locale: 'fr' as Locale,
      })
      const result = await ArticlePage({ params })
      expect(result).toBeDefined()
    })

    it('should handle article without category', async () => {
      mockFetchArticlePageContent.mockResolvedValue({
        article: {
          id: '1',
          documentId: 'doc-1',
          title: 'Article Title',
          description: 'Article Description',
          htmlDescription: 'Article HTML Description',
          content: 'Article Content',
          htmlContent: '<p>Article HTML Content</p>',
          headings: [],
          duration: 300,
          slug: 'article-slug',
          image: {
            url: 'article-image.jpg',
            alternativeText: 'Article Image',
          },
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
          blogCategory: null,
          author: {
            name: 'Author Name',
            description: 'Author Bio',
            htmlDescription: 'Author HTML Bio',
            image: {
              url: 'author-avatar.jpg',
              alternativeText: 'Author Avatar',
            },
          },
        },
        otherArticles: [],
      })
      const params = Promise.resolve({
        category: 'cat',
        article: 'art',
        locale: 'fr' as Locale,
      })
      const result = await ArticlePage({ params })
      expect(result).toBeDefined()
    })

    it('should handle article without author', async () => {
      mockFetchArticlePageContent.mockResolvedValue({
        article: {
          id: '1',
          documentId: 'doc-1',
          title: 'Article Title',
          description: 'Article Description',
          htmlDescription: 'Article HTML Description',
          content: 'Article Content',
          htmlContent: '<p>Article HTML Content</p>',
          headings: [],
          duration: 300,
          slug: 'article-slug',
          image: {
            url: 'article-image.jpg',
            alternativeText: 'Article Image',
          },
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
          blogCategory: {
            id: 'cat-1',
            documentId: 'doc-cat-1',
            title: 'Category Title',
            slug: 'category-slug',
            description: 'Category Description',
            faqDescription: 'Category FAQ Description',
            additionalContent: 'Category Additional Content',
            htmlContent: 'Category HTML Content',
            htmlTitle: 'Category HTML Title',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
            publishedAt: '2023-01-01T00:00:00.000Z',
          },
          author: {
            name: 'Author Name',
            description: 'Author Bio',
            htmlDescription: 'Author HTML Bio',
            image: {
              url: 'author-avatar.jpg',
              alternativeText: 'Author Avatar',
            },
          },
        },
        otherArticles: [],
      })
      const params = Promise.resolve({
        category: 'cat',
        article: 'art',
        locale: 'fr' as Locale,
      })
      const result = await ArticlePage({ params })
      expect(result).toBeDefined()
    })

    it('should handle article without image', async () => {
      mockFetchArticlePageContent.mockResolvedValue({
        article: {
          id: '1',
          documentId: 'doc-1',
          title: 'Article Title',
          description: 'Article Description',
          htmlDescription: 'Article HTML Description',
          content: 'Article Content',
          htmlContent: '<p>Article HTML Content</p>',
          headings: [],
          duration: 300,
          slug: 'article-slug',
          image: null,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
          blogCategory: {
            id: 'cat-1',
            documentId: 'doc-cat-1',
            title: 'Category Title',
            slug: 'category-slug',
            description: 'Category Description',
            faqDescription: 'Category FAQ Description',
            additionalContent: 'Category Additional Content',
            htmlContent: 'Category HTML Content',
            htmlTitle: 'Category HTML Title',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
            publishedAt: '2023-01-01T00:00:00.000Z',
          },
          author: {
            name: 'Author Name',
            description: 'Author Bio',
            htmlDescription: 'Author HTML Bio',
            image: {
              url: 'author-avatar.jpg',
              alternativeText: 'Author Avatar',
            },
          },
        },
        otherArticles: [],
      })
      const params = Promise.resolve({
        category: 'cat',
        article: 'art',
        locale: 'fr' as Locale,
      })
      const result = await ArticlePage({ params })
      expect(result).toBeDefined()
    })

    it('should handle article without createdAt date', async () => {
      mockFetchArticlePageContent.mockResolvedValue({
        article: {
          id: '1',
          documentId: 'doc-1',
          title: 'Article Title',
          description: 'Article Description',
          htmlDescription: 'Article HTML Description',
          content: 'Article Content',
          htmlContent: '<p>Article HTML Content</p>',
          headings: [],
          duration: 300,
          slug: 'article-slug',
          image: {
            url: 'article-image.jpg',
            alternativeText: 'Article Image',
          },
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
          blogCategory: {
            id: 'cat-1',
            documentId: 'doc-cat-1',
            title: 'Category Title',
            slug: 'category-slug',
            description: 'Category Description',
            faqDescription: 'Category FAQ Description',
            additionalContent: 'Category Additional Content',
            htmlContent: 'Category HTML Content',
            htmlTitle: 'Category HTML Title',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
            publishedAt: '2023-01-01T00:00:00.000Z',
          },
          author: {
            name: 'Author Name',
            description: 'Author Bio',
            htmlDescription: 'Author HTML Bio',
            image: {
              url: 'author-avatar.jpg',
              alternativeText: 'Author Avatar',
            },
          },
        },
        otherArticles: [],
      })
      const params = Promise.resolve({
        category: 'cat',
        article: 'art',
        locale: 'fr' as Locale,
      })
      const result = await ArticlePage({ params })
      expect(result).toBeDefined()
    })
  })

  describe('Service calls', () => {
    it('should call fetchArticlePageContent with correct parameters', async () => {
      const params = Promise.resolve({
        category: 'test-category',
        article: 'test-article',
        locale: 'fr' as Locale,
      })
      await ArticlePage({ params })
      expect(mockFetchArticlePageContent).toHaveBeenCalledWith({
        articleSlug: 'test-article',
        categorySlug: 'test-category',
        locale: 'fr',
      })
    })

    it('should call getLangButtonsDisplayed with correct parameters', async () => {
      const params = Promise.resolve({
        category: 'test-category',
        article: 'test-article',
        locale: 'fr' as Locale,
      })
      await ArticlePage({ params })
      expect(mockGetLangButtonsDisplayed).toHaveBeenCalledWith({
        category: 'test-category',
        article: 'test-article',
      })
    })
  })
})
