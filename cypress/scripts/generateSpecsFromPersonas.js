import { readFileSync, writeFileSync } from 'fs'
import { parse } from 'yaml'

const personas = parse(
  readFileSync('./nosgestesclimat/personas/personas-fr.yaml', 'utf8')
)

const getFileContent = (name, data) => `
import { recursivelyFillSimulation } from '../helpers/simulation/recursivelyFillSimulation'
import { clickSeeResultsLink } from '../helpers/elements/buttons'

describe('check for test completion', () => {
	it("can finish the test with persona '${name}' values", () => {
		cy.session('${name}', () => {
			cy.visit(\`/?loc=\${Cypress.env('localisation_param')}&lang=\${Cypress.env('language_param')}\`)

			recursivelyFillSimulation(${JSON.stringify(data.data)})

			clickSeeResultsLink()
		})
	})
})
`

Object.entries(personas).map(([dottedName, data]) => {
  const name = dottedName.split(' . ')[1]
  writeFileSync(
    `./cypress/e2e/test-completion/persona-${name}.cy.js`,
    getFileContent(name, data)
  )
  console.log(`[OK] persona-${name}.cy.js`)
})
