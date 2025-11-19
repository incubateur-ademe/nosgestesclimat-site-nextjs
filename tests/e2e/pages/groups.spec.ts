import { expect, test } from '@playwright/test'
import { dismissCookieBanner } from '../../helpers/cookies/dismissCookieBanner'
import { SKIP_TUTORIAL_BUTTON } from '../../constants/elements-ids'
import { clickNextStepGroupCreation } from '../../helpers/groups/clickNextStepGroupCreation'
import { clickValidateGroupCreation } from '../../helpers/groups/clickValidateGroupCreation'
import { fillGroupCreationFirstStep } from '../../helpers/groups/fillGroupCreationFirstStep'
import { fillGroupNameEmoji } from '../../helpers/groups/fillGroupNameEmoji'
import { click } from '../../helpers/interactions/click'
import { type } from '../../helpers/interactions/type'
import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'

test.describe('Group userflow', () => {
  // TODO: modify this test after new user account is implemented
  test.skip()

  test.describe('Given a user', () => {
    test.describe('When he creates a new group', () => {
      test('then it should succeed and return no accessibility violations', async ({
        page,
      }) => {
        await page.goto('/classements')

        await page.evaluate(() => localStorage.clear())

        await dismissCookieBanner(page)

        // Wait for navigation after clicking the button to prevent multiple clicks
        await Promise.all([
          page.waitForURL(/.*\/amis\/creer\/vos-informations/),
          click(page, 'button-create-first-group'),
        ])

        // Wait for the form to be loaded before interacting with inputs
        await page
          .locator('input[data-cypress-id="group-input-owner-name"]')
          .waitFor({ state: 'visible' })

        await page
          .locator('input[data-cypress-id="group-input-owner-name"]')
          .clear()

        // Check that we can create our first group
        await fillGroupCreationFirstStep(page)

        await clickNextStepGroupCreation(page)

        // Continue and choose group name and emoji
        await fillGroupNameEmoji(page)

        await clickValidateGroupCreation(page)
        // Fill simulation
        await page.locator(`[data-cypress-id="${SKIP_TUTORIAL_BUTTON}"]`).click()

        // Wait for the page to be redirected after skipping tutorial
        expect(page).toHaveURL(/.*\/simulateur\/bilan/)

        // Wait for the simulation page to be fully loaded with at least one input
        await page
          .locator('input')
          .first()
          .waitFor({ state: 'attached', timeout: 10000 })

        await recursivelyFillSimulation(page)

        expect(page.locator('[data-cypress-id="group-name"]')).toBeDefined()

        // And that we can delete it
        await click(page, 'button-delete-group')
        await click(page, 'button-confirm-delete-group')

        // Navigate back to classements page to see the create button again
        await page.goto('/classements')

        // Check that we can create a second group
        // Wait for navigation after clicking the button to prevent multiple clicks
        await Promise.all([
          page.waitForURL(/.*\/amis\/creer\/vos-informations/),
          click(page, 'button-create-first-group'),
        ])

        // Wait for the form to be loaded before interacting with inputs
        await page
          .locator('input[data-cypress-id="group-input-owner-name"]')
          .waitFor({ state: 'visible' })

        await page
          .locator('input[data-cypress-id="group-input-owner-name"]')
          .clear()
        await page
          .locator('input[data-cypress-id="group-input-owner-email"]')
          .clear()

        await dismissCookieBanner(page)

        await fillGroupCreationFirstStep(page)

        await clickNextStepGroupCreation(page)

        // Continue and choose group name and emoji
        await fillGroupNameEmoji(page)

        await clickValidateGroupCreation(page)

        // And that we can update its name
        await click(page, 'group-name-edit-button')

        const newName = 'Les amis de Jean-Marc'

        await page
          .locator('input[data-cypress-id="group-edit-input-name"]')
          .clear()

        await type(page, 'group-edit-input-name', newName)
        await click(page, 'button-inline-input')

        expect(page.locator('[data-cypress-id="group-name"]')).toContainText(
          newName
        )

        await page.evaluate(() => localStorage.clear())
        await page.reload()

        await dismissCookieBanner(page)

        await type(page, 'member-name', 'Jean-Claude')

        await click(page, 'button-join-group')

        await page.locator(`[data-cypress-id="${SKIP_TUTORIAL_BUTTON}"]`).click()

        // Wait for the page to be redirected after skipping tutorial
        expect(page).toHaveURL(/.*\/simulateur\/bilan/)

        // Wait for the simulation page to be fully loaded with at least one input
        await page
          .locator('input')
          .first()
          .waitFor({ state: 'attached', timeout: 10000 })

        await recursivelyFillSimulation(page)

        await page.waitForTimeout(2000)

        expect(page.locator('[data-cypress-id="group-name"]')).toBeDefined()

        // Check that the main sections are displayed
        // TODO: improve test to handle checking the display of the points forts and faibles
        // expect(page.locator('[data-cypress-id="points-fort-faibles-title"]')).toBeDefined()
        expect(
          page.locator('[data-cypress-id="votre-empreinte-title"]')
        ).toBeDefined()
      })
    })
  })
})
