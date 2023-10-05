/* eslint-disable cypress/no-assigning-return-values */
import { Promise } from 'core-js'
import { decodeRuleName } from '../../utils/decodeRuleName'
import { checkIfCategoryOrderIsRespected } from '../categories/checkIfCategoryOrderIsRespected'
import { clickNextButton } from '../elements/buttons'

const LAST_QUESTION_ID = 'services sociétaux . question-rhétorique-ok'

export async function recursivelyFillSimulation(persona = {}) {
  return new Promise((resolve) => {
    function answerCurrentQuestion() {
      const inputPromise = cy.get('input')

      function skipQuestion() {
        clickNextButton()
        recursivelyFillSimulation(persona)
      }

      // Cypress doesn't handle async/await
      inputPromise.then((input) => {
        // All questions have been answered
        if (input.length <= 0) {
          resolve()
          return
        }

        const id = decodeRuleName(input.attr('data-cypress-id'))

        // Is last question
        if (id === LAST_QUESTION_ID && input.val() === 'on') {
          clickNextButton()

          cy.get('div[data-cypress-id="fin-slider"]')

          resolve()
          return
        }

        const type = input.attr('type')

        // Questions should follow the order of the categories
        checkIfCategoryOrderIsRespected(id)

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

          clickNextButton()

          // Call itself recursively to go to the next question
          answerCurrentQuestion()
        })
      })
    }

    answerCurrentQuestion()
  })
}
