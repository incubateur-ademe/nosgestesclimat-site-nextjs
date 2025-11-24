import { fromTraffic } from '@msw/source/traffic'
import { expect } from '@playwright/test'
import msw, { test } from 'next/experimental/testmode/playwright/msw.js'
import { HarRecorder } from '../../../helpers/harRecorder/harRecorder'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'
// import har from './har/server.har.json' assert { type: 'json' }

const serverHarPath = new URL('har/server.har.json', import.meta.url).pathname
const clientHarPath = new URL('har/client.har.json', import.meta.url).pathname
const harRecorder = new HarRecorder(serverHarPath)
const serverRegex = new RegExp(`${process.env.NEXT_PUBLIC_SERVER_URL}/.*`)
const handlers = [
  // ...fromTraffic(har as any),
  msw.http.all(serverRegex, async (req) => {
    return harRecorder.save(req.request)
  }),
]

test.use({
  mswHandlers: [handlers, { scope: 'test' }],
})
test.describe('User dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Setup HAR-based authentication mocking
    // This mocks the email verification code sending and handles the auth cookie
    page.routeFromHAR(clientHarPath, {
      url: serverRegex,
      update: true,
      updateMode: 'full',
    })
  })

  test.describe('Given a unlogged user', () => {
    test.describe('When they complete the simulation', () => {
      test('Then they should be able to save their simulation and access their dashboard', async ({
        page,
      }) => {
        await page.goto('/')

        await setupSimulation(page)
        await recursivelyFillSimulation(page)

        await page.waitForURL(/.*\/fin/)
        expect(page.url()).toContain('/fin')

        // Fill save simulation form, with a verification code
        await page
          .getByRole('textbox', { name: 'nom.prenom@domaine.fr' })
          .click()
        await page
          .getByRole('textbox', { name: 'nom.prenom@domaine.fr' })
          .fill('poised.asp.hxqg@protectsmail.net')
        await page
          .getByRole('button', { name: 'Sauvegarder mes résultats' })
          .click()
        harRecorder.writeToFile()

        // await page
        //   .getByRole('textbox', { name: 'Entrez votre code de vé' })
        //   .fill(getMockVerificationCode())

        // await page.waitForURL(/.*\/mon-espace/)
        // expect(page.url()).toContain('/mon-espace')

        // await expect(
        //   page.getByRole('heading', { name: "Derniers résultats d'empreinte" })
        // ).toBeVisible()
      })
    })

    test.describe
      .only('When they visit the website later as an unlogged user', () => {
      test('Then they should be able to log in and access their dashboard', async ({
        page,
      }) => {
        await page.goto('/connexion')
        await page
          .getByRole('textbox', { name: 'nom.prenom@domaine.fr' })
          .click()
        await page
          .getByRole('textbox', { name: 'nom.prenom@domaine.fr' })
          .fill('johangirod@beta.gouv.fr')
        await page.getByRole('button', { name: 'Accéder à mon espace' }).click()
        // await page
        //   .getByRole('textbox', { name: 'Entrez votre code de vé' })
        //   .fill("11111")

        await page.waitForURL(/.*\/mon-espace/, { timeout: 1000 })
        expect(page.url()).toContain('/mon-espace')
        harRecorder.writeToFile()

        // // Wait for server-side rendering to complete
        // // This ensures getAuthentifiedUser() has been called and the page is fully rendered
        // await page.waitForLoadState('networkidle')

        // // Check if we were redirected back to login (which would indicate auth failed)
        // const currentUrl = page.url()
        // if (currentUrl.includes('/connexion')) {
        //   console.error(
        //     '❌ Page was redirected to /connexion - authentication failed'
        //   )
        //   const cookies = await page.context().cookies()
        //   console.error(
        //     'Cookies at redirect time:',
        //     cookies.map((c) => `${c.name}=${c.domain || 'no-domain'}`)
        //   )
        //   throw new Error('Authentication failed - redirected to login page')
        // }

        // await expect(
        //   page.getByRole('heading', { name: "Derniers résultats d'empreinte" })
        // ).toBeVisible()
      })
    })
  })
})
