/* eslint-disable cypress/no-assigning-return-values */
import { encodeRuleName } from '../../utils/encodeRuleName'
import { clickDontKnowButton, clickNextButton } from '../elements/buttons'
import { isMosaicQuestion } from '../getters/isQuestionMosaic'

export function recursivelyFillSimulation(persona = {}) {
  const bodyPromise = cy.get('body')
  const inputPromise = cy.get('input')

  function skipQuestion() {
    clickDontKnowButton()
    recursivelyFillSimulation(persona)
  }

  inputPromise.then((input) => {
    // All questions have been answered
    if (input.length <= 0) return

    const id = input.attr('id')
    const type = input.attr('type')

    bodyPromise.then((body) => {
      if (id && !isMosaicQuestion(body)) {
        // TODO(@EmileRolley): need to specify the behavior for mosaic questions
        cy.log(type)
        cy.url().should('include', encodeRuleName(id))
      }
    })

    // No value for this persona
    if (!persona[id]) {
      cy.url().then(() => {
        skipQuestion()
      })
      return
    }

    const inputTargetedPromise = cy.get(`input[id="${id}"]`)

    inputTargetedPromise.then((inputTargeted) => {
      // Model shenanigans
      if (persona[id].valeur || persona[id].valeur === 0) {
        inputTargeted.type(persona[id].valeur)

        // Text value
      } else if (type === 'text') {
        inputTargeted.type(persona[id])

        // Checkbox value
      } else if (type === 'checkbox') {
        inputTargeted.check(persona[id])
      }

      cy.wait(100)

      clickNextButton()

      // Call itself recursively to go to the next question
      recursivelyFillSimulation()
    })
  })
}
