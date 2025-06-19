import PartnerRedirectionAlert from '@/app/[locale]/(simulation)/(large-layout-nosticky)/fin/_components/PartnerRedirectionAlert'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { useExportSituation } from '@/hooks/partners/useExportSituation'
import { useVerifyPartner } from '@/hooks/partners/useVerifyPartner'
import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import { useRouter, useSearchParams } from 'next/navigation'

jest.mock('@/hooks/partners/useExportSituation', () => ({
  useExportSituation: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

jest.mock('@/hooks/partners/useVerifyPartner', () => ({
  useVerifyPartner: jest.fn(),
}))

describe('PartnerContext', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  const redirectUrl = '/partner-site'

  // describe('given undefined search params', () => {
  //   it('should not crash the app', () => {
  //     // Given
  //     ;(useExportSituation as jest.Mock).mockReturnValue({
  //       exportSituationAsync: jest.fn().mockResolvedValue({ redirectUrl }),
  //     })

  //     // When
  //     act(() => {
  //       renderWithWrapper(<PartnerRedirectionAlert />, {
  //         providers: {
  //           partner: true,
  //           queryClient: true,
  //         },
  //       })
  //     })

  //     // Then
  //     expect(screen.queryByTestId('error-500')).not.toBeInTheDocument()
  //   })
  // })
  describe('given a user with a completed test', () => {
    it("should send the user's situation to the back-end and redirect to the obtained URL", async () => {
      const mockPush = jest.fn()
      // Mock hooks
      ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
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
          currentSimulation: {
            progression: 1,
          },
        })
      })

      // Then
      const redirectButton = await screen.findByTestId('button-redirect')
      expect(redirectButton).toHaveAttribute('href', redirectUrl)
    })
  })
  // describe('given a user with an incompleted test', () => {
  //   it('should save the partner params to the session storage and redirect to the test', async () => {
  //     // Given
  //     const { mockPush, render: renderComponent } = setup({ progression: 0 })

  //     // When
  //     // eslint-disable-next-line @typescript-eslint/require-await
  //     await act(async () => {
  //       renderComponent()
  //     })

  //     // Then
  //     await waitFor(() => {
  //       expect(sessionStorage.getItem('partner')).not.toBe(undefined)
  //     })
  //   })
  // })
})
