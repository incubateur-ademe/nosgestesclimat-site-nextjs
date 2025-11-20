import DocumentationPage from '@/app/[locale]/documentation/[...slug]/page'
import type { Locale } from '@/i18nConfig'
import type { DefaultPageProps } from '@/types'
import type { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock dependencies
vi.mock('@/helpers/modelFetching/getRules', () => ({
  getRules: vi.fn(),
}))

vi.mock('@/helpers/modelFetching/getSupportedRegions', () => ({
  getSupportedRegions: vi.fn(() => ['FR', 'BE']),
}))

vi.mock('@/utils/decodeRuleNameFromPath', () => ({
  decodeRuleNameFromPath: vi.fn(),
}))

vi.mock('@/constants/urls/paths', () => ({
  DOCUMENTATION_PATH: '/documentation',
  SIMULATOR_PATH: '/simulateur',
}))

vi.mock(
  '@/app/[locale]/documentation/[...slug]/_components/DocumentationRouter',
  () => ({
    default: vi.fn(({ supportedRegions, slug, serverComponent }) => (
      <div data-testid="documentation-router">
        <div data-testid="supported-regions">
          {JSON.stringify(supportedRegions)}
        </div>
        <div data-testid="slug">{JSON.stringify(slug)}</div>
        <div data-testid="server-component">{serverComponent}</div>
      </div>
    )),
  })
)

vi.mock(
  '@/app/[locale]/documentation/[...slug]/_components/documentationRouter/DocumentationServer',
  () => ({
    default: vi.fn(({ locale, ruleName, rule, rules }) => (
      <div data-testid="documentation-server">
        <div data-testid="locale">{locale}</div>
        <div data-testid="rule-name">{ruleName}</div>
        <div data-testid="rule-title">{rule?.titre}</div>
        <div data-testid="rules-count">{Object.keys(rules || {}).length}</div>
      </div>
    )),
  })
)

// Import mocked functions
import { getRules } from '@/helpers/modelFetching/getRules'
import { decodeRuleNameFromPath } from '@/utils/decodeRuleNameFromPath'
import { redirect } from 'next/navigation'

const mockGetRules = getRules as any
const mockDecodeRuleNameFromPath = decodeRuleNameFromPath as any
const mockRedirect = redirect as any

describe('DocumentationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const createMockParams = (
    slug: string[]
  ): DefaultPageProps<{ params: { slug: string[] } }>['params'] =>
    Promise.resolve({ locale: 'fr' as Locale, slug })

  const createMockRules = (): Partial<NGCRules> => ({
    transport: null,
    'transport . voiture': {
      titre: 'Voiture',
      description: "Calcul de l'empreinte voiture",
      icônes: '🚗',
      formule: '2 * 3',
    },
    'alimentation . plats': {
      titre: 'Plats',
      description: "Calcul de l'empreinte alimentaire",
      icônes: '🍽️',
      formule: '1 + 1',
    },
  })

  it('should render DocumentationRouter with correct props when rule exists', async () => {
    const mockRules = createMockRules()
    const slug = ['transport', 'voiture']
    const ruleName = 'transport . voiture' as DottedName

    mockGetRules.mockResolvedValue(mockRules)
    mockDecodeRuleNameFromPath.mockReturnValue(ruleName)

    const params = createMockParams(slug)

    const result = await DocumentationPage({ params })
    render(result)

    expect(mockGetRules).toHaveBeenCalledWith({
      isOptim: false,
      locale: 'fr',
      regionCode: 'FR',
    })

    expect(mockDecodeRuleNameFromPath).toHaveBeenCalledWith('transport/voiture')

    expect(screen.getByTestId('documentation-router')).toBeInTheDocument()
    expect(screen.getByTestId('supported-regions')).toHaveTextContent(
      '["FR","BE"]'
    )
    expect(screen.getByTestId('slug')).toHaveTextContent(
      '["transport","voiture"]'
    )

    expect(screen.getByTestId('documentation-server')).toBeInTheDocument()
    expect(screen.getByTestId('locale')).toHaveTextContent('fr')
    expect(screen.getByTestId('rule-name')).toHaveTextContent(
      'transport . voiture'
    )
    expect(screen.getByTestId('rule-title')).toHaveTextContent('Voiture')
    expect(screen.getByTestId('rules-count')).toHaveTextContent('3')
  })

  it('should render DocumentationRouter with correct props when rule exists but is empty', async () => {
    const mockRules = createMockRules()
    const slug = ['transport']
    const ruleName = 'transport' as DottedName

    mockGetRules.mockResolvedValue(mockRules)
    mockDecodeRuleNameFromPath.mockReturnValue(ruleName)

    const params = createMockParams(slug)

    const result = await DocumentationPage({ params })
    render(result)

    expect(mockGetRules).toHaveBeenCalledWith({
      isOptim: false,
      locale: 'fr',
      regionCode: 'FR',
    })

    expect(mockDecodeRuleNameFromPath).toHaveBeenCalledWith('transport')

    expect(screen.getByTestId('documentation-router')).toBeInTheDocument()
    expect(screen.getByTestId('supported-regions')).toHaveTextContent(
      '["FR","BE"]'
    )
    expect(screen.getByTestId('slug')).toHaveTextContent('["transport"]')

    expect(screen.getByTestId('documentation-server')).toBeInTheDocument()
    expect(screen.getByTestId('locale')).toHaveTextContent('fr')
    expect(screen.getByTestId('rule-name')).toHaveTextContent('transport')
    expect(screen.getByTestId('rules-count')).toHaveTextContent('3')
  })

  it('should redirect to DOCUMENTATION_PATH when rule does not exist', async () => {
    const slug = ['transport', 'voiture']
    const ruleName = 'transport . voiture' as DottedName

    mockGetRules.mockResolvedValue({})
    mockDecodeRuleNameFromPath.mockReturnValue(ruleName)

    const params = createMockParams(slug)

    await DocumentationPage({ params })

    expect(mockRedirect).toHaveBeenCalledWith('/documentation')
  })

  it('should redirect to DOCUMENTATION_PATH when rules is null', async () => {
    const slug = ['transport', 'voiture']
    const ruleName = 'transport . voiture' as DottedName

    mockGetRules.mockResolvedValue(null)
    mockDecodeRuleNameFromPath.mockReturnValue(ruleName)

    const params = createMockParams(slug)

    await DocumentationPage({ params })

    expect(mockRedirect).toHaveBeenCalledWith('/documentation')
  })

  it('should handle empty slug array', async () => {
    const slug: string[] = []
    const ruleName = 'bilan' as DottedName

    mockGetRules.mockResolvedValue(createMockRules())
    mockDecodeRuleNameFromPath.mockReturnValue(ruleName)

    const params = createMockParams(slug)

    const result = await DocumentationPage({ params })
    const { container } = render(result)

    expect(mockDecodeRuleNameFromPath).toHaveBeenCalledWith('')
    expect(screen.getByTestId('documentation-router')).toBeInTheDocument()
  })

  it('should handle complex slug with special characters', async () => {
    const slug = ['alimentation', 'plats', 'avec-espaces']
    const ruleName = 'alimentation . plats . avec espaces' as DottedName

    mockGetRules.mockResolvedValue(createMockRules())
    mockDecodeRuleNameFromPath.mockReturnValue(ruleName)

    const params = createMockParams(slug)

    const result = await DocumentationPage({ params })
    const { container } = render(result)

    expect(mockDecodeRuleNameFromPath).toHaveBeenCalledWith(
      'alimentation/plats/avec-espaces'
    )
    expect(screen.getByTestId('documentation-router')).toBeInTheDocument()
  })

  it('should handle different locales', async () => {
    const mockRules = createMockRules()
    const slug = ['transport', 'voiture']
    const ruleName = 'transport . voiture' as DottedName

    mockGetRules.mockResolvedValue(mockRules)
    mockDecodeRuleNameFromPath.mockReturnValue(ruleName)

    const params = Promise.resolve({ locale: 'en' as Locale, slug })

    const result = await DocumentationPage({ params })
    const { container } = render(result)

    expect(mockGetRules).toHaveBeenCalledWith({
      isOptim: false,
      locale: 'en',
      regionCode: 'FR',
    })

    expect(screen.getByTestId('locale')).toHaveTextContent('en')
  })
})
