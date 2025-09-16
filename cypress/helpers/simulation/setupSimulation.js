import {
  clickDoTheTestLink,
  clickSkipTutorialButton,
} from '../elements/buttons'

export function setupSimulation() {
  clickDoTheTestLink()
  clickSkipTutorialButton()

  // Wait for the page to be redirected after skipping tutorial
  cy.url().should('include', '/simulateur/bilan')
}
