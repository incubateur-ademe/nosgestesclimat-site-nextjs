import {
  PLAN_ACTIONS_TITLE,
  PLAN_OUTILS_TITLE,
} from '../../../constants/elements-ids'
import { visit } from '../../../helpers/interactions/visit'

describe('The Plan du site page', { testIsolation: false }, () => {
  it('should render without breaking the app', () => {
    visit('plan-du-site')

    cy.get('h1')
      .contains(
        Cypress.env('testLangURL') === 'en' ? 'Site map' : 'Plan du site'
      )
      .should('be.visible')
  })

  it('should display hardcoded elements and dynamically generated elements (the actions list)', () => {
    cy.get(`h2[data-cypress-id="${PLAN_OUTILS_TITLE}"`).should('be.visible')

    cy.get(`h2[data-cypress-id="${PLAN_ACTIONS_TITLE}"`).should('be.visible')
  })
})
