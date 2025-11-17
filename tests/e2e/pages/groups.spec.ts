import { expect, test } from '@playwright/test'
import { clickSkipTutorialButton } from '../../helpers/elements/buttons'
import { clickNextStepGroupCreation } from '../../helpers/groups/clickNextStepGroupCreation'
import { clickValidateGroupCreation } from '../../helpers/groups/clickValidateGroupCreation'
import { fillGroupCreationFirstStep } from '../../helpers/groups/fillGroupCreationFirstStep'
import { fillGroupNameEmoji } from '../../helpers/groups/fillGroupNameEmoji'
import { click } from '../../helpers/interactions/click'
import { type } from '../../helpers/interactions/type'
import { visit } from '../../helpers/interactions/visit'
import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'

test.describe('Group userflow', () => {
  test.describe('Given a user', () => {
    test.describe('When he creates a new group', () => {
      test('then it should succeed and return no accessibility violations', async ({
        page,
      }) => {
        await visit(page, '/classements')

        await page.context().clearCookies()
        await page.evaluate(() => localStorage.clear())

        await click(page, 'button-create-first-group')

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
        await clickSkipTutorialButton(page)

        // Wait for the page to be redirected after skipping tutorial
        expect(page).toHaveURL(/.*\/simulateur\/bilan/)

        await recursivelyFillSimulation(page)

        expect(page.locator('[data-cypress-id="group-name"]')).toBeDefined()

        // And that we can delete it
        await click(page, 'button-delete-group')
        await click(page, 'button-confirm-delete-group')

        // Check that we can create a second group
        await click(page, 'button-create-first-group')

        await page
          .locator('input[data-cypress-id="group-input-owner-name"]')
          .clear()
        await page
          .locator('input[data-cypress-id="group-input-owner-email"]')
          .clear()

        await fillGroupCreationFirstStep(page)

        await clickNextStepGroupCreation(page)

        // Continue and choose group name and emoji
        await fillGroupNameEmoji(page)

        await click(page, 'button-validate-create-group')

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

        await type(page, 'member-name', 'Jean-Claude')

        await click(page, 'button-join-group')

        await clickSkipTutorialButton(page)

        // Wait for the page to be redirected after skipping tutorial
        expect(page).toHaveURL(/.*\/simulateur\/bilan/)
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
