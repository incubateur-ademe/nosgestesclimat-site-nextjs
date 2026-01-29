import {
  COOKIE_CONSENT_KEY,
  COOKIE_CUSTOM_CHOICE_KEY,
  POSTHOG_ENABLED_KEY,
} from '@/constants/state/cookies'
import { expect, test } from '@playwright/test'

const COOKIE_BANNER_TITLE_TEST_ID = 'cookie-banner-title'
const COOKIE_MANAGEMENT_TITLE_TEST_ID = 'cookie-management-title'

test.describe('Cookie Consent Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should show the cookie banner for a new visitor', async ({ page }) => {
    await expect(page.getByTestId(COOKIE_BANNER_TITLE_TEST_ID)).toBeVisible()
  })

  test('should accept all cookies from banner', async ({ page }) => {
    await page.getByTestId('cookie-banner-accept-button').click()
    await expect(
      page.getByTestId(COOKIE_BANNER_TITLE_TEST_ID)
    ).not.toBeVisible()

    const consent = await page.evaluate(
      (key) => localStorage.getItem(key),
      COOKIE_CONSENT_KEY
    )
    expect(consent).toBe('all')
  })

  test('should refuse all cookies from banner', async ({ page }) => {
    await page.getByTestId('cookie-banner-refuse-button').click()
    await expect(
      page.getByTestId(COOKIE_BANNER_TITLE_TEST_ID)
    ).not.toBeVisible()

    const consent = await page.evaluate(
      (key) => localStorage.getItem(key),
      COOKIE_CONSENT_KEY
    )
    expect(consent).toBe('refuse')
  })

  test('should customize cookies from banner (Google Ads & PostHog)', async ({
    page,
  }) => {
    await page.getByTestId('cookie-banner-customize-button').click()
    await expect(
      page.getByTestId(COOKIE_MANAGEMENT_TITLE_TEST_ID)
    ).toBeVisible()

    // Toggle Google Ads ON
    await page.getByTestId('google-ads-accept-radio').nth(0).click()

    // Toggle PostHog ON
    await page.getByTestId('posthog-accept-radio').nth(0).click()

    await page.getByTestId('confirm-choices-button').click()
    await expect(
      page.getByTestId(COOKIE_MANAGEMENT_TITLE_TEST_ID)
    ).not.toBeVisible()

    const consent = await page.evaluate(
      (key) => localStorage.getItem(key),
      COOKIE_CONSENT_KEY
    )
    expect(consent).toBe('custom')

    const customChoices = await page.evaluate((key) => {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    }, COOKIE_CUSTOM_CHOICE_KEY)

    expect(customChoices).not.toBeNull()
    expect(customChoices?.googleAds).toBe(true)
    expect(customChoices?.posthog).toBe(true)
  })

  test('should toggle Google Ads consent via Footer Link', async ({ page }) => {
    // First refuse all to start clean or just ensure consistent state if needed
    await page.getByTestId('cookie-banner-refuse-button').click()

    // Open via footer
    await page.getByTestId('cookie-footer-button').click()
    await expect(
      page.getByTestId(COOKIE_MANAGEMENT_TITLE_TEST_ID)
    ).toBeVisible()

    // Toggle Google Ads ON (Accept)
    await page.getByTestId('google-ads-accept-radio').nth(0).click()
    await page.getByTestId('confirm-choices-button').click()

    // Verify ON
    let customChoices = await page.evaluate((key) => {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    }, COOKIE_CUSTOM_CHOICE_KEY)
    expect(customChoices?.googleAds).toBe(true)

    // Re-open and Toggle Google Ads OFF (Refuse)
    await page.getByTestId('cookie-footer-button').click()
    await expect(
      page.getByTestId(COOKIE_MANAGEMENT_TITLE_TEST_ID)
    ).toBeVisible()

    // Check that the radio is correctly pre-selected (UI verification)
    await expect(page.getByTestId('google-ads-accept-radio')).toBeChecked()

    await page.getByTestId('google-ads-refuse-radio').nth(0).click()
    await page.getByTestId('confirm-choices-button').click()

    // Verify OFF
    customChoices = await page.evaluate((key) => {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    }, COOKIE_CUSTOM_CHOICE_KEY)
    expect(customChoices?.googleAds).toBe(false)
  })

  test('should toggle PostHog consent via Footer Link', async ({ page }) => {
    // First refuse all
    await page.getByTestId('cookie-banner-refuse-button').click()

    // Open via footer
    await page.getByTestId('cookie-footer-button').click()
    await expect(
      page.getByTestId(COOKIE_MANAGEMENT_TITLE_TEST_ID)
    ).toBeVisible()

    // Toggle PostHog ON (Accept)
    await page.getByTestId('posthog-accept-radio').nth(0).click()
    await page.getByTestId('confirm-choices-button').click()

    // Verify ON
    let customChoices = await page.evaluate((key) => {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    }, COOKIE_CUSTOM_CHOICE_KEY)
    expect(customChoices?.posthog).toBe(true)

    // Re-open and Toggle PostHog OFF (Refuse)
    await page.getByTestId('cookie-footer-button').click()
    await expect(
      page.getByTestId(COOKIE_MANAGEMENT_TITLE_TEST_ID)
    ).toBeVisible()

    // Check that the radio is correctly pre-selected (UI verification)
    await expect(page.getByTestId('posthog-accept-radio')).toBeChecked()

    await page.getByTestId('posthog-refuse-radio').nth(0).click()
    await page.getByTestId('confirm-choices-button').click()

    // Verify OFF
    customChoices = await page.evaluate((key) => {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    }, COOKIE_CUSTOM_CHOICE_KEY)
    expect(customChoices?.posthog).toBe(false)
  })

  test('should handle global refuse all from management modal', async ({
    page,
  }) => {
    await page.getByTestId('cookie-banner-refuse-button').click()
    await page.getByTestId('cookie-footer-button').click()

    // Accept manually to change state
    await page.getByTestId('google-ads-accept-radio').nth(0).click()
    await page.getByTestId('posthog-accept-radio').nth(0).click()

    // Then click Refuse All button
    await page.getByTestId('refuse-all-button').click()

    // Modal should close (usually Refuse All/Accept All buttons close the modal immediately or submit)
    // Checking code: In CookieConsentManagement, refuseAll calls refuseAll() which sets consent to 'refuse' and closes.
    await expect(
      page.getByTestId(COOKIE_MANAGEMENT_TITLE_TEST_ID)
    ).not.toBeVisible()

    const consent = await page.evaluate(
      (key) => localStorage.getItem(key),
      COOKIE_CONSENT_KEY
    )
    expect(consent).toBe('refuse')
  })

  test('should handle global accept all from management modal', async ({
    page,
  }) => {
    await page.getByTestId('cookie-banner-customize-button').click()

    await page.getByTestId('accept-all-button').click()
    await expect(
      page.getByTestId(COOKIE_MANAGEMENT_TITLE_TEST_ID)
    ).not.toBeVisible()

    const consent = await page.evaluate(
      (key) => localStorage.getItem(key),
      COOKIE_CONSENT_KEY
    )
    expect(consent).toBe('all')
  })
})

test.describe('PostHog Opt-out Checkbox (Privacy Policy)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/politique-de-confidentialite')
  })

  test('should toggle PostHog disabled state via checkbox', async ({
    page,
  }) => {
    const checkbox = page.getByLabel('Désactiver le suivi Posthog')

    // Default: it should be unchecked (enabled) if user hasn't opted out, OR checked (enabled) depending on implementation.
    // Let's check the code: Remove '!' if needed.
    // The label says "Désactiver le suivi Posthog".
    // The input `checked` is `isEnabled`.
    // If `isEnabled` is true (default), the checkbox is checked.
    // Wait, the label in code is "checked={isEnabled}". If "isEnabled", it means PostHog is ENABLED.
    // The label text says "Désactiver le suivi Posthog" ??
    // Let's re-read DisablePosthogCheckbox.tsx.
    // Label says: "Vous n'êtes pas exclu(e). Décochez cette case pour désactiver complètement le suivi avec Posthog"
    // So CHECKED = Enabled. UNCHECKED = Disabled.

    // Check initial state (should be enabled/checked by default)
    await expect(checkbox).toBeChecked()

    // Uncheck -> Disable
    await checkbox.uncheck()

    // Verify LocalStorage
    let isEnabled = await page.evaluate(
      (key) => localStorage.getItem(key),
      POSTHOG_ENABLED_KEY
    )
    // Code sets 'false' string or 'true' string.
    expect(isEnabled).toBe('false')

    // Check -> Enable
    await checkbox.check()

    // Note: The component does window.location.reload() when re-enabling!
    // We might need to wait for reload if we want to check storage again, but Playwright might handle the click.
    // Let's verify storage after reload.
    await page.waitForLoadState('domcontentloaded')

    isEnabled = await page.evaluate(
      (key) => localStorage.getItem(key),
      POSTHOG_ENABLED_KEY
    )
    expect(isEnabled).toBe('true')
  })
})
