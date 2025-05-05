import {
  BACK_BUTTON,
  CAR_OPTION_20_000_KM,
  QUESTION_LABEL,
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
      let initialValue

      beforeEach(() => {
        cy.intercept('POST', '/simulations/v1/**').as('saveSimulation')

        visit('/tutoriel')

        clickSkipTutorialButton()

        cy.get(`[data-cypress-id="${QUESTION_LABEL}"]`)
          .should('be.visible')
          .invoke('text')
          .then((text) => {
            initialValue = text
          })

        click(CAR_OPTION_20_000_KM)
        clickNextButton()
        click(BACK_BUTTON)

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
          cy.wait(6000)
          cy.get(`[data-cypress-id="${QUESTION_LABEL}"]`)
            .invoke('text')
            .should('not.equal', initialValue)
        })
      })
    }
  )
})
