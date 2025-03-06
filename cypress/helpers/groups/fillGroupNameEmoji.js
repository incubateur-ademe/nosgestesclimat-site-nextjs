export function fillGroupNameEmoji() {
  cy.get('input[data-cypress-id="group-name"]').type('Jean-Marc groupe')
  cy.get(`label[data-cypress-id="group-select-emoji-🍋"]`).click()
}
