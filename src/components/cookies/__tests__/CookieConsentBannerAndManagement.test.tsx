import Footer from '@/components/layout/Footer'
import WantToActBlock from '@/components/layout/footer/WantToActBlock'
import { COOKIE_CONSENT_KEY } from '@/constants/state/cookies'
import {
  trackingCookiesAccept,
  trackingCookiesCustomChoice,
  trackingCookiesRefuse,
} from '@/constants/tracking/misc'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { CookieChoice } from '@/types/cookies'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { safeLocalStorage } from '@/utils/browser/safeLocalStorage'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CookieConsentBannerAndManagement from '../CookieConsentBannerAndManagement'

// Mock dependencies
vi.mock('@/utils/analytics/trackEvent')
vi.mock('@/utils/browser/safeLocalStorage')

describe('CookieConsentBannerAndManagement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('initial visibility', () => {
    it('should show banner when no consent is stored', async () => {
      vi.mocked(safeLocalStorage.getItem).mockReturnValue(null)

      renderWithWrapper(<CookieConsentBannerAndManagement />)

      await waitFor(() => {
        expect(screen.getByTestId('cookie-banner-title')).toBeInTheDocument()
      })
    })

    it('should hide banner when consent is already stored', async () => {
      vi.mocked(safeLocalStorage.getItem).mockReturnValue(CookieChoice.all)

      renderWithWrapper(<CookieConsentBannerAndManagement />)

      await waitFor(() => {
        expect(
          screen.queryByTestId('cookie-banner-title')
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('accept all functionality', () => {
    it('should store consent, hide banner, and track event when accepting all', async () => {
      const user = userEvent.setup()
      vi.mocked(safeLocalStorage.getItem).mockReturnValue(null)

      renderWithWrapper(<CookieConsentBannerAndManagement />)

      await waitFor(() => {
        expect(
          screen.getByTestId('cookie-banner-accept-button')
        ).toBeInTheDocument()
      })

      await user.click(screen.getByTestId('cookie-banner-accept-button'))

      expect(safeLocalStorage.setItem).toHaveBeenCalledWith(
        COOKIE_CONSENT_KEY,
        CookieChoice.all
      )
      expect(trackEvent).toHaveBeenCalledWith(trackingCookiesAccept)

      await waitFor(() => {
        expect(
          screen.queryByTestId('cookie-banner-title')
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('refuse all functionality', () => {
    it('should store consent, hide banner, and track event when refusing all', async () => {
      const user = userEvent.setup()
      vi.mocked(safeLocalStorage.getItem).mockReturnValue(null)

      renderWithWrapper(<CookieConsentBannerAndManagement />)

      await waitFor(() => {
        expect(
          screen.getByTestId('cookie-banner-refuse-button')
        ).toBeInTheDocument()
      })

      await user.click(screen.getByTestId('cookie-banner-refuse-button'))

      expect(safeLocalStorage.setItem).toHaveBeenCalledWith(
        COOKIE_CONSENT_KEY,
        CookieChoice.refuse
      )
      expect(trackEvent).toHaveBeenCalledWith(trackingCookiesRefuse)

      await waitFor(() => {
        expect(
          screen.queryByTestId('cookie-banner-title')
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('open settings functionality', () => {
    it('should open management panel and track event when opening settings', async () => {
      const user = userEvent.setup()
      vi.mocked(safeLocalStorage.getItem).mockReturnValue(null)

      renderWithWrapper(<CookieConsentBannerAndManagement />)

      await waitFor(() => {
        expect(
          screen.getByTestId('cookie-banner-customize-button')
        ).toBeInTheDocument()
      })

      await user.click(screen.getByTestId('cookie-banner-customize-button'))

      expect(trackEvent).toHaveBeenCalledWith(trackingCookiesCustomChoice)

      await waitFor(() => {
        expect(
          screen.getByTestId('cookie-management-title')
        ).toBeInTheDocument()
      })
    })
  })

  describe('close settings functionality', () => {
    it('should close management panel and show banner when no consent exists', async () => {
      const user = userEvent.setup()
      vi.mocked(safeLocalStorage.getItem).mockReturnValue(null)

      renderWithWrapper(<CookieConsentBannerAndManagement />)

      // First open settings
      await user.click(screen.getByTestId('cookie-banner-customize-button'))
      await waitFor(() => {
        expect(
          screen.getByTestId('cookie-management-title')
        ).toBeInTheDocument()
      })

      // Then close settings (using the close button in the modal)
      const closeButton = screen.getByTestId('modal-close-button')
      await user.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByTestId('cookie-management-title')).toBeNull()
        expect(screen.getByTestId('cookie-banner-title')).toBeInTheDocument()
      })
    })

    it('should close management panel without showing banner when consent exists', async () => {
      const user = userEvent.setup()
      vi.mocked(safeLocalStorage.getItem).mockReturnValue(CookieChoice.all)

      renderWithWrapper(
        <>
          <CookieConsentBannerAndManagement />{' '}
          <Footer wantToActBlock={<WantToActBlock locale="fr" />} />
        </>
      )

      await user.click(screen.getByTestId('cookie-footer-button'))

      await waitFor(() => {
        expect(
          screen.getByTestId('cookie-management-title')
        ).toBeInTheDocument()
      })

      const closeButton = screen.getByTestId('modal-close-button')
      await user.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByTestId('cookie-management-title')).toBeNull()
        expect(screen.queryByTestId('cookie-banner-title')).toBeNull()
      })
    })
  })

  describe('confirm choices functionality', () => {
    it('should store custom consent, hide banner and management panel, and track event when confirming choices', async () => {
      const user = userEvent.setup()
      vi.mocked(safeLocalStorage.getItem).mockReturnValue(null)

      renderWithWrapper(<CookieConsentBannerAndManagement />)

      // Open settings first
      await user.click(screen.getByTestId('cookie-banner-customize-button'))
      await waitFor(() => {
        expect(
          screen.getByTestId('cookie-management-title')
        ).toBeInTheDocument()
      })

      // Submit the form to confirm choices
      await user.click(screen.getByTestId('accept-all-button'))

      expect(safeLocalStorage.setItem).toHaveBeenCalledWith(
        COOKIE_CONSENT_KEY,
        CookieChoice.all
      )
      expect(trackEvent).toHaveBeenCalledWith(trackingCookiesAccept)

      await waitFor(() => {
        expect(screen.queryByTestId('cookie-banner-title')).toBeNull()
        expect(screen.queryByTestId('cookie-management-title')).toBeNull()
      })
    })
  })

  describe('management panel actions', () => {
    it('should handle accept all from management panel', async () => {
      const user = userEvent.setup()
      vi.mocked(safeLocalStorage.getItem).mockReturnValue(null)

      renderWithWrapper(<CookieConsentBannerAndManagement />)

      // Open settings
      await user.click(screen.getByTestId('cookie-banner-customize-button'))
      await waitFor(() => {
        expect(screen.getByTestId('accept-all-button')).toBeInTheDocument()
      })

      // Accept all from management panel
      await user.click(screen.getByTestId('accept-all-button'))

      expect(safeLocalStorage.setItem).toHaveBeenCalledWith(
        COOKIE_CONSENT_KEY,
        CookieChoice.all
      )
      expect(trackEvent).toHaveBeenCalledWith(trackingCookiesAccept)
    })

    it('should handle refuse all from management panel', async () => {
      const user = userEvent.setup()
      vi.mocked(safeLocalStorage.getItem).mockReturnValue(null)

      renderWithWrapper(<CookieConsentBannerAndManagement />)

      // Open settings
      await user.click(screen.getByTestId('cookie-banner-customize-button'))
      await waitFor(() => {
        expect(screen.getByTestId('refuse-all-button')).toBeInTheDocument()
      })

      // Refuse all from management panel
      await user.click(screen.getByTestId('refuse-all-button'))

      expect(safeLocalStorage.setItem).toHaveBeenCalledWith(
        COOKIE_CONSENT_KEY,
        CookieChoice.refuse
      )
      expect(trackEvent).toHaveBeenCalledWith(trackingCookiesRefuse)
    })
  })
})
