import {
  DOCUMENTATION_LAUNCH_BUTTON,
  DOCUMENTATION_TITLE,
} from '../../../constants/elements-ids'
import { visit } from '../../../helpers/interactions/visit'

describe('The Documentation page', { testIsolation: false }, () => {
  it('should render without breaking the app (server side rendered)', () => {
    visit('documentation/bilan')

    cy.get(`h1[data-cypress-id="${DOCUMENTATION_TITLE}"]`).should('be.visible')
  })

  it('should render the client side documentation upon click on the launch button', () => {
    cy.get(`button[data-cypress-id="${DOCUMENTATION_LAUNCH_BUTTON}"]`).click()

    cy.get('div[id="documentation-rule-root"]').should('be.visible')
  })
})
