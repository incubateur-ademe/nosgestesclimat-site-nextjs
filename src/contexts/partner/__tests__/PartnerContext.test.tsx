import PartnerRedirectionAlert from '@/app/[locale]/(simulation)/(large-layout-nosticky)/fin/_components/PartnerRedirectionAlert'
import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { useExportSituation } from '@/hooks/partners/useExportSituation'
import { useVerifyPartner } from '@/hooks/partners/useVerifyPartner'
import '@testing-library/jest-dom'
import { act, screen, waitFor } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'

jest.mock('@/hooks/partners/useExportSituation', () => ({
  useExportSituation: jest.fn(),
}))

jest.mock('@/hooks/partners/useVerifyPartner', () => ({
  useVerifyPartner: jest.fn(),
}))

describe('PartnerContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const defaultSimulation = generateSimulation({
    progression: 1,
  })

  const redirectUrl = '/partner-site'

  describe('given undefined search params', () => {
    it('should not crash the app', () => {
      // Given
      ;(useExportSituation as jest.Mock).mockReturnValue({
        exportSituationAsync: jest.fn().mockResolvedValue({ redirectUrl }),
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
      ;(useSearchParams as jest.Mock).mockReturnValue({
        entries: () =>
          new Map([
            ['partner', 'test'],
            ['partner-test', 'test'],
          ]).entries(),
      })
      ;(useVerifyPartner as jest.Mock).mockReturnValue(true)
      ;(useExportSituation as jest.Mock).mockReturnValue({
        exportSituationAsync: jest.fn().mockResolvedValue({ redirectUrl }),
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
      ;(useSearchParams as jest.Mock).mockReturnValue({
        entries: () =>
          new Map([
            ['partner', 'test'],
            ['partner-test', 'test'],
          ]).entries(),
      })
      ;(useVerifyPartner as jest.Mock).mockReturnValue(true)
      ;(useExportSituation as jest.Mock).mockReturnValue({
        exportSituationAsync: jest.fn().mockResolvedValue({ redirectUrl }),
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
