import {
  SAVE_MODAL_EMAIL_INPUT,
  SAVE_MODAL_SUBMIT_BUTTON,
} from '../../../constants/elements-ids'
import { TEST_USER_ID } from '../../../constants/user'
import {
  clickNextButton,
  clickSkipTutorialButton,
} from '../../../helpers/elements/buttons'
import { visit } from '../../../helpers/interactions/visit'

describe('Loading the simulation from the sid parameter', () => {
  context(
    'given the user saves their simulation after answering a question',
    () => {
      let simulationId

      beforeEach(() => {
        cy.intercept('POST', '/simulations/create', (req) => {
          req.body.userId = TEST_USER_ID
        }).as('saveSimulation')

        visit('/tutoriel')

        cy.wait(2000)

        clickSkipTutorialButton()
        cy.get('button[data-cypress-id="suggestion-20000"]').click()
        clickNextButton()
        cy.get('button[data-cypress-id="back-button"]').click()

        // Enter the email
        cy.get(`input[data-cypress-id="${SAVE_MODAL_EMAIL_INPUT}"]`).type(
          'test@test2002.com'
        )
        cy.get(`button[data-cypress-id="${SAVE_MODAL_SUBMIT_BUTTON}"]`).click()

        // Wait for the simulation to be saved and extract the ID
        cy.wait('@saveSimulation').then((interception) => {
          simulationId = interception.response.body.id
        })
      })

      context('when the user visits the simulation link', () => {
        beforeEach(() => {
          cy.visit(`/simulateur/bilan?sid=${simulationId}`)
        })

        it('then it should load the simulation with the correct total footprint number', () => {
          cy.get('div[data-cypress-id="total-footprint-number"]').should(
            'contain',
            '10'
          )
        })
      })
    }
  )
})
