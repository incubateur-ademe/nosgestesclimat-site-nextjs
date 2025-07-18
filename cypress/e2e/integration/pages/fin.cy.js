import {
  FIN_EMAIL_INPUT,
  FIN_EMAIL_SUBMIT_BUTTON,
} from '../../../constants/elements-ids'
import { clickSkipTutorialButton } from '../../../helpers/elements/buttons'
import { visit } from '../../../helpers/interactions/visit'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'

describe('The End page', () => {
  describe('Given an NGC user', () => {
    describe('When landing on the end page with no simulation', () => {
      it('Then it should redirect to the tutorial', () => {
        visit('fin')

        cy.get('h1[data-cypress-id="tutoriel-title"]').should('be.visible')
      })
    })
  })

  describe('Given a NGC user with a filled simulation', () => {
    let requestCount = 0

    beforeEach(() => {
      cy.intercept('POST', '/simulations/v1/**', (req) => {
        requestCount++
      }).as('saveSimulation')

      visit('/simulateur/bilan')

      clickSkipTutorialButton()

      recursivelyFillSimulation()
    })

    describe('When he saves his/her simulation on the end page', () => {
      it('Then it should save the simulation only once', () => {
        cy.get(`input[data-cypress-id="${FIN_EMAIL_INPUT}"]`).type(
          'test@test.com'
        )
        cy.get(`button[data-cypress-id="${FIN_EMAIL_SUBMIT_BUTTON}"]`).click()

        // Wait for the simulation to be saved
        cy.wait(4000).then(() => {
          expect(requestCount).to.eq(1)
        })
      })
    })
  })
})
