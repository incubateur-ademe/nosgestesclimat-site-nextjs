import { expect, test } from '@playwright/test'

const COOKIE_BANNER_TITLE_TEST_ID = 'cookie-banner-title'
const COOKIE_MANAGEMENT_TITLE_TEST_ID = 'cookie-management-title'

test.describe('Cookie Consent Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should default to "Refuse" in settings when "Refuse All" is clicked on banner', async ({
    page,
  }) => {
    // 1. Refuse all on banner
    await expect(page.getByTestId(COOKIE_BANNER_TITLE_TEST_ID)).toBeVisible()
    await page.getByTestId('cookie-banner-refuse-button').click()
    await expect(
      page.getByTestId(COOKIE_BANNER_TITLE_TEST_ID)
    ).not.toBeVisible()

    // 2. Open settings
    await page.getByTestId('cookie-footer-button').click()
    await expect(
      page.getByTestId(COOKIE_MANAGEMENT_TITLE_TEST_ID)
    ).toBeVisible()

    // 3. Verify defaults
    await expect(page.getByTestId('google-ads-refuse-radio')).toBeChecked()
    await expect(page.getByTestId('posthog-refuse-radio')).toBeChecked()
  })

  test('should default to "Accept" in settings when "Accept All" is clicked on banner', async ({
    page,
  }) => {
    // 1. Accept all on banner
    await expect(page.getByTestId(COOKIE_BANNER_TITLE_TEST_ID)).toBeVisible()
    await page.getByTestId('cookie-banner-accept-button').click()
    await expect(
      page.getByTestId(COOKIE_BANNER_TITLE_TEST_ID)
    ).not.toBeVisible()

    // 2. Open settings
    await page.getByTestId('cookie-footer-button').click()
    await expect(
      page.getByTestId(COOKIE_MANAGEMENT_TITLE_TEST_ID)
    ).toBeVisible()

    // 3. Verify defaults
    await expect(page.getByTestId('google-ads-accept-radio')).toBeChecked()
    await expect(page.getByTestId('posthog-accept-radio')).toBeChecked()
  })

  test('should sync PostHog opt-out from privacy policy checkbox to settings', async ({
    page,
  }) => {
    // 1. Accept all on banner (so PostHog is initially accepted/enabled)
    await page.getByTestId('cookie-banner-accept-button').click()

    // 2. Go to Privacy Policy
    await page.goto('/politique-de-confidentialite')

    // 3. Find check box - Label "Désactiver le suivi Posthog"
    // The checkbox is checked by default if tracking is enabled.
    // Unchecking it disables tracking.
    const checkbox = page.getByLabel('Désactiver le suivi Posthog')
    await expect(checkbox).toBeChecked()

    await checkbox.uncheck()

    // 4. Open settings (Cookie footer button is present in footer)
    await page.getByTestId('cookie-footer-button').click()
    await expect(
      page.getByTestId(COOKIE_MANAGEMENT_TITLE_TEST_ID)
    ).toBeVisible()

    // 5. Verify PostHog is "Refused"
    await expect(page.getByTestId('posthog-refuse-radio')).toBeChecked()
  })
})
