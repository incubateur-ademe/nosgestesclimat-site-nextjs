/* eslint-disable cypress/no-assigning-return-values */
import { Promise } from 'core-js'
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

        const dottedName = input.attr('data-cypress-id')

        cy.log(dottedName)
        // Is last question
        if (dottedName === LAST_QUESTION_ID && input.val() === 'on') {
          clickNextButton()

          cy.wait(10000)

          cy.get('div[data-cypress-id="fin-slider"]')

          resolve()
          return
        }

        const type = input.attr('type')

        // Questions should follow the order of the categories
        checkIfCategoryOrderIsRespected(dottedName)

        cy.log(dottedName, persona?.situation?.[dottedName])

        const definedPersonaDottedNames = Object.keys(
          persona?.situation ?? {}
        ).filter((dottedNameKey) => dottedNameKey.includes(dottedName))
        cy.log(definedPersonaDottedNames)
        // No value for this persona
        if (definedPersonaDottedNames.length <= 0) {
          skipQuestion()
          cy.wait(1000)
          return
        }

        // Single number input or radio
        if (definedPersonaDottedNames.length === 1) {
          cy.get(
            `input[data-cypress-id="${dottedName}${
              type === 'radio' ? `-${persona?.situation?.[dottedName]}` : ''
            }"]`
          ).type(persona.situation[dottedName])

          cy.wait(1000)
        }

        // Is Mosaic
        if (definedPersonaDottedNames.length > 1) {
          for (const mosaicItemDottedName of definedPersonaDottedNames) {
            cy.get(`input[data-cypress-id="${mosaicItemDottedName}"]`).type(
              persona.situation[mosaicItemDottedName]
            )

            cy.wait(1000)
          }
        }

        cy.wait(1000)

        clickNextButton()

        cy.wait(1000)

        // Call itself recursively to go to the next question
        answerCurrentQuestion()
      })
    }

    answerCurrentQuestion()
  })
}
