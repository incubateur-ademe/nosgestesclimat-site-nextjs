import type { Page } from '@playwright/test'
import { expect, test } from '../fixtures'
import { TutorialPage } from '../fixtures/tutorial'
import {
  COMPLETED_TEST_STATE,
  ORGANISATION_ADMIN_STATE,
  USER_ACCOUNT_STATE,
} from '../state'

const URL = '/fin'
test.beforeEach(async ({ page }) => {
  await page.goto(URL)
})

test('Should redirect to the tutorial if no simulation', async ({ page }) => {
  test.skip() // This test doesn't work on playwright, I don't know why
  await expect(page).toHaveURL(TutorialPage.URL, { timeout: 15000 })
})

test.describe('Given a user that completed a test without an account', () => {
  test.use({ storageState: COMPLETED_TEST_STATE })

  test('can access the end page directly', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp(URL))
  })

  test('should be accessible from the home', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('do-the-test-link').first().click()
    await expect(page).toHaveURL(new RegExp(URL))
  })

  test('should display the carbon footprint', async ({ page }) => {
    // @TODO : two h1 in page
    await page.locator('h1').first().isVisible()

    const carbonFootprintElem = await getCarbonFootprintElem(page)
    await expect(carbonFootprintElem).toBeInViewport()

    const carbonFootprintResult = parseFloat(
      (await carbonFootprintElem.innerText()).replace(',', '.')
    )
    expect(carbonFootprintResult).toBeGreaterThan(7)
  })

  test('should display the water footprint', async ({ page }) => {
    // @TODO : two h1 in page
    await page.locator('h1').first().isVisible()
    // Wait for animation to finish
    await page.waitForTimeout(4000)
    const waterFootprintElem = page
      .getByText(/[\d]+[\s]litres/)
      .filter({ visible: true })
      .first()
    await expect(waterFootprintElem).toBeInViewport()

    const waterFootprintResult = parseInt(
      (await waterFootprintElem.innerText()).replace(/[\s]/, '')
    )
    expect(waterFootprintResult).toBeGreaterThan(6000)
  })
})

test.describe('Given a user that saved it simulation', () => {
  test.use({ storageState: USER_ACCOUNT_STATE })
  test('It can go back to its result from the link in the email', async ({
    page,
    user,
  }) => {
    await page.goto(user.savedSimulationLink)
    await expect(page).toHaveURL(new RegExp(URL))
    // @TODO There is two h1 on result page
    await expect(page.locator('h1').first()).toHaveText('Mes empreintes')
    const carbonFootprintElem = await getCarbonFootprintElem(page)
    await expect(carbonFootprintElem).toBeInViewport()
  })

  test('its simulation should not be accessible from another user', async ({
    user,
    browser,
  }) => {
    // @TODO
    test.skip()
    const context = await browser.newContext({
      storageState: ORGANISATION_ADMIN_STATE,
    })
    const page = await context.newPage()
    await page.goto(user.savedSimulationLink)
    await page.waitForLoadState()
    const carbonFootprintElem = await getCarbonFootprintElem(page)
    expect(carbonFootprintElem).not.toBeDefined()
  })
})

async function getCarbonFootprintElem(page: Page) {
  await page.waitForTimeout(7000)
  const carbonFootprintElem = page
    .getByText(/[\d]+,[\d][\s]tonnes/)
    .filter({ visible: true })
    .first()
  return carbonFootprintElem
}
