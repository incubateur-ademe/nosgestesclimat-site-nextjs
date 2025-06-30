import {
  COOKIE_CONSENT_KEY,
  COOKIE_CUSTOM_CHOICE_KEY,
} from '@/constants/state/cookies'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { CookieChoice } from '@/types/cookies'
import { beforeEach } from '@jest/globals'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useCookieConsent } from '../CookieConsentProvider'

// Mock window.dispatchEvent
const mockDispatchEvent = jest.fn()
Object.defineProperty(window, 'dispatchEvent', {
  value: mockDispatchEvent,
  writable: true,
})

// Test component to access context
const TestComponent = () => {
  const { cookieConsent, cookieCustomChoice, triggerConsentDetection } =
    useCookieConsent()

  return (
    <div>
      <div data-testid="consent">{cookieConsent || 'undefined'}</div>
      <div data-testid="custom-choice">
        {JSON.stringify(cookieCustomChoice) || 'undefined'}
      </div>
      <button onClick={triggerConsentDetection} data-testid="trigger">
        Trigger Detection
      </button>
    </div>
  )
}

describe('CookieConsentProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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
    const eventCall = mockDispatchEvent.mock.calls.find(
      ([evt]) =>
        evt &&
        typeof evt === 'object' &&
        'type' in evt &&
        (evt as CustomEvent).type === 'cookieConsentChanged'
    )
    expect(eventCall).toBeTruthy()
    if (eventCall) {
      const evt = eventCall[0] as CustomEvent
      expect(evt.detail).toEqual({
        consent: CookieChoice.all,
        customChoice: undefined,
      })
    }
  })

  it('should detect and set consent when "refuse" choice is stored', async () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, CookieChoice.refuse)
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('consent').textContent).toEqual(
        CookieChoice.refuse
      )
    })
    const eventCall = mockDispatchEvent.mock.calls.find(
      ([evt]) =>
        evt &&
        typeof evt === 'object' &&
        'type' in evt &&
        (evt as CustomEvent).type === 'cookieConsentChanged'
    )
    expect(eventCall).toBeTruthy()
    if (eventCall) {
      const evt = eventCall[0] as CustomEvent
      expect(evt.detail).toEqual({
        consent: CookieChoice.refuse,
        customChoice: undefined,
      })
    }
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
    const eventCall = mockDispatchEvent.mock.calls.find(
      ([evt]) =>
        evt &&
        typeof evt === 'object' &&
        'type' in evt &&
        (evt as CustomEvent).type === 'cookieConsentChanged'
    )
    expect(eventCall).toBeTruthy()
    if (eventCall) {
      const evt = eventCall[0] as CustomEvent
      expect(evt.detail).toEqual({
        consent: CookieChoice.custom,
        customChoice: JSON.stringify(customChoices),
      })
    }
  })

  it('should handle invalid JSON in custom choices gracefully', async () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, CookieChoice.custom)
    localStorage.setItem(COOKIE_CUSTOM_CHOICE_KEY, 'invalid-json')
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByText(/Oups ! Une erreur est survenue/)).toBeTruthy()
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
    const eventCall = mockDispatchEvent.mock.calls.find(
      ([evt]) =>
        evt &&
        typeof evt === 'object' &&
        'type' in evt &&
        (evt as CustomEvent).type === 'cookieConsentChanged'
    )
    expect(eventCall).toBeTruthy()
    if (eventCall) {
      const evt = eventCall[0] as CustomEvent
      expect(evt.detail).toEqual({
        consent: CookieChoice.all,
        customChoice: undefined,
      })
    }
  })

  it('should not dispatch event when no consent is found', async () => {
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('consent').textContent).toEqual('undefined')
    })
    const eventCall = mockDispatchEvent.mock.calls.find(
      ([evt]) =>
        evt &&
        typeof evt === 'object' &&
        'type' in evt &&
        (evt as CustomEvent).type === 'cookieConsentChanged'
    )
    expect(eventCall).toBeFalsy()
  })

  it('should provide triggerConsentDetection function in context', async () => {
    renderWithWrapper(<TestComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('trigger')).toBeTruthy()
    })
  })
})
