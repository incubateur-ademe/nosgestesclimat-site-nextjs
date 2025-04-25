import { PARTNER_KEY } from '@/constants/partners'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { useCurrentSimulation } from '@/publicodes-state'
import { verifyPartner } from '@/services/partners/verifyPartner'
import '@testing-library/jest-dom'
import { act, screen, waitFor } from '@testing-library/react'
import { redirect } from 'next/navigation'
import PartnerPage from '../page'

// Mock the verifyPartner function
jest.mock('@/services/partners/verifyPartner', () => ({
  verifyPartner: jest.fn(),
}))

describe('PartnerPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display a message indicating the upcoming redirection if user has a simulation', async () => {
    // Given
    ;(verifyPartner as jest.Mock).mockResolvedValue({ name: 'Test Partner' })

    const searchParams = Promise.resolve({
      [PARTNER_KEY]: 'test-partner',
    })
    const params = Promise.resolve({ locale: 'fr' })

    // When
    await act(async () => {
      renderWithWrapper(await PartnerPage({ params, searchParams }), {
        currentSimulation: {
          progression: 1,
        },
      })
    })

    // Then
    await waitFor(() => {
      expect(screen.getByTestId('redirection-message')).toBeInTheDocument()
    })
  })

  it('should redirect to /404 if no partner search param is provided', async () => {
    // Given
    const searchParams = Promise.resolve({})
    const params = Promise.resolve({ locale: 'fr' })

    // When
    await act(async () => {
      renderWithWrapper(await PartnerPage({ params, searchParams }))
    })

    // Then
    expect(redirect).toHaveBeenCalledWith('/404')
  })

  it("should redirect to /404 if the partner isn't verified", async () => {
    // Given
    ;(verifyPartner as jest.Mock).mockResolvedValue(null)

    const searchParams = Promise.resolve({
      [PARTNER_KEY]: 'invalid-partner',
    })
    const params = Promise.resolve({ locale: 'fr' })

    // When
    await act(async () => {
      renderWithWrapper(await PartnerPage({ params, searchParams }))
    })

    // Then
    expect(redirect).toHaveBeenCalledWith('/404')
  })

  it("should redirect to /simulateur/bilan if the user hasn't completed his/her test", async () => {
    // Given
    ;(verifyPartner as jest.Mock).mockResolvedValue({ name: 'Test Partner' })

    const searchParams = Promise.resolve({
      [PARTNER_KEY]: 'test-partner',
    })
    const params = Promise.resolve({ locale: 'fr' })

    ;(useCurrentSimulation as jest.Mock).mockReturnValue({ progression: 0 })

    // When
    await act(async () => {
      renderWithWrapper(await PartnerPage({ params, searchParams }), {
        currentSimulation: {
          progression: 0,
        },
      })
    })

    // Then
    expect(screen.getByTestId('test-message')).toBeInTheDocument()
  })
})
