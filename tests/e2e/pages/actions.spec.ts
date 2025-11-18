import { expect, test } from '@playwright/test'
import { dismissCookieBanner } from '../../helpers/cookies/dismissCookieBanner'
import { visit } from '../../helpers/interactions/visit'
import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../helpers/simulation/setupSimulation'

test.describe('Action userflow', () => {
  // TODO: modify this test after new user account is implemented
  test.skip()
  test.describe('Given a user', () => {
    test.describe('When he visits the actions page after completing the simulation', () => {
      test('Then it should display correctly and return no accessibility violations', async ({
        page,
      }) => {
        // Actions when user hasn't completed the simulation
        await visit(page, '/actions')

        await page.waitForTimeout(2000)

        await dismissCookieBanner(page)

        const testLangURL =
          process.env.PLAYWRIGHT_testLangURL || process.env.testLangURL
        const expectedText = testLangURL === 'en' ? 'My gestures' : 'Mes gestes'

        expect(
          page.locator('h1').filter({ hasText: expectedText })
        ).toBeDefined()

        // Actions when user has completed the simulation
        await visit(page, '/')

        await setupSimulation(page)

        await recursivelyFillSimulation(page)

        await page.waitForTimeout(4000)

        await visit(page, '/actions')

        await page.waitForTimeout(2000)

        expect(
          page.locator('h1').filter({ hasText: expectedText })
        ).toBeDefined()
      })
    })
  })
})
