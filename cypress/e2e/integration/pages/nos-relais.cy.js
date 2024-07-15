import { visit } from '../../../helpers/interactions/visit'

describe('The page relays', () => {
  it('should render without breaking the app', () => {
    visit('nos-relais')

    cy.get('h1')
      .contains(
        Cypress.env('testLangURL') === 'en'
          ? 'They relay Nos Gestes Climat'
          : 'Ils relaient Nos Gestes Climat'
      )
      .should('be.visible')
  })
})
