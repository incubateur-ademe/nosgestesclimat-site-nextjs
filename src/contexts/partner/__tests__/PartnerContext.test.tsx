import PartnerRedirectionAlert from '@/app/[locale]/(simulation)/(large-layout-nosticky)/fin/_components/PartnerRedirectionAlert'
import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { useExportSituation } from '@/hooks/partners/useExportSituation'
import { useVerifyPartner } from '@/hooks/partners/useVerifyPartner'
import '@testing-library/jest-dom'
import { act, screen, waitFor } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'

// Mock the hooks
jest.mock('@/hooks/partners/useExportSituation')
jest.mock('@/hooks/partners/useVerifyPartner')

// Les services API sont maintenant gérés par MSW dans src/__tests__/server.ts

// Mock Sentry to avoid issues in tests
jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
}))

// Mock the hooks with proper return values
const mockUseExportSituation = useExportSituation as jest.MockedFunction<
  typeof useExportSituation
>
const mockUseVerifyPartner = useVerifyPartner as jest.MockedFunction<
  typeof useVerifyPartner
>
const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>

// Mock sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true,
})

describe('PartnerContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSessionStorage.getItem.mockReturnValue(null)
    mockSessionStorage.setItem.mockImplementation(() => {})
    mockSessionStorage.removeItem.mockImplementation(() => {})
    mockSessionStorage.clear.mockImplementation(() => {})
  })

  const defaultSimulation = generateSimulation({
    progression: 1,
  })

  const redirectUrl = '/partner-site'

  describe('given undefined search params', () => {
    it('should not crash the app', () => {
      // Given
      mockUseSearchParams.mockReturnValue({
        entries: () => new Map().entries(),
        get: jest.fn(),
      } as any)
      mockUseVerifyPartner.mockReturnValue(false)
      mockUseExportSituation.mockReturnValue({
        exportSituationAsync: jest.fn().mockResolvedValue({ redirectUrl }),
        exportSituation: jest.fn(),
        isPending: false,
        isSuccess: false,
        isError: false,
        error: null,
        data: null,
      })

      // When
      act(() => {
        renderWithWrapper(<PartnerRedirectionAlert />, {
          providers: {
            partner: true,
            queryClient: true,
          },
        })
      })

      // Then
      expect(screen.queryByTestId('error-500')).not.toBeInTheDocument()
    })
  })

  describe('given a user with a completed test', () => {
    it("should send the user's situation to the back-end and redirect to the obtained URL", async () => {
      // Mock hooks
      mockUseSearchParams.mockReturnValue({
        entries: () =>
          new Map([
            ['partner', 'test'],
            ['partner-test', 'test'],
          ]).entries(),
        get: jest.fn(),
      } as any)
      mockUseVerifyPartner.mockReturnValue(true)
      mockUseExportSituation.mockReturnValue({
        exportSituationAsync: jest.fn().mockResolvedValue({ redirectUrl }),
        exportSituation: jest.fn(),
        isPending: false,
        isSuccess: false,
        isError: false,
        error: null,
        data: null,
      })

      // When
      act(() => {
        renderWithWrapper(<PartnerRedirectionAlert />, {
          providers: {
            partner: true,
            queryClient: true,
            user: true,
          },
          currentSimulation: defaultSimulation,
          simulations: [defaultSimulation],
        })
      })

      // Then
      const redirectButton = await screen.findByTestId('button-redirect')
      expect(redirectButton).toHaveAttribute('href', redirectUrl)
    })
  })

  describe('given a user with an incompleted test', () => {
    it('should save the partner params to the session storage and redirect to the test', async () => {
      // Given
      const incompleteSimulation = generateSimulation({
        progression: 0,
      })
      mockUseSearchParams.mockReturnValue({
        entries: () =>
          new Map([
            ['partner', 'test'],
            ['partner-test', 'test'],
          ]).entries(),
        get: jest.fn(),
      } as any)
      mockUseVerifyPartner.mockReturnValue(true)
      mockUseExportSituation.mockReturnValue({
        exportSituationAsync: jest.fn().mockResolvedValue({ redirectUrl }),
        exportSituation: jest.fn(),
        isPending: false,
        isSuccess: false,
        isError: false,
        error: null,
        data: null,
      })

      // When
      act(() => {
        renderWithWrapper(<PartnerRedirectionAlert />, {
          providers: {
            partner: true,
            queryClient: true,
            user: true,
          },
          currentSimulation: incompleteSimulation,
          simulations: [incompleteSimulation],
        })
      })

      // Then
      await waitFor(() => {
        expect(sessionStorage.getItem('partner')).not.toBe(undefined)
      })
    })
  })
})
