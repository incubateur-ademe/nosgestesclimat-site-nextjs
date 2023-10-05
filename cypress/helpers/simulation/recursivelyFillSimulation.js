/* eslint-disable cypress/no-assigning-return-values */
import { decodeRuleName } from '../../utils/decodeRuleName'
import { clickNextButton } from '../elements/buttons'

const LAST_QUESTION_ID = 'services sociétaux . question-rhétorique-ok'

export function recursivelyFillSimulation(persona = {}) {
  const inputPromise = cy.get('input')

  function skipQuestion() {
    clickNextButton()
    recursivelyFillSimulation(persona)
  }

  inputPromise.then((input) => {
    // All questions have been answered
    if (input.length <= 0) return

    const id = decodeRuleName(input.attr('data-cypress-id'))

    // Is last question
    if (id === LAST_QUESTION_ID && input.val() === 'on') {
      clickNextButton()
      return
    }

    const type = input.attr('type')

    // No value for this persona
    if (!persona[id]) {
      skipQuestion()
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

      cy.wait(500)

      // Call itself recursively to go to the next question
      recursivelyFillSimulation()
    })
  })
}
