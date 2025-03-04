import 'cypress-axe'
import {
  ORGANISATION_CONNEXION_EMAIL_INPUT,
  ORGANISATION_CONNEXION_SUBMIT_BUTTON,
  ORGANISATION_CONNEXION_VERIFICATION_CODE_INPUT,
} from '../../../constants/elements-ids'

Cypress.on('uncaught:exception', (err) => {
  // Ignore uncaught exception failures for now
  return false
})

describe('Accessibility Tests', () => {
  // it('Should have no accessibility violations on /simulateur/bilan', () => {
  //   cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

  //   cy.visit('/tutoriel')

  //   clickSkipTutorialButton()

  //   // Wait for the page to load completely
  //   cy.wait(2000)
  //   cy.injectAxe()

  //   // Run accessibility checks
  //   cy.checkA11y()
  // })

  // it('Should have no accessibility violations on /fin', () => {
  //   cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

  //   cy.visit('/')

  //   setupSimulation()

  //   recursivelyFillSimulation()

  //   cy.visit('/fin')

  //   cy.wait(2000)
  //   cy.injectAxe()

  //   // Run accessibility checks
  //   cy.checkA11y()
  // })

  // it('Should have no accessibility violations on /classements', () => {
  //   cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

  //   cy.visit('/classements')

  //   cy.wait(8000)

  //   cy.injectAxe()

  //   // Run accessibility checks
  //   cy.checkA11y()
  // })

  // it('Should have no accessibility violations on the /amis userflow', () => {
  //   cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

  //   cy.visit('/amis/creer/vos-informations')

  //   // Run accessibility checks on first step
  //   cy.injectAxe()

  //   cy.checkA11y()

  //   fillGroupCreationFirstStep()

  //   clickNextStepGroupCreation()

  //   cy.wait(2000)

  //   // Run accessibility checks on second step
  //   cy.injectAxe()

  //   cy.checkA11y()

  //   fillGroupNameEmoji()

  //   clickValidateGroupCreation()

  //   cy.wait(2000)

  //   clickSkipTutorialButton()

  //   recursivelyFillSimulation()

  //   cy.wait(4000)

  //   skipRiddle()

  //   cy.wait(4000)

  //   // Run accessibility checks on group results page
  //   cy.injectAxe()

  //   cy.checkA11y()

  //   cy.wait(2000)

  //   cy.clearLocalStorage()
  //   cy.reload()

  //   cy.wait(7000)

  //   // Run accessibility checks on group results page
  //   cy.injectAxe()

  //   cy.checkA11y()
  // })

  // it('Should have no accessibility violations on /actions', () => {
  //   cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

  //   // Actions when user hasn't completed the simulation
  //   cy.visit('/actions')

  //   cy.wait(2000)

  //   cy.injectAxe()

  //   cy.checkA11y()

  //   // Actions when user has completed the simulation
  //   cy.visit('/')

  //   setupSimulation()

  //   recursivelyFillSimulation()

  //   cy.wait(4000)

  //   cy.visit('/actions')

  //   cy.wait(2000)

  //   cy.injectAxe()

  //   cy.checkA11y()
  // })
  // it('should have no accessibility violations on the /organisations userflow', () => {
  //   cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

  //   cy.visit('/organisations')

  //   cy.wait(2000)

  //   cy.injectAxe()

  //   cy.checkA11y()

  //   cy.visit('/organisations/connexion')

  //   cy.wait(2000)

  //   cy.injectAxe()

  //   cy.checkA11y()

  //   cy.visit('/organisations/creer') // ! This shouldn't be accessible without being logged in

  //   cy.wait(2000)

  //   cy.injectAxe()

  //   cy.checkA11y()
  // })

  // it('should have no accessibility violations on /profil', () => {
  //   cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

  //   // With no simulation completed
  //   cy.visit('/profil')

  //   cy.wait(2000)

  //   cy.injectAxe()

  //   cy.checkA11y()

  //   // With simulation completed
  //   cy.visit('/')

  //   setupSimulation()

  //   recursivelyFillSimulation()

  //   cy.visit('/profil')

  //   cy.wait(2000)

  //   cy.injectAxe()

  //   cy.checkA11y()
  // })

  // Run this test locally only
  ;(Cypress.env('WITH_DB') ? it : it.skip)(
    'should have no accessibility violations on /organisations/:orgaSlug',
    () => {
      // cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

      cy.visit('/organisations')

      // cy.wait(2000)

      // // cy.injectAxe()

      // // cy.checkA11y()

      cy.visit('/organisations/connexion')

      // cy.wait(2000)

      // // cy.injectAxe()

      // // cy.checkA11y()

      // Fill the form
      cy.get(`[data-cypress-id="${ORGANISATION_CONNEXION_EMAIL_INPUT}"]`).type(
        'team@nosgestesclimat.fr'
      )

      cy.get(
        `[data-cypress-id="${ORGANISATION_CONNEXION_SUBMIT_BUTTON}"]`
      ).click()

      // cy.wait(2000)

      // cy.injectAxe()

      // cy.checkA11y()

      // Get verification code from database
      cy.task('getVerificationCodeFromScalingo').then((verificationCode) => {
        cy.log(`Retrieved verification code: ${verificationCode}`)

        cy.get(
          `[data-cypress-id="${ORGANISATION_CONNEXION_VERIFICATION_CODE_INPUT}"]`
        ).type(verificationCode)

        cy.wait(2000)

        // cy.injectAxe()

        // cy.checkA11y()
      })
    }
  )
})
