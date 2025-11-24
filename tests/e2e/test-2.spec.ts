import { expect, test } from '@playwright/test'
import { recursivelyFillSimulation } from '../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../helpers/simulation/setupSimulation'

test('My dashboard', async ({ page }) => {
  describe('Given a unlogged user', () => {
    describe('When he completes the simulation', () => {
      setupSimulation(page)
      recursivelyFillSimulation(page)

      test('Then he should be redirected to the end page', () => {
        expect(page.url()).toContain('/fin')
      })
    })

    describe('When he saves his/her simulation', async () => {
      await page.getByRole('textbox', { name: 'nom.prenom@domaine.fr' }).click()
      await page
        .getByRole('textbox', { name: 'nom.prenom@domaine.fr' })
        .fill('benjamin.arias+24-11-2@ext.beta.gouv.fr')
      await page
        .getByRole('button', { name: 'Sauvegarder mes résultats' })
        .click()
      await page
        .getByRole('textbox', { name: 'Entrez votre code de vé' })
        .click()
      await page
        .getByRole('textbox', { name: 'Entrez votre code de vé' })
        .fill('553835')
      test('Then he should be redirected to the dashboard page', () => {
        expect(page.url()).toContain('/mon-espace')
      })
    })

    describe('When he visits the settings page', () => {
      test('Then he should be able to log out', () => {
        expect(page.url()).toContain('/mon-espace/parametres')
      })
    })

    describe('When he/her visits the login page', () => {
      test('Then he should be able to log in', () => {
        expect(page.url()).toContain('/login')
      })
    })
  })
})
