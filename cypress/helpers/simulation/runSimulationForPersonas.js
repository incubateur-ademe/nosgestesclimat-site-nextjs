import { encodeRuleName } from '../../utils/encodeRuleName'
import { clickDontKnowButton, clickNextButton } from '../elements/buttons'
import { isMosaicQuestion } from '../getters/isQuestionMosaic'
import { waitWhileLoading } from '../misc/waitWhileLoading'

export async function runSimulationForPersonas(persona = {}) {
  cy.wait(100)

  waitWhileLoading()

  cy.get('body').then((body) => {
    if (body.find('section').length > 0) {
      if (body.find('input').length > 0) {
        cy.get('input').then((input) => {
          const id = input.attr('id')
          const type = input.attr('type')

          if (id != undefined && !isMosaicQuestion(body)) {
            // TODO(@EmileRolley): need to specify the behavior for mosaic questions
            cy.log(type)
            cy.url().should('include', encodeRuleName(id))
          }

          if (persona[id]) {
            if (persona[id].valeur || persona[id].valeur === 0) {
              cy.get(`input[id="${id}"]`).type(persona[id].valeur)
            } else {
              if (type === 'text') {
                cy.get(`input[id="${id}"]`).type(persona[id])
              } else {
                cy.get(`input[name="${id}"]`).check(persona[id])
              }
            }
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(100)
            if (body.find('.hide')?.length > 0) {
              // Close the notification window
              cy.get('.hide').last().click()
            }
            clickNextButton()
            runSimulationForPersonas(persona)
          }
        })
      }

      cy.url().then(() => {
        clickDontKnowButton()

        runSimulationForPersonas(persona)
      })
    }
  })
}
