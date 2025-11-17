import personas from '@incubateur-ademe/nosgestesclimat/public/personas-fr.json' with { type: 'json' }
import { writeFileSync } from 'fs'

/**
 * @param {string} name
 * @param {Record<string, string | number>} data
 * @returns {string}
 */
const getFileContent = (name: string, data: Record<string, string | number>) => `
import { test } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'
import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../helpers/simulation/setupSimulation'

test.describe('Persona ${name}', () => {
  test("can finish the test filling it with their answer values", async ({ page }) => {
    await visit(page, '/')
    await setupSimulation(page)
    await recursivelyFillSimulation(page, ${JSON.stringify(data) ?? '{}'})
  })
})
`

Object.entries(personas).map(([dottedName, data]: [string, any]) => {
  const name = dottedName.split(' . ')[1]
  writeFileSync(
    `./tests/e2e/test-completion/persona-${name}.spec.ts`,
    getFileContent(name, data.situation)
  )
  console.log(`[OK] persona-${name}.spec.ts`)
})

