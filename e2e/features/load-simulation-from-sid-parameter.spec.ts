import { test } from '@playwright/test'
test.skip()

// import { expect, test } from '@playwright/test'
// import {
//   BACK_BUTTON,
//   NEXT_QUESTION_BUTTON,
//   QUESTION_LABEL,
//   SAVE_MODAL_EMAIL_INPUT,
//   SAVE_MODAL_SUBMIT_BUTTON,
//   SKIP_TUTORIAL_BUTTON,
// } from '../../constants/elements-ids'
// import { dismissCookieBanner } from '../../helpers/cookies/dismissCookieBanner'
// import { click } from '../../helpers/interactions/click'
// import { type } from '../../helpers/interactions/type'

// test.describe('Loading the simulation from the sid parameter', () => {
//   test.describe('given the user saves their simulation after answering a question', () => {
//     let simulationId: string | undefined
//     let initialValue: string | undefined

//     test.beforeEach(async ({ page }) => {
//       await page.goto('/tutoriel')

//       await page.waitForLoadState('networkidle')

//       await dismissCookieBanner(page)

//       await page.locator(`[data-testid="${SKIP_TUTORIAL_BUTTON}"]`).click()

//       const questionLabel = page.locator(
//         `[data-testid="${QUESTION_LABEL}"]`
//       )
//       initialValue = (await questionLabel.textContent()) ?? undefined

//       await page.locator('label[data-testid]').first().click()
//       await click(page, NEXT_QUESTION_BUTTON)
//       await click(page, BACK_BUTTON)

//       // Enter the email
//       await expect(
//         page.locator(`[data-testid="${SAVE_MODAL_EMAIL_INPUT}"]`)
//       ).toBeVisible()
//       await type(page, SAVE_MODAL_EMAIL_INPUT, 'test@test2002.com')
//       await click(page, SAVE_MODAL_SUBMIT_BUTTON)

//       // Wait for the simulation to be saved and extract the ID
//       const responsePromise = page.waitForResponse(
//         (response) =>
//           response.request().method() === 'POST' &&
//           response.url().includes('/simulations/v1/')
//       )
//       const response = await responsePromise
//       const responseBody = await response.json()
//       simulationId = responseBody.id
//     })

//     test.describe('when the user visits the simulation link', () => {
//       test('then it should load the simulation with the correct total footprint number', async ({
//         page,
//       }) => {
//         await page.goto(`/simulateur/bilan?sid=${simulationId}`)

//         const questionLabel = page.locator(
//           `[data-testid="${QUESTION_LABEL}"]`
//         )
//         const currentValue = await questionLabel.textContent()
//         expect(currentValue).not.toBe(initialValue)
//       })
//     })
//   })
// })
