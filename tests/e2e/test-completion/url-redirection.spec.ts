import { expect, test } from '@playwright/test'
import { NEXT_QUESTION_BUTTON } from '../../constants/elements-ids'
import { dismissCookieBanner } from '../../helpers/cookies/dismissCookieBanner'
import { setupSimulation } from '../../helpers/simulation/setupSimulation'

const thirdQuestion = 'transport.deux_roues.usager'

test.use({
  storageState: undefined,
})

test.describe('Simulation page', () => {
  test(`should redirect to the last question answered when the "bilan" root is defined`, async ({
    page,
  }) => {
    await page.goto('/')

    await dismissCookieBanner(page)

    await setupSimulation(page)

    for (let i = 0; i < 2; i++) {
      await page.locator(`[data-cypress-id="${NEXT_QUESTION_BUTTON}"]`).click()
    }

    expect(page).toHaveURL(new RegExp(`.*question=${thirdQuestion}`))

    await page.goto(`/fr/simulateur/bilan?question=logement.surface`)

    await page.waitForLoadState('networkidle')

    expect(page).toHaveURL(new RegExp(`.*question=${thirdQuestion}`))
  })
})
