import { mswServer } from '@/__tests__/server'
import { PARTNER_JAGIS, PARTNER_KEY } from '@/constants/partners'
import { INTEGRATION_URL } from '@/constants/urls/main'
import { NOT_FOUND_PATH } from '@/constants/urls/paths'
import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import { faker } from '@faker-js/faker'
import '@testing-library/jest-dom'
import { act, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'
import PartnerPage from '../page'

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
  useSearchParams: () => new URLSearchParams(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => ''),
}))

vi.mock('@/components/layout/HeaderServer', () => ({
  __esModule: true,
  default: vi.fn(() => null),
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
    vi.clearAllMocks()
    safeLocalStorage.clear()
  })

  describe('when user has a simulation', () => {
    it('should display a message indicating the upcoming redirection', async () => {
      // Given
      mswServer.use(
        http.get(`${INTEGRATION_URL}/${PARTNER_JAGIS}`, () => {
          return HttpResponse.json({ name: 'Test Partner' })
        })
      )

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
      const { redirect } = await import('next/navigation')
      expect(redirect).toHaveBeenCalledWith(NOT_FOUND_PATH)
    })
  })

  describe('when partner is not verified', () => {
    it('should redirect to /404', async () => {
      // Given
      mswServer.use(
        http.get(`${INTEGRATION_URL}/${PARTNER_JAGIS}`, () => {
          return HttpResponse.error()
        })
      )

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
      const { redirect } = await import('next/navigation')
      expect(redirect).toHaveBeenCalledWith(NOT_FOUND_PATH)
    })
  })

  describe('when user has not completed the test', () => {
    it('should redirect to /simulateur/bilan', async () => {
      // Given
      mswServer.use(
        http.get(`${INTEGRATION_URL}/${PARTNER_JAGIS}`, () => {
          return HttpResponse.json({ name: 'Test Partner' })
        })
      )

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
