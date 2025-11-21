import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import Organisations from './Organisations'

vi.mock('axios')

vi.mock('@/hooks/organisations/useFetchOrganisations', () => ({
  default: vi.fn(),
}))

vi.mock('@/hooks/organisations/polls/useFetchPolls', () => ({
  useFetchPolls: vi.fn(),
}))

const mockOrganisations = [
  {
    id: '1',
    name: 'Test Organisation 1',
    slug: 'test-org-1',
    description: 'Test Description 1',
    logo: 'test-logo-1.png',
    website: 'https://test1.com',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Test Organisation 2',
    slug: 'test-org-2',
    description: 'Test Description 2',
    logo: 'test-logo-2.png',
    website: 'https://test2.com',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
  },
]

const mockPolls = [
  {
    id: '1',
    name: 'Test Poll',
    slug: 'test-poll',
    description: 'Test Poll Description',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    organisationId: '1',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
]

describe('Organisations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should show loading state initially', async () => {
    const useFetchOrganisations = (
      await import('@/hooks/organisations/useFetchOrganisations')
    ).default
    ;(useFetchOrganisations as any).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    })

    render(<Organisations />)

    expect(screen.getByTestId('block-skeleton')).toBeInTheDocument()
  })

  it('should show organisations list when data is loaded', async () => {
    const useFetchOrganisations = (
      await import('@/hooks/organisations/useFetchOrganisations')
    ).default
    const { useFetchPolls } = await import(
      '@/hooks/organisations/polls/useFetchPolls'
    )

    ;(useFetchOrganisations as any).mockReturnValue({
      data: mockOrganisations,
      isLoading: false,
      error: null,
    })
    ;(useFetchPolls as any).mockReturnValue({
      data: mockPolls,
      isLoading: false,
      error: null,
    })

    render(<Organisations />)

    await screen.findByTestId('poll-list')
  })

  it('should show create organisation when no organisations exist', async () => {
    const useFetchOrganisations = (
      await import('@/hooks/organisations/useFetchOrganisations')
    ).default
    const { useFetchPolls } = await import(
      '@/hooks/organisations/polls/useFetchPolls'
    )

    ;(useFetchOrganisations as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    })
    ;(useFetchPolls as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    })

    render(<Organisations />)

    expect(screen.getByTestId('create-organisation')).toBeInTheDocument()
  })

  it('should show error alert on error except unauthorized', async () => {
    const useFetchOrganisations = (
      await import('@/hooks/organisations/useFetchOrganisations')
    ).default
    ;(useFetchOrganisations as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 500, message: 'Internal Server Error' },
    })

    render(<Organisations />)

    expect(screen.getByTestId('default-error-alert')).toBeInTheDocument()
  })

  it('should not show error alert on unauthorized error', async () => {
    const useFetchOrganisations = (
      await import('@/hooks/organisations/useFetchOrganisations')
    ).default
    ;(useFetchOrganisations as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 401, message: 'Unauthorized' },
    })

    render(<Organisations />)

    expect(screen.queryByTestId('default-error-alert')).not.toBeInTheDocument()
  })

  it('should render polls when available', async () => {
    const useFetchOrganisations = (
      await import('@/hooks/organisations/useFetchOrganisations')
    ).default
    const { useFetchPolls } = await import(
      '@/hooks/organisations/polls/useFetchPolls'
    )

    ;(useFetchOrganisations as any).mockReturnValue({
      data: mockOrganisations,
      isLoading: false,
      error: null,
    })
    ;(useFetchPolls as any).mockReturnValue({
      data: mockPolls,
      isLoading: false,
      error: null,
    })

    render(<Organisations />)

    expect(screen.getByTestId('poll-list')).toBeInTheDocument()
  })
})
