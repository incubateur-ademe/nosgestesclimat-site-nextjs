import {
  SAVE_MODAL_EMAIL_INPUT,
  SAVE_MODAL_SUBMIT_BUTTON,
} from '../../../constants/elements-ids'
import {
  clickNextButton,
  clickSkipTutorialButton,
} from '../../../helpers/elements/buttons'
import { click } from '../../../helpers/interactions/click'
import { type } from '../../../helpers/interactions/type'
import { visit } from '../../../helpers/interactions/visit'

describe('Loading the simulation from the sid parameter', () => {
  context(
    'given the user saves their simulation after answering a question',
    () => {
      let simulationId

      beforeEach(() => {
        cy.intercept('POST', '/simulations/v1/**').as('saveSimulation')

        visit('/tutoriel')

        clickSkipTutorialButton()
        click('suggestion-20000')
        clickNextButton()
        click('back-button')

        // Enter the email
        type(SAVE_MODAL_EMAIL_INPUT, 'test@test2002.com')
        click(SAVE_MODAL_SUBMIT_BUTTON)

        // Wait for the simulation to be saved and extract the ID
        cy.wait('@saveSimulation').then((interception) => {
          simulationId = interception.response.body.id
        })
      })

      context('when the user visits the simulation link', () => {
        beforeEach(() => {
          cy.clearLocalStorage()

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
