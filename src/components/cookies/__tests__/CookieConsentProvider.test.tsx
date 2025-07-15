import {
  COOKIE_CONSENT_KEY,
  COOKIE_CUSTOM_CHOICE_KEY,
} from '@/constants/state/cookies'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { CookieChoice } from '@/types/cookies'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useCookieConsent } from '../CookieConsentProvider'

// Test component to access context
const TestComponent = () => {
  const {
    cookieConsent,
    cookieCustomChoice,
    triggerConsentDetection,
    isBoardOpen,
  } = useCookieConsent()

  return (
    <div>
      <div data-testid="consent">{cookieConsent || 'undefined'}</div>
      <div data-testid="custom-choice">
        {JSON.stringify(cookieCustomChoice) || 'undefined'}
      </div>
      <div data-testid="board-open">{isBoardOpen.toString()}</div>
      <button onClick={triggerConsentDetection} data-testid="trigger">
        Trigger Detection
      </button>
    </div>
  )
}

describe('CookieConsentProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.removeItem(COOKIE_CONSENT_KEY)
    localStorage.removeItem(COOKIE_CUSTOM_CHOICE_KEY)
  })

  it('should provide default context values when no consent is stored', async () => {
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('consent').textContent).toEqual('undefined')
      expect(screen.getByTestId('custom-choice').textContent).toEqual(
        'undefined'
      )
    })
  })

  it('should detect and set consent when "all" choice is stored', async () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, CookieChoice.all)
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('consent').textContent).toEqual(
        CookieChoice.all
      )
    })
  })

  it('should detect and set consent when "refuse" choice is stored', async () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, CookieChoice.refuse)
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('consent').textContent).toEqual(
        CookieChoice.refuse
      )
    })
  })

  it('should detect and set custom consent with choices when "custom" choice is stored', async () => {
    const customChoices = { googleAds: true }
    localStorage.setItem(COOKIE_CONSENT_KEY, CookieChoice.custom)
    localStorage.setItem(
      COOKIE_CUSTOM_CHOICE_KEY,
      JSON.stringify(customChoices)
    )
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('consent').textContent).toEqual(
        CookieChoice.custom
      )
      expect(screen.getByTestId('custom-choice').textContent).toEqual(
        JSON.stringify(customChoices)
      )
    })
  })

  it('should handle invalid JSON in custom choices gracefully', async () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, CookieChoice.custom)
    localStorage.setItem(COOKIE_CUSTOM_CHOICE_KEY, 'invalid-json')
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('consent').textContent).toEqual(
        CookieChoice.custom
      )
      expect(screen.getByTestId('custom-choice').textContent).toEqual(
        'undefined'
      )
    })
  })

  it('should trigger consent detection when triggerConsentDetection is called', async () => {
    const user = userEvent.setup()
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('consent').textContent).toEqual('undefined')
    })
    // Set new consent after trigger
    localStorage.setItem(COOKIE_CONSENT_KEY, CookieChoice.all)
    await user.click(screen.getByTestId('trigger'))
    await waitFor(() => {
      expect(screen.getByTestId('consent').textContent).toEqual(
        CookieChoice.all
      )
    })
  })

  it('should not update consent when no consent is found during trigger', async () => {
    const user = userEvent.setup()
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('consent').textContent).toEqual('undefined')
    })
    await user.click(screen.getByTestId('trigger'))
    await waitFor(() => {
      expect(screen.getByTestId('consent').textContent).toEqual('undefined')
    })
  })

  it('should provide triggerConsentDetection function in context', async () => {
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('trigger')).toBeTruthy()
    })
  })

  it('should provide isBoardOpen state and setIsBoardOpen function in context', async () => {
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('board-open').textContent).toEqual('false')
    })
  })
})
