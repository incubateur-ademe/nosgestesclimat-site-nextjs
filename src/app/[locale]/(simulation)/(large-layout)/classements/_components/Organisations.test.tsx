import { useFetchPolls } from '@/hooks/organisations/polls/useFetchPolls'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Organisations from './Organisations'

jest.mock('axios')

// Mock useParams
jest.mock('next/navigation', () => ({
  useParams: () => ({
    orgaSlug: 'test-organisation',
  }),
}))

const mockOrganisations = [
  {
    id: '1',
    name: 'Test Organisation',
    description: 'Test Description',
    slug: 'test-organisation',
    administrators: [],
    polls: [],
    type: 'company',
    numberOfCollaborators: 10,
    hasCustomQuestionEnabled: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
]

// Mock useFetchOrganisations
const mockUseFetchOrganisations = jest.fn()
jest.mock('@/hooks/organisations/useFetchOrganisations', () => ({
  __esModule: true,
  default: () => mockUseFetchOrganisations(),
}))

// Mock useFetchPolls
jest.mock('@/hooks/organisations/polls/useFetchPolls', () => ({
  useFetchPolls: jest.fn(() => ({
    data: [
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
    ],
    isLoading: false,
    error: null,
  })),
}))

describe('Organisations', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseFetchOrganisations.mockReturnValue({
      data: mockOrganisations,
      isLoading: false,
      error: null,
    })
  })

  it('should show loading state initially', () => {
    mockUseFetchOrganisations.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      error: null,
    })

    render(<Organisations />, { wrapper })

    expect(screen.getByTestId('block-skeleton')).toBeInTheDocument()
  })

  it('should show organisations list when data is loaded', async () => {
    render(<Organisations />, { wrapper })

    await waitFor(() => {
      expect(screen.getByTestId('poll-list')).toBeInTheDocument()
    })
  })

  it('should show create organisation when no organisations exist', async () => {
    mockUseFetchOrganisations.mockReturnValueOnce({
      data: [],
      isLoading: false,
      error: null,
    })
    ;(useFetchPolls as jest.Mock).mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      error: null,
    })

    render(<Organisations />, { wrapper })

    await waitFor(() => {
      expect(screen.getByTestId('create-organisation')).toBeInTheDocument()
    })
  })

  it('should show error alert on error except unauthorized', async () => {
    mockUseFetchOrganisations.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      error: { status: 500 },
    })

    render(<Organisations />, { wrapper })

    expect(await screen.findByTestId('default-error-alert')).toBeInTheDocument()
  })

  it('should not show error alert on unauthorized error', () => {
    mockUseFetchOrganisations.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      error: { status: 401 },
    })

    render(<Organisations />, { wrapper })

    expect(screen.queryByTestId('default-error-alert')).not.toBeInTheDocument()
  })
})
