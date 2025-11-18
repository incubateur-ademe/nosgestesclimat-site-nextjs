import { expect, test } from '@playwright/test'
import { dismissCookieBanner } from '../../helpers/cookies/dismissCookieBanner'
import { clickNextButton } from '../../helpers/elements/buttons'
import { visit } from '../../helpers/interactions/visit'
import { setupSimulation } from '../../helpers/simulation/setupSimulation'

const thirdQuestion = 'transport.deux_roues.usager'

test.use({
  storageState: undefined,
})

test.describe('Simulation page', () => {
  test(`should redirect to the last question answered when the "bilan" root is defined`, async ({
    page,
  }) => {
    await visit(page, '/')

    await dismissCookieBanner(page)

    await setupSimulation(page)

    for (let i = 0; i < 2; i++) {
      await clickNextButton(page)
    }

    expect(page).toHaveURL(new RegExp(`.*question=${thirdQuestion}`))

    await visit(page, `/simulateur/bilan?question=logement.surface`)

    expect(page).toHaveURL(new RegExp(`.*question=${thirdQuestion}`))
  })
})
