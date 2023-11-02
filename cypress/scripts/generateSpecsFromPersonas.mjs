import { writeFileSync } from 'fs'
import { parse } from 'yaml'

const personas = await fetch(
  'https://raw.githubusercontent.com/incubateur-ademe/nosgestesclimat/preprod/personas/personas-fr.yaml'
)
  .then((r) => r.text())
  .then(parse)

const getFileContent = (name, data) => `
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'

describe('Persona ${name}', () => {
	before(() => {
    cy.visit('/')

    setupSimulation()
  })

	it("can finish the test filling it with their answer values", () => {
		recursivelyFillSimulation(${JSON.stringify(data) ?? '{}'})
	})
})
`

Object.entries(personas).map(([dottedName, data]) => {
  const name = dottedName.split(' . ')[1]
  writeFileSync(
    `./cypress/e2e/integration/test-completion/persona-${name}.cy.js`,
    getFileContent(name, data)
  )
  console.log(JSON.stringify(data))
  console.log(`[OK] persona-${name}.cy.js`)
})
