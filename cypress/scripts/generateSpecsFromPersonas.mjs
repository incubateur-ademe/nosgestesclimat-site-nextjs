import { writeFileSync } from 'fs'

const personas = await fetch(
  `https://nosgestesclimat-api.osc-fr1.scalingo.io/latest/fr/personas`
).then((r) => r.json())

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
  console.log(`[OK] persona-${name}.cy.js`)
})
