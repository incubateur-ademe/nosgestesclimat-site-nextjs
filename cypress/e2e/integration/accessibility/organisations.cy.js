import 'cypress-axe'
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
} from '../../../constants/elements-ids'

Cypress.on('uncaught:exception', (err) => {
  // Ignore uncaught exception failures for now
  return false
})

describe('Accessibility Tests', () => {
  // Run this test locally only
  ;(Cypress.env('WITH_DB') ? it : it.skip)(
    'should return no accessibility violations on the organisation creation and poll creation userflow',
    () => {
      cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

      cy.visit('/organisations')

      cy.wait(2000)

      cy.injectAxe()

      cy.checkA11y()

      cy.visit('/organisations/connexion')

      cy.wait(2000)

      cy.injectAxe()

      cy.checkA11y()

      // Fill the form
      cy.get(`[data-cypress-id="${ORGANISATION_CONNEXION_EMAIL_INPUT}"]`).type(
        Cypress.env('VERIFICATION_CODE_EMAIL')
      )

      cy.get(
        `[data-cypress-id="${ORGANISATION_CONNEXION_SUBMIT_BUTTON}"]`
      ).click()

      cy.wait(2000)

      cy.injectAxe()

      cy.checkA11y()

      // Get verification code from database
      cy.task('getVerificationCodeFromScalingo').then((verificationCode) => {
        cy.log(`Retrieved verification code: ${verificationCode}`)

        cy.get(
          `[data-cypress-id="${ORGANISATION_CONNEXION_VERIFICATION_CODE_INPUT}"]`
        ).type(verificationCode)

        cy.wait(2000)

        cy.injectAxe()

        cy.checkA11y()

        // Fill organisation fields
        cy.get(`[data-cypress-id="${ORGANISATION_NAME_INPUT}"]`).type(
          'Test Organisation'
        )

        cy.get(
          `[data-cypress-id="${ORGANISATION_ADMINISTRATOR_FIRST_NAME_INPUT}"]`
        ).type('John')
        cy.get(
          `[data-cypress-id="${ORGANISATION_ADMINISTRATOR_LAST_NAME_INPUT}"]`
        ).type('Doe')

        cy.get(
          `[data-cypress-id="${ORGANISATION_ADMINISTRATOR_POSITION_INPUT}"]`
        ).type('Manager')

        cy.get(`[data-cypress-id="${CREATE_ORGANISATION_BUTTON}"]`).click()

        cy.wait(2000)

        cy.injectAxe()

        cy.checkA11y()

        // Fill poll fields
        cy.get(`[data-cypress-id="${POLL_NAME_INPUT}"]`).type('Test Poll')
        cy.get(
          `[data-cypress-id="${POLL_EXPECTED_NUMBER_OF_PARTICIPANTS_INPUT}"]`
        ).type('10')
        // Activate postal code toggle
        cy.get(
          `[data-cypress-id="${POLL_DEFAULT_ADDITIONAL_QUESTIONS_POSTAL_CODE_TOGGLE}"]`
        ).click()

        cy.get(`[data-cypress-id="${POLL_CREATE_BUTTON}"]`).click()

        cy.wait(2000)

        cy.injectAxe()

        cy.checkA11y()
      })
    }
  )

  describe('A created organisation and a poll with 3+ participants', () => {
    // Run this test locally only
    ;(Cypress.env('WITH_DB') ? it : it.skip)(
      'should have no accessibility violations on the organisations pages',
      () => {
        cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

        cy.visit('/organisations')

        cy.wait(2000)

        cy.injectAxe()

        cy.checkA11y()

        cy.visit('/organisations/connexion')

        cy.wait(2000)

        cy.injectAxe()

        cy.checkA11y()

        // Fill the form
        cy.get(
          `[data-cypress-id="${ORGANISATION_CONNEXION_EMAIL_INPUT}"]`
        ).type(Cypress.env('VERIFICATION_CODE_EMAIL'))

        cy.get(
          `[data-cypress-id="${ORGANISATION_CONNEXION_SUBMIT_BUTTON}"]`
        ).click()

        cy.wait(2000)

        cy.injectAxe()

        cy.checkA11y()

        // Get verification code from database
        cy.task('getVerificationCodeFromScalingo').then((verificationCode) => {
          cy.log(`Retrieved verification code: ${verificationCode}`)

          cy.get(
            `[data-cypress-id="${ORGANISATION_CONNEXION_VERIFICATION_CODE_INPUT}"]`
          ).type(verificationCode)

          cy.wait(2000)

          cy.injectAxe()

          cy.checkA11y()

          // Visit the organisation parameters page
          cy.get(
            `[data-cypress-id="${ORGANISATION_PAGE_SEE_PARAMETERS_BUTTON}"]`
          ).click()

          cy.wait(2000)

          cy.injectAxe()

          cy.checkA11y()

          // Go back to the organisation page
          cy.go('back')

          // Visit the first poll
          cy.get(`[data-cypress-id="${POLL_CARD_SEE_DETAILS_BUTTON}"]`).click()

          cy.wait(2000)

          cy.injectAxe()

          cy.checkA11y()

          // Visit the poll parameters page
          cy.get(
            `[data-cypress-id="${POLL_ADMIN_SECTION_SEE_PARAMETERS_BUTTON}"]`
          ).click()

          cy.wait(2000)

          cy.injectAxe()

          cy.checkA11y()
        })
      }
    )
  })
})
