import { expect, test } from '../fixtures'
import { TutorialPage } from '../fixtures/tutorial'
import { getCarbonFootprintElem } from '../helpers/carbon-footprint'
import { COMPLETED_TEST_STATE } from '../state'

test.beforeEach(async ({ page }) => {
  await page.goto('/fin')
})

test('Should redirect to the tutorial if no simulation', async ({ page }) => {
  await expect(page).toHaveURL(TutorialPage.URL)
})

test.describe('Given a user that completed a test without an account', () => {
  test.use({ storageState: COMPLETED_TEST_STATE })

  test('can access the end page directly', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp('/fin'))
  })

  test('should be accessible from the home', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('do-the-test-link').first().click()
    await expect(page).toHaveURL(new RegExp('/fin'))
  })

  test('should display the carbon footprint', async ({ page }) => {
    // @TODO : two h1 in page
    await page.locator('h1').first().isVisible()
    await page.waitForTimeout(7000)
    const carbonFootprintElem = getCarbonFootprintElem(page)
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
      .getByText(/[\d]+[\s]?litres/)
      .filter({ visible: true })
      .first()
    await expect(waterFootprintElem).toBeInViewport()

    const waterFootprintResult = parseInt(
      (await waterFootprintElem.innerText()).replace(/[\s]/, '')
    )
    expect(waterFootprintResult).toBeGreaterThan(6000)
  })
})
