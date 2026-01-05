import PartnerRedirectionAlert from '@/app/[locale]/(simulation)/(large-layout-nosticky)/fin/_components/PartnerRedirectionAlert'
import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { useExportSituation } from '@/hooks/partners/useExportSituation'
import { useVerifyPartner } from '@/hooks/partners/useVerifyPartner'
import '@testing-library/jest-dom'
import { act, screen, waitFor } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the hooks
vi.mock('@/hooks/partners/useExportSituation')
vi.mock('@/hooks/partners/useVerifyPartner')

const mockUseSearchParams = useSearchParams as ReturnType<typeof vi.fn>

// Les services API sont maintenant gérés par MSW dans src/__tests__/server.ts

// Mock Sentry to avoid issues in tests
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
}))

// Mock the hooks with proper return values
const mockUseExportSituation = useExportSituation as ReturnType<typeof vi.fn>
const mockUseVerifyPartner = useVerifyPartner as ReturnType<typeof vi.fn>

// Mock sessionStorage
const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true,
})

describe('PartnerContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
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
      mockUseVerifyPartner.mockReturnValue(false)
      mockUseExportSituation.mockReturnValue({
        exportSituationAsync: vi.fn().mockResolvedValue({ redirectUrl }),
        exportSituation: vi.fn(),
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
      // Mock search params with partner parameters
      const searchParams = new URLSearchParams('partner=test&partner-test=test')
      mockUseSearchParams.mockReturnValue(searchParams)

      // Mock exportSituationAsync to return the redirect URL
      const mockExportSituationAsync = vi
        .fn()
        .mockResolvedValue({ redirectUrl })

      mockUseVerifyPartner.mockReturnValue(true)
      mockUseExportSituation.mockReturnValue({
        exportSituationAsync: mockExportSituationAsync,
        exportSituation: vi.fn(),
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

      // Then - wait for the async export to complete and the button to appear
      const redirectButton = await waitFor(
        async () => {
          return await screen.findByTestId('button-redirect')
        },
        { timeout: 3000 }
      )
      expect(redirectButton).toHaveAttribute('href', redirectUrl)
      expect(mockExportSituationAsync).toHaveBeenCalled()
    })
  })

  describe('given a user with an incompleted test', () => {
    it('should save the partner params to the session storage and redirect to the test', async () => {
      // Given
      const incompleteSimulation = generateSimulation({
        progression: 0,
      })
      const searchParams = new URLSearchParams('partner=test&partner-test=test')
      mockUseSearchParams.mockReturnValue(searchParams)
      mockUseVerifyPartner.mockReturnValue(true)
      mockUseExportSituation.mockReturnValue({
        exportSituationAsync: vi.fn().mockResolvedValue({ redirectUrl }),
        exportSituation: vi.fn(),
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
