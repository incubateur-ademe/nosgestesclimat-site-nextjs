import { test } from '@playwright/test'
import {
  CREATE_ORGANISATION_BUTTON,
  ORGANISATION_ADMINISTRATOR_FIRST_NAME_INPUT,
  ORGANISATION_ADMINISTRATOR_LAST_NAME_INPUT,
  ORGANISATION_ADMINISTRATOR_POSITION_INPUT,
  ORGANISATION_CONNEXION_EMAIL_INPUT,
  ORGANISATION_CONNEXION_SUBMIT_BUTTON,
  ORGANISATION_CONNEXION_VERIFICATION_CODE_INPUT,
  ORGANISATION_NAME_INPUT,
  ORGANISATION_PAGE_SEE_PARAMETERS_BUTTON,
  POLL_ADMIN_SECTION_SEE_PARAMETERS_BUTTON,
  POLL_CARD_SEE_DETAILS_BUTTON,
  POLL_CREATE_BUTTON,
  POLL_DEFAULT_ADDITIONAL_QUESTIONS_POSTAL_CODE_TOGGLE,
  POLL_EXPECTED_NUMBER_OF_PARTICIPANTS_INPUT,
  POLL_NAME_INPUT,
} from '../../constants/elements-ids'
import { checkA11y } from '../../helpers/accessibility/checkA11y'
import { visit } from '../../helpers/interactions/visit'
import { getVerificationCodeFromScalingo } from '../../utils/getVerificationCodeFromScalingo'

test.describe('On the organisation userflow', () => {
  // Run this test locally only
  test.describe('Given a user', () => {
    test.describe('When he creates an organisation and a poll', () => {
      const shouldRun = process.env.WITH_DB === 'true'

      test.skip(!shouldRun, 'Skipping test - WITH_DB not set')

      test('then it should succeed and return no accessibility violations', async ({
        page,
      }) => {
        await visit(page, '/organisations')

        await page.waitForTimeout(2000)

        await checkA11y(page)

        await visit(page, '/organisations/connexion')

        await page.waitForTimeout(2000)

        await checkA11y(page)

        // Fill the form
        await page
          .locator(`[data-cypress-id="${ORGANISATION_CONNEXION_EMAIL_INPUT}"]`)
          .fill(process.env.VERIFICATION_CODE_EMAIL || '')

        await page
          .locator(`[data-cypress-id="${ORGANISATION_CONNEXION_SUBMIT_BUTTON}"]`)
          .click()

        await page.waitForTimeout(2000)

        await checkA11y(page)

        // Get verification code from database
        const verificationCode = await getVerificationCodeFromScalingo()
        console.log(`Retrieved verification code: ${verificationCode}`)

        await page
          .locator(
            `[data-cypress-id="${ORGANISATION_CONNEXION_VERIFICATION_CODE_INPUT}"]`
          )
          .fill(verificationCode || '')

        await page.waitForTimeout(2000)

        await checkA11y(page)

        // Fill organisation fields
        await page.locator(`[data-cypress-id="${ORGANISATION_NAME_INPUT}"]`).fill('Test Organisation')

        await page
          .locator(`[data-cypress-id="${ORGANISATION_ADMINISTRATOR_FIRST_NAME_INPUT}"]`)
          .fill('John')
        await page
          .locator(`[data-cypress-id="${ORGANISATION_ADMINISTRATOR_LAST_NAME_INPUT}"]`)
          .fill('Doe')

        await page
          .locator(`[data-cypress-id="${ORGANISATION_ADMINISTRATOR_POSITION_INPUT}"]`)
          .fill('Manager')

        await page.locator(`[data-cypress-id="${CREATE_ORGANISATION_BUTTON}"]`).click()

        await page.waitForTimeout(2000)

        await checkA11y(page)

        // Fill poll fields
        await page.locator(`[data-cypress-id="${POLL_NAME_INPUT}"]`).fill('Test Poll')
        await page
          .locator(`[data-cypress-id="${POLL_EXPECTED_NUMBER_OF_PARTICIPANTS_INPUT}"]`)
          .fill('10')
        // Activate postal code toggle
        await page
          .locator(
            `[data-cypress-id="${POLL_DEFAULT_ADDITIONAL_QUESTIONS_POSTAL_CODE_TOGGLE}"]`
          )
          .click()

        await page.locator(`[data-cypress-id="${POLL_CREATE_BUTTON}"]`).click()

        await page.waitForTimeout(2000)

        await checkA11y(page)
      })
    })

    test.describe('When he visits the organisation pages', () => {
      const shouldRun = process.env.WITH_DB === 'true'

      test.skip(!shouldRun, 'Skipping test - WITH_DB not set')

      test('then it should succeed and return no accessibility violations', async ({
        page,
      }) => {
        await visit(page, '/organisations')

        await page.waitForTimeout(2000)

        await checkA11y(page)

        await visit(page, '/organisations/connexion')

        await page.waitForTimeout(2000)

        await checkA11y(page)

        // Fill the form
        await page
          .locator(`[data-cypress-id="${ORGANISATION_CONNEXION_EMAIL_INPUT}"]`)
          .fill(process.env.VERIFICATION_CODE_EMAIL || '')

        await page
          .locator(`[data-cypress-id="${ORGANISATION_CONNEXION_SUBMIT_BUTTON}"]`)
          .click()

        await page.waitForTimeout(2000)

        await checkA11y(page)

        // Get verification code from database
        const verificationCode = await getVerificationCodeFromScalingo()
        console.log(`Retrieved verification code: ${verificationCode}`)

        await page
          .locator(
            `[data-cypress-id="${ORGANISATION_CONNEXION_VERIFICATION_CODE_INPUT}"]`
          )
          .fill(verificationCode || '')

        await page.waitForTimeout(2000)

        await checkA11y(page)

        // Visit the organisation parameters page
        await page
          .locator(`[data-cypress-id="${ORGANISATION_PAGE_SEE_PARAMETERS_BUTTON}"]`)
          .click()

        await page.waitForTimeout(2000)

        await checkA11y(page)

        // Go back to the organisation page
        await page.goBack()

        // Visit the first poll
        await page
          .locator(`[data-cypress-id="${POLL_CARD_SEE_DETAILS_BUTTON}"]`)
          .click()

        await page.waitForTimeout(2000)

        await checkA11y(page)

        // Visit the poll parameters page
        await page
          .locator(`[data-cypress-id="${POLL_ADMIN_SECTION_SEE_PARAMETERS_BUTTON}"]`)
          .click()

        await page.waitForTimeout(2000)

        await checkA11y(page)
      })
    })
  })
})

