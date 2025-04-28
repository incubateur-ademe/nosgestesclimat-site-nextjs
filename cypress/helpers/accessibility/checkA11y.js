import { CHECK_A11Y_ELEMENTS_EXCLUDED } from '../../constants/accessibility'

export function checkA11y() {
  return cy.checkA11y({
    exclude: CHECK_A11Y_ELEMENTS_EXCLUDED,
  })
}
