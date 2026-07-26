import { faker } from '@faker-js/faker'
import { expect, test } from '../fixtures'

test.describe('Login - invalid verification code', () => {
  test.setTimeout(60_000)

  test('should display error when entering a wrong code', async ({ page }) => {
    const email = faker.internet.email({
      provider: `${process.env.MAILISK_NAMESPACE!}.mailisk.net`,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    })

    await page.goto('/connexion')

    const emailInput = page.getByTestId('verification-code-email-input')
    await expect(emailInput).toBeVisible()
    await emailInput.fill(email)
    await emailInput.press('Enter')

    const codeInput = page.getByTestId('verification-code-input')
    await expect(codeInput).toBeInViewport({ timeout: 10_000 })

    await codeInput.fill('000000')
    await page.getByTestId('verification-code-submit-button').click()

    await expect(page.getByText('Le code est invalide')).toBeVisible({
      timeout: 10_000,
    })
  })
})
