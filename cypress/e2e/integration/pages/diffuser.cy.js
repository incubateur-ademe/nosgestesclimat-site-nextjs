import { visit } from '../../../helpers/interactions/visit'

describe('The Diffuser NGC page', { testIsolation: false }, () => {
  it('has a title', () => {
    visit('diffuser')

    cy.get('h1').contains('Diffuser Nos Gestes Climat').should('be.visible')
  })
})
