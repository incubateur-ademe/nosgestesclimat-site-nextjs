import { visit } from '../../../helpers/interactions/visit'

describe('The Diffuser NGC page', { testIsolation: false }, () => {
  it('should render without breaking the app', () => {
    visit('diffuser')

    cy.get('h1').contains('Diffuser Nos Gestes Climat').should('be.visible')
  })
})
