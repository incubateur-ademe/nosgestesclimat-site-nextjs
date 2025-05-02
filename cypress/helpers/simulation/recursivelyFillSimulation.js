/* eslint-disable cypress/no-assigning-return-values */
import { Promise } from 'core-js'
import { checkIfCategoryOrderIsRespected } from '../categories/checkIfCategoryOrderIsRespected'
import { clickNextButton } from '../elements/buttons'
import { click } from '../interactions/click'

const LAST_QUESTION_ID = 'services sociétaux . question rhétorique-ok'

export async function recursivelyFillSimulation(persona = {}) {
  return new Promise((resolve) => {
    function answerCurrentQuestion() {
      const inputPromise = cy.get('input')

      // Cypress doesn't handle async/await
      inputPromise.then((input) => {
        // All questions have been answered
        // get current url with cy method
        cy.url().then((url) => {
          if (input.length <= 0 || !url.includes('/simulateur/bilan')) {
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
