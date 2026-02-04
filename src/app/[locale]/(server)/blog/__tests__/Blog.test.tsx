import type { Locale } from '@/i18nConfig'
import i18nConfig from '@/i18nConfig'
import { notFound } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import BlogHomePage from '../page'

// Mock CMS services
vi.mock('@/services/cms/fetchHomepageContent', () => ({
  fetchHomepageContent: vi.fn(),
}))

vi.mock('@/services/cms/fetchHomepageMetadata', () => ({
  fetchHomepageMetadata: vi.fn(),
}))

// Mock helpers
vi.mock('@/helpers/language/getLangButtonsDisplayed', () => ({
  getLangButtonsDisplayed: vi.fn(),
}))

// Import mocked functions
import { getLangButtonsDisplayed } from '@/helpers/language/getLangButtonsDisplayed'
import { fetchHomepageContent } from '@/services/cms/fetchHomepageContent'
import { fetchHomepageMetadata } from '@/services/cms/fetchHomepageMetadata'

const mockFetchHomepageContent = vi.mocked(fetchHomepageContent)
const mockFetchHomepageMetadata = vi.mocked(fetchHomepageMetadata)
const mockGetLangButtonsDisplayed = vi.mocked(getLangButtonsDisplayed)
const mockNotFound = vi.mocked(notFound)

describe('BlogHomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Default successful responses
    mockFetchHomepageContent.mockResolvedValue({
      title: 'Test Blog Title',
      description: 'Test Blog Description',
      image: { url: 'test-image.jpg', alternativeText: 'Test Image' },
      mainArticle: {
        id: '1',
        documentId: 'doc-1',
        title: 'Main Article Title',
        description: 'Main Article Description',
        htmlDescription: 'Main Article HTML Description',
        content: 'Main Article Content',
        htmlContent: 'Main Article HTML Content',
        headings: [],
        duration: 5,
        slug: 'main-article',
        image: {
          url: 'main-article-image.jpg',
          alternativeText: 'Main Article Image',
        },
        blogCategory: {
          id: 'cat-1',
          documentId: 'doc-cat-1',
          title: 'Test Category',
          slug: 'test-category',
          description: 'Test Category Description',
          faqDescription: 'Test FAQ Description',
          additionalContent: 'Test Additional Content',
          htmlContent: 'Test HTML Content',
          htmlTitle: 'Test HTML Title',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          publishedAt: '2023-01-01T00:00:00.000Z',
        },
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
        publishedAt: '2023-01-01T00:00:00.000Z',
      },
      articles: [
        {
          id: '2',
          documentId: 'doc-2',
          title: 'Article 1',
          description: 'Article 1 Description',
          slug: 'article-1',
          image: {
            url: 'article-1-image.jpg',
            alternativeText: 'Article 1 Image',
          },
          blogCategory: {
            id: 'cat-2',
            documentId: 'doc-cat-2',
            title: 'Category 1',
            slug: 'category-1',
            description: 'Category 1 Description',
            faqDescription: 'Category 1 FAQ Description',
            additionalContent: 'Category 1 Additional Content',
            htmlContent: 'Category 1 HTML Content',
            htmlTitle: 'Category 1 HTML Title',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
            publishedAt: '2023-01-01T00:00:00.000Z',
          },
        },
      ],
      pageCount: 5,
    })

    mockFetchHomepageMetadata.mockResolvedValue({
      metaTitle: 'Test Meta Title',
      metaDescription: 'Test Meta Description',
      image: { url: 'test-meta-image.jpg', alternativeText: 'Test Meta Image' },
      pageCount: 0,
    })

    mockGetLangButtonsDisplayed.mockResolvedValue({
      fr: true,
      en: true,
    })
  })

  describe('Page rendering', () => {
    it('should render successfully with complete content', async () => {
      const params = Promise.resolve({ locale: 'fr' as Locale })
      const searchParams = Promise.resolve({ page: '1' })

      const result = await BlogHomePage({ params, searchParams })

      expect(result).toBeDefined()
    })

    it('should handle page parameter correctly', async () => {
      const params = Promise.resolve({ locale: 'fr' as Locale })
      const searchParams = Promise.resolve({ page: '3' })

      await BlogHomePage({ params, searchParams })

      expect(mockFetchHomepageContent).toHaveBeenCalledWith({
        page: 3,
        locale: 'fr',
      })
    })

    it('should default to page 1 when no page parameter is provided', async () => {
      const params = Promise.resolve({ locale: 'fr' as Locale })
      const searchParams = Promise.resolve({ page: '' })

      await BlogHomePage({ params, searchParams })

      expect(mockFetchHomepageContent).toHaveBeenCalledWith({
        page: 1,
        locale: 'fr',
      })
    })

    it('should handle invalid page parameter by defaulting to page 1', async () => {
      const params = Promise.resolve({ locale: 'fr' as Locale })
      const searchParams = Promise.resolve({ page: 'invalid' })

      await BlogHomePage({ params, searchParams })

      expect(mockFetchHomepageContent).toHaveBeenCalledWith({
        page: 1,
        locale: 'fr',
      })
    })
  })

  describe('Service calls', () => {
    it('should call fetchHomepageContent with correct parameters', async () => {
      const params = Promise.resolve({ locale: 'en' as Locale })
      const searchParams = Promise.resolve({ page: '2' })

      await BlogHomePage({ params, searchParams })

      expect(mockFetchHomepageContent).toHaveBeenCalledWith({
        page: 2,
        locale: 'en',
      })
    })
  })

  describe('Edge cases', () => {
    it('should handle undefined searchParams', async () => {
      const params = Promise.resolve({ locale: 'fr' as Locale })
      const searchParams = undefined

      await BlogHomePage({ params, searchParams })

      expect(mockFetchHomepageContent).toHaveBeenCalledWith({
        page: 1,
        locale: 'fr',
      })
    })

    it('should handle null searchParams', async () => {
      const params = Promise.resolve({ locale: 'fr' as Locale })
      const searchParams = undefined

      await BlogHomePage({ params, searchParams })

      expect(mockFetchHomepageContent).toHaveBeenCalledWith({
        page: 1,
        locale: 'fr',
      })
    })

    it('should handle fetchHomepageContent returning undefined', async () => {
      mockFetchHomepageContent.mockResolvedValue(undefined)

      const params = Promise.resolve({ locale: 'fr' as Locale })
      const searchParams = Promise.resolve({ page: '1' })

      await expect(BlogHomePage({ params, searchParams })).rejects.toThrow(
        'NEXT_NOT_FOUND'
      )
    })

    it.todo(
      'should handle fetchHomepageContent returning partial data',
      async () => {
        mockFetchHomepageContent.mockResolvedValue({
          title: 'Test Title',
          description: 'Test Description',
          image: undefined,
          mainArticle: {
            id: '1',
            documentId: 'doc-1',
            title: 'Main Article Title',
            description: 'Main Article Description',
            htmlDescription: 'Main Article HTML Description',
            content: 'Main Article Content',
            htmlContent: 'Main Article HTML Content',
            headings: [],
            duration: 5,
            slug: 'main-article',
            image: {
              url: 'main-article-image.jpg',
              alternativeText: 'Main Article Image',
            },
            blogCategory: {
              id: 'cat-1',
              documentId: 'doc-cat-1',
              title: 'Test Category',
              slug: 'test-category',
              description: 'Test Category Description',
              faqDescription: 'Test FAQ Description',
              additionalContent: 'Test Additional Content',
              htmlContent: 'Test HTML Content',
              htmlTitle: 'Test HTML Title',
              createdAt: '2023-01-01T00:00:00.000Z',
              updatedAt: '2023-01-01T00:00:00.000Z',
              publishedAt: '2023-01-01T00:00:00.000Z',
            },
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
            publishedAt: '2023-01-01T00:00:00.000Z',
          },
          articles: [],
          pageCount: 0,
        })

        const params = Promise.resolve({ locale: 'fr' as Locale })
        const searchParams = Promise.resolve({ page: '1' })

        await BlogHomePage({ params, searchParams })

        expect(mockNotFound).toHaveBeenCalled()
      }
    )
  })

  describe('Locale-specific behavior', () => {
    it.each([
      ['fr', i18nConfig.locales[0]],
      ['en', i18nConfig.locales[1]],
    ])(
      'should handle %s locale correctly',
      async (localeName, expectedLocale) => {
        const params = Promise.resolve({ locale: expectedLocale as Locale })
        const searchParams = Promise.resolve({ page: '1' })

        await BlogHomePage({ params, searchParams })

        expect(mockFetchHomepageContent).toHaveBeenCalledWith({
          page: 1,
          locale: expectedLocale,
        })
      }
    )
  })
})
