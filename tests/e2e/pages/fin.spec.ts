import { expect, test } from '@playwright/test'
import {
  FIN_EMAIL_INPUT,
  FIN_EMAIL_SUBMIT_BUTTON,
} from '../../constants/elements-ids'
import { dismissCookieBanner } from '../../helpers/cookies/dismissCookieBanner'
import { clickSkipTutorialButton } from '../../helpers/elements/buttons'
import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'

test.describe('The End page', () => {
  test.describe('Given an NGC user', () => {
    test.describe('When landing on the end page with no simulation', () => {
      test('Then it should redirect to the tutorial', async ({ page }) => {
        await page.goto('/fin')

        expect(
          page.locator('h1[data-cypress-id="tutoriel-title"]')
        ).toBeDefined()
      })
    })
  })

  test.describe('Given a NGC user with a filled simulation', () => {
    test.beforeEach(async ({ page }) => {
      let requestCount = 0

      page.on('request', (request) => {
        if (
          request.method() === 'POST' &&
          request.url().includes('/simulations/v1/')
        ) {
          requestCount++
        }
      })

      await page.goto('/simulateur/bilan')

      await dismissCookieBanner(page)

      await clickSkipTutorialButton(page)

      // Wait for the page to be redirected after skipping tutorial
      expect(page).toHaveURL(/.*\/simulateur\/bilan/)

      // Wait for the simulation page to be fully loaded with at least one input
      await page
        .locator('input')
        .first()
        .waitFor({ state: 'attached', timeout: 10000 })
    })

    test.describe('When he saves his/her simulation on the end page', () => {
      test('Then it should save the simulation only once', async ({ page }) => {
        let requestCount = 0

        page.on('request', (request) => {
          if (
            request.method() === 'POST' &&
            request.url().includes('/simulations/v1/')
          ) {
            requestCount++
          }
        })

        await recursivelyFillSimulation(page)

        await page.waitForLoadState('networkidle')

        await page
          .locator(`input[data-cypress-id="${FIN_EMAIL_INPUT}"]`)
          .fill('test@test.com')
        await page
          .locator(`button[data-cypress-id="${FIN_EMAIL_SUBMIT_BUTTON}"]`)
          .click()

        // Wait for the simulation to be saved
        await page.waitForResponse(
          (response) =>
            response.request().method() === 'POST' &&
            response.url().includes('/simulations/v1/')
        )

        expect(requestCount).toBe(1)
      })
    })
  })
})
