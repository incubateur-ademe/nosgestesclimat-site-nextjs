import { expect, test } from '@playwright/test'
import {
  getMockVerificationCode,
  mockAuthWithHAR,
} from '../../../helpers/authentication/mockAuthWithHAR'

test.describe('User dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Setup HAR-based authentication mocking
    // This mocks the email verification code sending and handles the auth cookie
    await mockAuthWithHAR(page, 'tests/fixtures/auth-flow.har')
  })

  // test.describe('Given a unlogged user', () => {
  //   test.describe('When they complete the simulation', () => {
  //     test('Then they should be able to save their simulation and access their dashboard', async ({
  //       page,
  //     }) => {
  //       await page.goto('/')

  //       await setupSimulation(page)
  //       await recursivelyFillSimulation(page)

  //       await page.waitForURL(/.*\/fin/)
  //       expect(page.url()).toContain('/fin')

  //       // Fill save simulation form, with a verification code
  //       await page
  //         .getByRole('textbox', { name: 'nom.prenom@domaine.fr' })
  //         .click()
  //       await page
  //         .getByRole('textbox', { name: 'nom.prenom@domaine.fr' })
  //         .fill('test@test.fr')
  //       await page
  //         .getByRole('button', { name: 'Sauvegarder mes résultats' })
  //         .click()
  //       await page
  //         .getByRole('textbox', { name: 'Entrez votre code de vé' })
  //         .fill(getMockVerificationCode())

  //       await page.waitForURL(/.*\/mon-espace/)
  //       expect(page.url()).toContain('/mon-espace')

  //       await expect(
  //         page.getByRole('heading', { name: "Derniers résultats d'empreinte" })
  //       ).toBeVisible()
  //     })
  // })

  test.describe('When they visit the website later as an unlogged user', () => {
    test('Then they should be able to log in and access their dashboard', async ({
      page,
    }) => {
      await page.goto('/mon-espace')
      await page.goto('http://localhost:3000/connexion')
      await page.getByRole('textbox', { name: 'nom.prenom@domaine.fr' }).click()
      await page
        .getByRole('textbox', { name: 'nom.prenom@domaine.fr' })
        .fill('test@test.fr')
      await page.getByRole('button', { name: 'Accéder à mon espace' }).click()
      await page
        .getByRole('textbox', { name: 'Entrez votre code de vé' })
        .fill(getMockVerificationCode())

      // Wait for the cookie to be available in the browser context BEFORE navigation
      // This is critical: the cookie must be present when Next.js makes the server-side request
      let cookiePresent = false
      for (let i = 0; i < 20; i++) {
        const cookies = await page.context().cookies()
        cookiePresent = cookies.some((c) => c.name === 'ngcjwt')
        if (cookiePresent) {
          console.error('✅ Cookie found in browser context before navigation')
          break
        }
        await page.waitForTimeout(100)
      }
      if (!cookiePresent) {
        const cookies = await page.context().cookies()
        console.error(
          '❌ Cookie ngcjwt not found in browser context. Available cookies:',
          cookies.map((c) => `${c.name} (${c.domain || 'no-domain'})`)
        )
      }

      // Wait for navigation to complete and authentication to be processed
      await page.waitForURL(/.*\/mon-espace/)
      expect(page.url()).toContain('/mon-espace')

      // Wait for server-side rendering to complete
      // This ensures getAuthentifiedUser() has been called and the page is fully rendered
      await page.waitForLoadState('networkidle')

      // Check if we were redirected back to login (which would indicate auth failed)
      const currentUrl = page.url()
      if (currentUrl.includes('/connexion')) {
        console.error(
          '❌ Page was redirected to /connexion - authentication failed'
        )
        const cookies = await page.context().cookies()
        console.error(
          'Cookies at redirect time:',
          cookies.map((c) => `${c.name}=${c.domain || 'no-domain'}`)
        )
        throw new Error('Authentication failed - redirected to login page')
      }

      await expect(
        page.getByRole('heading', { name: "Derniers résultats d'empreinte" })
      ).toBeVisible()
    })
  })
  // })
})
