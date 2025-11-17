import { expect, test } from '@playwright/test'
import {
  BACK_BUTTON,
  CAR_TYPE_INPUT,
  QUESTION_LABEL,
  SAVE_MODAL_EMAIL_INPUT,
  SAVE_MODAL_SUBMIT_BUTTON,
} from '../../constants/elements-ids'
import {
  clickNextButton,
  clickSkipTutorialButton,
} from '../../helpers/elements/buttons'
import { click } from '../../helpers/interactions/click'
import { type } from '../../helpers/interactions/type'
import { visit } from '../../helpers/interactions/visit'

test.describe('Loading the simulation from the sid parameter', () => {
  test.describe('given the user saves their simulation after answering a question', () => {
    let simulationId: string | undefined
    let initialValue: string | undefined

    test.beforeEach(async ({ page }) => {
      await visit(page, '/tutoriel')

      await clickSkipTutorialButton(page)

      const questionLabel = page.locator(
        `[data-cypress-id="${QUESTION_LABEL}"]`
      )
      expect(questionLabel).toBeDefined()
      initialValue = (await questionLabel.textContent()) ?? undefined

      await click(page, CAR_TYPE_INPUT)
      await clickNextButton(page)
      await click(page, BACK_BUTTON)

      // Enter the email
      await type(page, SAVE_MODAL_EMAIL_INPUT, 'test@test2002.com')
      await click(page, SAVE_MODAL_SUBMIT_BUTTON)

      // Wait for the simulation to be saved and extract the ID
      const responsePromise = page.waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          response.url().includes('/simulations/v1/')
      )
      const response = await responsePromise
      const responseBody = await response.json()
      simulationId = responseBody.id
    })

    test.describe('when the user visits the simulation link', () => {
      test.beforeEach(async ({ page }) => {
        await page.evaluate(() => localStorage.clear())

        await visit(page, `/simulateur/bilan?sid=${simulationId}`)
      })

      test('then it should load the simulation with the correct total footprint number', async ({
        page,
      }) => {
        await page.waitForTimeout(6000)
        const questionLabel = page.locator(
          `[data-cypress-id="${QUESTION_LABEL}"]`
        )
        const currentValue = await questionLabel.textContent()
        expect(currentValue).not.toBe(initialValue)
      })
    })
  })
})
