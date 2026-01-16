import type { Locale } from '@/i18nConfig'
import { redirect } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CategoryPage from '../page'

// Mock CMS services
vi.mock('@/services/cms/fetchCategoryPageContent', () => ({
  fetchCategoryPageContent: vi.fn(),
}))
vi.mock('@/services/cms/fetchCategoryPageMetadata', () => ({
  fetchCategoryPageMetadata: vi.fn(),
}))

// Mock helpers
vi.mock('@/helpers/language/getLangButtonsDisplayed', () => ({
  getLangButtonsDisplayed: vi.fn(),
}))

import { getLangButtonsDisplayed } from '@/helpers/language/getLangButtonsDisplayed'
import { fetchCategoryPageContent } from '@/services/cms/fetchCategoryPageContent'
import { fetchCategoryPageMetadata } from '@/services/cms/fetchCategoryPageMetadata'

const mockFetchCategoryPageContent = vi.mocked(fetchCategoryPageContent)
const mockFetchCategoryPageMetadata = vi.mocked(fetchCategoryPageMetadata)
const mockGetLangButtonsDisplayed = vi.mocked(getLangButtonsDisplayed)
const mockRedirect = vi.mocked(redirect)

describe('CategoryPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchCategoryPageContent.mockResolvedValue({
      title: 'Category Title',
      description: 'Category Description',
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
      pageCount: 3,
      faq: {
        title: 'FAQ Title',
        order: 0,
        questions: [
          {
            id: 'q1',
            documentId: 'doc-q1',
            question: 'Q1',
            htmlAnswer: 'A1',
            answer: 'A1',
            order: 1,
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
            publishedAt: '2023-01-01T00:00:00.000Z',
          },
        ],
      },
      faqDescription: 'FAQ desc',
      additionalContent: 'Some content',
      image: { url: 'img.jpg', alternativeText: 'img' },
    })
    mockFetchCategoryPageMetadata.mockResolvedValue({
      metaTitle: 'Meta Title',
      metaDescription: 'Meta Desc',
      image: { url: 'meta.jpg', alternativeText: 'meta' },
      pageCount: 0,
    })
    mockGetLangButtonsDisplayed.mockResolvedValue({
      fr: true,
      en: true,
    })
  })

  describe('Redirections', () => {
    it('should redirect to FR if not FR and missing title', async () => {
      mockFetchCategoryPageContent.mockResolvedValue({
        title: undefined,
        description: 'desc',
        mainArticle: undefined,
        articles: [],
        pageCount: 0,
      })
      const params = Promise.resolve({
        category: 'cat',
        locale: 'en' as Locale,
      })
      const searchParams = Promise.resolve({ page: '1' })
      await CategoryPage({ params, searchParams })
      expect(mockRedirect).toHaveBeenCalledWith('/fr/blog/cat')
    })
    it('should redirect to FR if not FR and missing description', async () => {
      mockFetchCategoryPageContent.mockResolvedValue({
        title: 'title',
        description: undefined,
        mainArticle: undefined,
        articles: [],
        pageCount: 0,
      })
      const params = Promise.resolve({
        category: 'cat',
        locale: 'en' as Locale,
      })
      const searchParams = Promise.resolve({ page: '1' })
      await CategoryPage({ params, searchParams })
      expect(mockRedirect).toHaveBeenCalledWith('/fr/blog/cat')
    })
    it('should redirect to NOT_FOUND_PATH if FR and missing title', async () => {
      mockFetchCategoryPageContent.mockResolvedValue({
        title: undefined,
        description: 'desc',
        mainArticle: undefined,
        articles: [],
        pageCount: 0,
      })
      const params = Promise.resolve({
        category: 'cat',
        locale: 'fr' as Locale,
      })
      const searchParams = Promise.resolve({ page: '1' })
      await expect(CategoryPage({ params, searchParams })).rejects.toThrow(
        'NEXT_NOT_FOUND'
      )
    })
    it('should redirect to NOT_FOUND_PATH if FR and missing description', async () => {
      mockFetchCategoryPageContent.mockResolvedValue({
        title: 'title',
        description: undefined,
        mainArticle: undefined,
        articles: [],
        pageCount: 0,
      })
      const params = Promise.resolve({
        category: 'cat',
        locale: 'fr' as Locale,
      })
      const searchParams = Promise.resolve({ page: '1' })
      await expect(CategoryPage({ params, searchParams })).rejects.toThrow(
        'NEXT_NOT_FOUND'
      )
    })
    it('should redirect to NOT_FOUND_PATH if missing title in any locale', async () => {
      mockFetchCategoryPageContent.mockResolvedValue({
        title: undefined,
        description: 'desc',
        mainArticle: undefined,
        articles: [],
        pageCount: 0,
      })
      const params = Promise.resolve({
        category: 'cat',
        locale: 'en' as Locale,
      })
      const searchParams = Promise.resolve({ page: '1' })
      await CategoryPage({ params, searchParams })
      expect(mockRedirect).toHaveBeenCalledWith('/fr/blog/cat')
    })
    it('should redirect to NOT_FOUND_PATH if missing description in any locale', async () => {
      mockFetchCategoryPageContent.mockResolvedValue({
        title: 'title',
        description: undefined,
        mainArticle: undefined,
        articles: [],
        pageCount: 0,
      })
      const params = Promise.resolve({
        category: 'cat',
        locale: 'en' as Locale,
      })
      const searchParams = Promise.resolve({ page: '1' })
      await CategoryPage({ params, searchParams })
      expect(mockRedirect).toHaveBeenCalledWith('/fr/blog/cat')
    })
  })

  describe('Rendering', () => {
    it('should render successfully with complete content', async () => {
      const params = Promise.resolve({
        category: 'cat',
        locale: 'fr' as Locale,
      })
      const searchParams = Promise.resolve({ page: '1' })
      const result = await CategoryPage({ params, searchParams })
      expect(result).toBeDefined()
    })
    it('should handle page parameter correctly', async () => {
      const params = Promise.resolve({
        category: 'cat',
        locale: 'fr' as Locale,
      })
      const searchParams = Promise.resolve({ page: '3' })
      await CategoryPage({ params, searchParams })
      expect(mockFetchCategoryPageContent).toHaveBeenCalledWith({
        slug: 'cat',
        page: 3,
        locale: 'fr',
      })
    })
    it('should default to page 1 when no page parameter is provided', async () => {
      const params = Promise.resolve({
        category: 'cat',
        locale: 'fr' as Locale,
      })
      const searchParams = Promise.resolve({ page: '' })
      await CategoryPage({ params, searchParams })
      expect(mockFetchCategoryPageContent).toHaveBeenCalledWith({
        slug: 'cat',
        page: 1,
        locale: 'fr',
      })
    })
    it('should handle undefined searchParams', async () => {
      const params = Promise.resolve({
        category: 'cat',
        locale: 'fr' as Locale,
      })
      const searchParams = undefined
      await CategoryPage({ params, searchParams })
      expect(mockFetchCategoryPageContent).toHaveBeenCalledWith({
        slug: 'cat',
        page: 1,
        locale: 'fr',
      })
    })
  })
})
