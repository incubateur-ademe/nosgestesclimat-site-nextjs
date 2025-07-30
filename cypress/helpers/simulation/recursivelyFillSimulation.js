/* eslint-disable cypress/no-assigning-return-values */
import { Promise } from 'core-js'
import { checkIfCategoryOrderIsRespected } from '../categories/checkIfCategoryOrderIsRespected'
import { clickNextButton } from '../elements/buttons'
import { click } from '../interactions/click'

const LAST_QUESTION_ID = 'services sociétaux . question rhétorique-ok'

export async function recursivelyFillSimulation(persona = {}) {
  return new Promise((resolve) => {
    function answerCurrentQuestion() {
      // Wait for the page to be ready and check if we're still on a simulation page
      cy.url().then((url) => {
        cy.log('url', url)
        // If we're not on a simulation page anymore, we're done
        if (!url.includes('/simulateur/bilan')) {
          resolve()
          return
        }

        // Wait for the page to be fully loaded
        cy.get('body').should('be.visible')

        // Check if there are any inputs on the page with a reasonable timeout
        // Use Cypress's built-in retry mechanism
        cy.get('input', { timeout: 15000 }).then((input) => {
          // All questions have been answered
          if (input.length <= 0) {
            resolve()
            return
          }

          // @bjlaa: this is a hack to be able to differenciate between
          // mosaics and single questions ; single questions have not mosaicDottedName defined
          const inputAttributes = input.attr('data-cypress-id')
          const [dottedName, mosaicDottedName] = inputAttributes
            ? inputAttributes.split('---')
            : []

          function skipQuestion() {
            clickNextButton()

            answerCurrentQuestion()
          }

          // Is last question
          if (dottedName === LAST_QUESTION_ID) {
            clickNextButton()

            return resolve()
          }

          // Questions should follow the order of the categories
          checkIfCategoryOrderIsRespected(dottedName)

          const type = input.attr('type')

          // Special case : radios
          if (type === 'radio') {
            const [dottedNameWithoutValueSuffix, value] = dottedName.split('-')
            if (persona?.situation?.[dottedNameWithoutValueSuffix] === value) {
              click(`label[data-cypress-id="${dottedName}-label"]`)
            } else if (!dottedName === LAST_QUESTION_ID) {
              skipQuestion()
            }
          }

          // No value for this persona
          if (!persona?.situation?.[dottedName]) {
            skipQuestion()
            return
          }

          // Single number input or radio
          if (!mosaicDottedName && persona?.situation?.[dottedName]) {
            cy.get(`input[data-cypress-id="${dottedName}"]`)
              .should('be.visible')
              .type(persona.situation[dottedName])
          }

          const mosaicChildren = Object.keys(persona?.situation ?? {}).filter(
            (dottedNameKey) => dottedNameKey.includes(mosaicDottedName)
          )

          // Is Mosaic
          if (mosaicChildren.length > 1) {
            for (const mosaicItemDottedName of mosaicChildren) {
              cy.get(
                `input[data-cypress-id="${mosaicItemDottedName}---${mosaicDottedName}"]`
              )
                .should('be.visible')
                .type(persona.situation[mosaicItemDottedName])
            }
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
