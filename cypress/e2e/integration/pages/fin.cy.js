import {
  FIN_EMAIL_INPUT,
  FIN_EMAIL_SUBMIT_BUTTON,
} from '../../../constants/elements-ids'
import { clickSkipTutorialButton } from '../../../helpers/elements/buttons'
import { visit } from '../../../helpers/interactions/visit'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { skipRiddle } from '../../../helpers/simulation/skipRiddle'

describe('The Fin page', () => {
  it('should redirect to the tutorial when no simulation exists', () => {
    visit('fin')

    cy.wait(4000)

    cy.get('h1[data-cypress-id="tutoriel-title"]').should('be.visible')
  })

  context(
    'given the user fills his or her test and accesses the fin page',
    () => {
      let requestCount = 0
      beforeEach(() => {
        cy.intercept('POST', '/simulations/create', (req) => {
          requestCount++
        }).as('saveSimulation')

        visit('/simulateur/bilan')

        clickSkipTutorialButton()

        recursivelyFillSimulation()

        skipRiddle()

        cy.wait(3000)
      })

      context('when the user saves his or her simulation', () => {
        it('then the simulation save request should be sent only once', () => {
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
    }
  )
})
