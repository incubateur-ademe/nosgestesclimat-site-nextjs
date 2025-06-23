import { PARTNER_JAGIS, PARTNER_KEY } from '@/constants/partners'
import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { faker } from '@faker-js/faker'
import '@testing-library/jest-dom'
import { act, screen, waitFor } from '@testing-library/react'
import { redirect } from 'next/navigation'
import PartnerPage from '../page'

const mockVerifyPartner = jest.fn()
const mockRedirect = redirect as jest.MockedFunction<typeof redirect>

jest.mock('@/services/partners/verifyPartner', () => ({
  verifyPartner: () => mockVerifyPartner(),
}))

describe('PartnerPage', () => {
  const defaultSearchParams = Promise.resolve({
    [PARTNER_KEY]: PARTNER_JAGIS,
  })
  const defaultParams = Promise.resolve({ locale: 'fr' as const })

  const defaultSimulation = generateSimulation({
    id: faker.string.uuid(),
    progression: 1,
  })

  beforeEach(() => {
    jest.clearAllMocks()
    safeLocalStorage.clear()
  })

  describe('when user has a simulation', () => {
    it('should display a message indicating the upcoming redirection', async () => {
      // Given
      mockVerifyPartner.mockResolvedValue({ name: 'Test Partner' })

      // When
      await act(async () => {
        renderWithWrapper(
          await PartnerPage({
            params: defaultParams,
            searchParams: defaultSearchParams,
          }),
          {
            providers: {
              queryClient: true,
              errorBoundary: true,
              user: true,
              partner: true,
            },
            currentSimulation: defaultSimulation,
            simulations: [defaultSimulation],
          }
        )
      })

      // Then
      await waitFor(() => {
        expect(screen.getByTestId('redirection-message')).toBeInTheDocument()
      })
    })
  })

  describe('when no partner search param is provided', () => {
    it('should redirect to /404', async () => {
      // Given
      const searchParams = Promise.resolve({})

      // When
      await act(async () => {
        renderWithWrapper(
          await PartnerPage({ params: defaultParams, searchParams }),
          {
            providers: {
              queryClient: true,
              errorBoundary: true,
            },
          }
        )
      })

      // Then
      expect(mockRedirect).toHaveBeenCalledWith('/404')
    })
  })

  describe('when partner is not verified', () => {
    it('should redirect to /404', async () => {
      // Given
      mockVerifyPartner.mockResolvedValue(null)

      // When
      await act(async () => {
        renderWithWrapper(
          await PartnerPage({
            params: defaultParams,
            searchParams: defaultSearchParams,
          }),
          {
            providers: {
              queryClient: true,
              errorBoundary: true,
            },
          }
        )
      })

      // Then
      expect(mockRedirect).toHaveBeenCalledWith('/404')
    })
  })

  describe('when user has not completed the test', () => {
    it('should redirect to /simulateur/bilan', async () => {
      // Given
      mockVerifyPartner.mockResolvedValue({ name: 'Test Partner' })

      // When
      await act(async () =>
        renderWithWrapper(
          await PartnerPage({
            params: defaultParams,
            searchParams: defaultSearchParams,
          }),
          {
            providers: {
              queryClient: true,
              errorBoundary: true,
              user: true,
              partner: true,
            },
            currentSimulation: {
              progression: 0,
            },
          }
        )
      )

      // Then
      expect(screen.getByTestId('test-message')).toBeInTheDocument()
    })
  })
})
