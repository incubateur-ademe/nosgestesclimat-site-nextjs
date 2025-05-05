import { click } from '../interactions/click'

export function skipRiddle() {
  cy.get('h1').then((element) => {
    if (
      element
        .text()
        .includes(
          Cypress.env('testLangURL') === 'en'
            ? "Let's finish with a riddle!"
            : 'Une devinette pour finir !'
        )
    ) {
      click('[data-cypress-id="button-skip-quiz"]')
    }
  })
}
