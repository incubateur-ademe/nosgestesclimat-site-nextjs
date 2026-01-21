// import { expect, test } from '@playwright/test'
// import { dismissCookieBanner } from '../../helpers/cookies/dismissCookieBanner'
// import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'
// import { setupSimulation } from '../../helpers/simulation/setupSimulation'
import { test } from '@playwright/test'
test.skip()

// test.describe('Action userflow', () => {
//   // TODO: modify this test after new user account is implemented
// })
//   test.describe('Given a user', () => {
//     test.describe('When he visits the actions page after completing the simulation', () => {
//       test('Then it should display correctly and return no accessibility violations', async ({
//         page,
//       }) => {
//         // Actions when user hasn't completed the simulation
//         await page.goto('/actions')

//         await dismissCookieBanner(page)

//         const expectedText = 'Mes gestes'

//         expect(
//           page.locator('h1').filter({ hasText: expectedText })
//         ).toBeDefined()

//         // Actions when user has completed the simulation
//         await page.goto('/')

//         await setupSimulation(page)

//         await recursivelyFillSimulation(page)

//         await page.waitForLoadState('networkidle')

//         await page.goto('/actions')

//         await page.waitForLoadState('networkidle')

//         expect(
//           page.locator('h1').filter({ hasText: expectedText })
//         ).toBeDefined()
//       })
//     })
//   })
// })
