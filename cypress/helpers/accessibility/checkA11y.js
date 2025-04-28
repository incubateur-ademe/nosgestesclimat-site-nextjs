import 'cypress-axe'
import { CHECK_A11Y_ELEMENTS_EXCLUDED } from '../../constants/accessibility'

export const checkA11y = () => {
  cy.injectAxe()
  cy.checkA11y(
    {
      exclude: CHECK_A11Y_ELEMENTS_EXCLUDED,
    },
    (violations) => {
      if (violations.length) {
        cy.task(
          'log',
          `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} detected`
        )
        violations.forEach(({ id, impact, description, nodes }) => {
          cy.task('log', `[${impact}] ${id}: ${description}`)
          nodes.forEach(({ target }) => cy.task('log', `  Node: ${target}`))
        })
      }
    }
  )
}
