import personas from '@incubateur-ademe/nosgestesclimat/public/personas-fr.json' with { type: 'json' }
import { expect, test } from '../fixtures'

test.setTimeout(250_000)
for (const persona of Object.values(personas)) {
  test(`It should work for persona « ${persona.nom} »`, async ({
    ngcTest,
    page,
  }) => {
    if (['Nolan'].includes(persona.nom)) {
      // @TODO fix question climatiseur appears at the end of the test
      test.skip()
    }
    await ngcTest.goto()
    await ngcTest.answerTest(persona.situation)
    await expect(page).toHaveURL(/\/fin/)
  })
}

test(`Should be able to deselect a boolean answer`, () => {
  //  1. Trouver une question boolean (passer jusqu'à avoir une question booléénne)
  //  2. Récupérer la valeur du bilan
  //  3. Selectionner une réponse
  //  4. Vérifier que le bouton suivant est affiché
  //  5. Recliquer sur l'element (input) en question
  //  6. Vérifier que la valeur du bilan est identique au 2.
  //  7. Vérifier que le bouton « je ne sais pas » est affiché
})

test(`Should be able to deselect a multiple choice answer`, () => {})

test(`Should be able to deselect a mosaic answer`, () => {})
