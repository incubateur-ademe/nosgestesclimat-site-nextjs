import { getPartnerFromStorage } from '@/helpers/partners/getPartnerFromStorage'
import { useExportSituation } from '@/hooks/partners/useExportSituation'
import { useVerifyPartner } from '@/hooks/partners/useVerifyPartner'
import { useCurrentSimulation } from '@/publicodes-state'
import { useRouter, useSearchParams } from 'next/navigation'
import { PartnerProvider } from '../PartnerContext'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'
import PartnerRedirectionAlert from '@/app/[locale]/(simulation)/(large-layout-nosticky)/fin/_components/PartnerRedirectionAlert'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

jest.mock('@/helpers/partners/getPartnerFromStorage', () => ({
  getPartnerFromStorage: jest.fn(),
}))

jest.mock('@/helpers/partners/removePartnerFromStorage', () => ({
  removePartnerFromStorage: jest.fn(),
}))

jest.mock('@/helpers/toasts/displayTimedSuccessToast', () => ({
  displayTimedSuccessToast: jest.fn((message, callback) => {
    callback()
  }),
}))

jest.mock('@/hooks/partners/useExportSituation', () => ({
  useExportSituation: jest.fn(),
}))

jest.mock('@/hooks/partners/useVerifyPartner', () => ({
  useVerifyPartner: jest.fn(),
}))

jest.mock('@/publicodes-state', () => ({
  useCurrentSimulation: jest.fn(),
}))

const setup = ({
  partner = 'some-partner',
  progression = 1,
  situation = { some: 'data' },
  redirectUrl = '/partner-site',
  isPartnerVerified = true,
} = {}) => {
  const mockPush = jest.fn()

  // Mock hooks
  ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
  ;(useSearchParams as jest.Mock).mockReturnValue({
    entries: () =>
      new Map([
        ['partner', partner],
        ['partner-test', 'test'],
      ]).entries(),
  })
  ;(getPartnerFromStorage as jest.Mock).mockReturnValue(null)
  ;(useCurrentSimulation as jest.Mock).mockReturnValue({
    progression,
    situation,
  })
  ;(useExportSituation as jest.Mock).mockReturnValue({
    exportSituationAsync: jest.fn().mockResolvedValue({ redirectUrl }),
  })
  ;(useVerifyPartner as jest.Mock).mockReturnValue(isPartnerVerified)

  return {
    mockPush,
    render: () =>
      render(
        <PartnerProvider>
          <PartnerRedirectionAlert />
        </PartnerProvider>
      ),
  }
}

describe('PartnerContext', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('given a user with a completed test', () => {
    it("should send the user's situation to the back-end and redirect to the obtained URL", async () => {
      // Given
      const { mockPush, render: renderComponent } = setup()

      // When
      renderComponent()

      // Wait for the button to appear and click it
      const redirectButton = await screen.findByTestId('button-redirect')

      // Verify the href attribute is correct
      expect(redirectButton).toHaveAttribute('href', '/partner-site')
    })
  })
  describe('given a user with an incompleted test', () => {
    it('should save the partner params to the session storage and redirect to the test', async () => {
      // Given
      const { mockPush, render: renderComponent } = setup({ progression: 0 })

      // When
      renderComponent()

      // Then
      await waitFor(() => {
        expect(sessionStorage.getItem('partner')).not.toBe(undefined)
      })
    })
  })
})
