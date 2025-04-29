import 'cypress-axe'
import CHECK_A11Y_ELEMENTS_EXCLUDED from '../../constants/accessibility'

export const checkA11y = () => {
  cy.injectAxe()
  cy.checkA11y({
    exclude: CHECK_A11Y_ELEMENTS_EXCLUDED,
  })
}
