import { expect, test } from '../fixtures'
import { getCarbonFootprintElem } from '../helpers/carbon-footprint'
import { COMPLETED_TEST_STATE } from '../state'

test.beforeEach(async ({ page }) => {
  await page.goto('/fin')
})

test('Should redirect to the home if no simulation', async ({ page }) => {
  await expect(page).toHaveURL('/')
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
    await page.waitForTimeout(3500)
    const carbonFootprintElem = getCarbonFootprintElem(page)
    await expect(carbonFootprintElem).toBeInViewport()

    const carbonFootprintResult = parseFloat(
      (await carbonFootprintElem.innerText()).replace(',', '.')
    )
    expect(carbonFootprintResult).toBeGreaterThan(7)
  })

  test('should display the water footprint on water page', async ({ page }) => {
    // Wait for animation to finish
    await page.getByTestId('water-footprint-link').click()
    await page.waitForTimeout(3500)
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
