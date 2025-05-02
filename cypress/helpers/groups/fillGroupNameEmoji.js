import { click } from '../interactions/click'

export function fillGroupNameEmoji() {
  cy.get('input[data-cypress-id="group-name"]')
    .should('be.visible')
    .type('Jean-Marc groupe')
  click(`label[data-cypress-id="group-select-emoji-🍋"]`)
}
