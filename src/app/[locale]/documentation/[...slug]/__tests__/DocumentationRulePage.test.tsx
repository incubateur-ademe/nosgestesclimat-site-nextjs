import { DOCUMENTATION_PATH } from '@/constants/urls/paths'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getRules } from '@/helpers/modelFetching/getRules'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { capitalizeString } from '@/utils/capitalizeString'
import { decodeRuleNameFromPath } from '@/utils/decodeRuleNameFromPath'
import { render } from '@testing-library/react'
import { redirect } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import DocumentationPage from '../page'

// Mock all dependencies
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

vi.mock('@/helpers/getServerTranslation', () => ({
  getServerTranslation: vi.fn(),
}))

vi.mock('@/helpers/metadata/getMetadataObject', () => ({
  getMetadataObject: vi.fn(),
}))

vi.mock('@/helpers/modelFetching/getRules', () => ({
  getRules: vi.fn(),
}))

vi.mock('@/helpers/modelFetching/getSupportedRegions', () => ({
  getSupportedRegions: vi.fn(),
}))

vi.mock('@/helpers/publicodes/getRuleTitle', () => ({
  getRuleTitle: vi.fn(),
}))

vi.mock('@/utils/capitalizeString', () => ({
  capitalizeString: vi.fn(),
}))

vi.mock('@/utils/decodeRuleNameFromPath', () => ({
  decodeRuleNameFromPath: vi.fn(),
}))

vi.mock('../_components/DocumentationRouter', () => ({
  default: ({ children, supportedRegions, slug, serverComponent }: any) => (
    <div
      data-testid="documentation-router"
      data-supported-regions={JSON.stringify(supportedRegions)}
      data-slug={JSON.stringify(slug)}>
      {serverComponent}
    </div>
  ),
}))

vi.mock('../_components/documentationRouter/DocumentationServer', () => ({
  default: ({ locale, ruleName, rule, rules }: any) => (
    <div
      data-testid="documentation-server"
      data-locale={locale}
      data-rule-name={ruleName}
      data-rule={JSON.stringify(rule)}
      data-rules={JSON.stringify(rules)}
    />
  ),
}))

const mockGetServerTranslation = vi.mocked(getServerTranslation)
const mockGetMetadataObject = vi.mocked(getMetadataObject)
const mockGetRules = vi.mocked(getRules)
const mockGetSupportedRegions = vi.mocked(getSupportedRegions)
const mockGetRuleTitle = vi.mocked(getRuleTitle)
const mockCapitalizeString = vi.mocked(capitalizeString)
const mockDecodeRuleNameFromPath = vi.mocked(decodeRuleNameFromPath)
const mockRedirect = vi.mocked(redirect)

describe('DocumentationPage', () => {
  const mockParams = {
    locale: 'fr' as const,
    slug: ['transport', 'voiture'],
  }

  const mockRules = {
    'transport . voiture': {
      titre: 'Voiture',
      question: 'Utilisez-vous une voiture ?',
      formule: 'oui',
    },
    'transport . train': {
      titre: 'Train',
      question: 'Prenez-vous le train ?',
      formule: 'non',
    },
  }

  const mockSupportedRegions = ['FR', 'BE', 'CH']

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup default mocks
    mockGetServerTranslation.mockResolvedValue({
      t: (key: string, options?: any) => {
        if (options?.ruleTitle) {
          return key.replace('{{ruleTitle}}', options.ruleTitle)
        }
        return key
      },
    } as any)

    mockGetMetadataObject.mockReturnValue({
      title: 'Test Title',
      description: 'Test Description',
      alternates: null,
    } as any)

    mockGetRules.mockResolvedValue(mockRules)
    mockGetSupportedRegions.mockReturnValue(mockSupportedRegions as any)
    mockGetRuleTitle.mockReturnValue('Voiture')
    mockCapitalizeString.mockReturnValue('Voiture')
    mockDecodeRuleNameFromPath.mockReturnValue('transport . voiture' as any)
  })

  describe('DocumentationPage', () => {
    it('should render documentation page with valid rule', async () => {
      const params = Promise.resolve(mockParams)

      const result = await DocumentationPage({ params })

      expect(mockGetSupportedRegions).toHaveBeenCalled()
      expect(mockGetRules).toHaveBeenCalledWith({
        isOptim: false,
        locale: 'fr',
        regionCode: 'FR',
      })
      expect(mockDecodeRuleNameFromPath).toHaveBeenCalledWith(
        'transport/voiture'
      )

      // Check that redirect was not called
      expect(mockRedirect).not.toHaveBeenCalled()

      // Render the component to verify structure
      const { getByTestId } = render(result)

      expect(getByTestId('documentation-router')).toBeInTheDocument()
      expect(getByTestId('documentation-server')).toBeInTheDocument()
    })

    it('should redirect to documentation path when rule name is invalid', async () => {
      mockDecodeRuleNameFromPath.mockReturnValue(null as any)

      const params = Promise.resolve(mockParams)

      await DocumentationPage({ params })

      expect(mockRedirect).toHaveBeenCalledWith(DOCUMENTATION_PATH)
    })

    it('should redirect to documentation path when rule does not exist in rules', async () => {
      mockDecodeRuleNameFromPath.mockReturnValue('inexistant . regle' as any)

      const params = Promise.resolve(mockParams)

      await DocumentationPage({ params })

      expect(mockRedirect).toHaveBeenCalledWith(DOCUMENTATION_PATH)
    })

    it('should handle empty rules gracefully', async () => {
      mockGetRules.mockResolvedValue({})

      const params = Promise.resolve(mockParams)

      await DocumentationPage({ params })

      expect(mockRedirect).toHaveBeenCalledWith(DOCUMENTATION_PATH)
    })

    it('should handle different locales correctly', async () => {
      const params = Promise.resolve({
        ...mockParams,
        locale: 'en' as const,
      })

      await DocumentationPage({ params })

      expect(mockGetRules).toHaveBeenCalledWith({
        isOptim: false,
        locale: 'en',
        regionCode: 'FR',
      })
    })
  })
})
