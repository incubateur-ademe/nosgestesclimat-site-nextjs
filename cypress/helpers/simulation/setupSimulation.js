import {
  clickDoTheTestLink,
  clickSkipTutorialButton,
} from '../elements/buttons'

export function setupSimulation() {
  clickDoTheTestLink()

  cy.wait(2000)

  clickSkipTutorialButton()

  cy.wait(2000)
}
