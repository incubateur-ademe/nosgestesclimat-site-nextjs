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

test(`Should be able to deselect a boolean answer`, async ({ ngcTest }) => {
  //  1. Trouver une question boolean (passer jusqu'à avoir une question booléénne)
  await ngcTest.goto()
  while (!(await ngcTest.isBooleanQuestion())) {
    // skip until we have a boolean question
    await ngcTest.clickOnSkip()
  }

  //  2. Récupérer la valeur du bilan
  const carbonFootprintElemBefore = await ngcTest.getCarbonFootprintElem()
  const carbonFootprintValueBeforeChange =
    await carbonFootprintElemBefore.innerText()

  //  3. Selectionner une réponse
  let isAnswered = false
  const answerInput = ngcTest.page.getByTestId(new RegExp('oui-label'))
  if (await answerInput.isVisible()) {
    await answerInput.click()
    isAnswered = true
  }
  //  4. Vérifier que le bouton suivant est affiché
  if (isAnswered) {
    await expect(ngcTest.page.getByTestId('next-question-button')).toBeVisible()
    //  5. Recliquer sur l'element (input) en question
    await answerInput.click()
    isAnswered = false
  }

  if (!isAnswered) {
    //  6. Vérifier que la valeur du bilan est identique au 2.
    const carbonFootprintElemAfter = await ngcTest.getCarbonFootprintElem()
    const carbonFootprintValueAfterChange =
      await carbonFootprintElemAfter.innerText()

    expect(carbonFootprintValueAfterChange).toBe(
      carbonFootprintValueBeforeChange
    )

    //  7. Vérifier que le bouton « je ne sais pas » est affiché
    await expect(ngcTest.page.getByTestId('skip-question-button')).toBeVisible()
  }
})

test(`Should be able to deselect a multiple choice answer`, async ({
  ngcTest,
}) => {
  //  1. Trouver une question `Choices` (passer jusqu'à avoir une question `Choices`)
  await ngcTest.goto()
  while (!(await ngcTest.isChoicesQuestion())) {
    // skip until we have a choices question
    await ngcTest.clickOnSkip()
  }

  //  2. Récupérer la valeur du bilan
  const carbonFootprintElemBefore = await ngcTest.getCarbonFootprintElem()
  const carbonFootprintValueBeforeChange =
    await carbonFootprintElemBefore.innerText()

  //  3. Selectionner une réponse (la dernière de la liste)
  let isAnswered = false
  const answerInput = ngcTest.page.getByTestId(/-label/).last()
  if (await answerInput.isVisible()) {
    await answerInput.click()
    isAnswered = true
  }
  //  4. Vérifier que le bouton suivant est affiché
  if (isAnswered) {
    await expect(ngcTest.page.getByTestId('next-question-button')).toBeVisible()
    //  5. Recliquer sur l'element (input) en question
    await answerInput.click()
    isAnswered = false
  }

  if (!isAnswered) {
    //  6. Vérifier que la valeur du bilan est identique au 2.
    const carbonFootprintElemAfter = await ngcTest.getCarbonFootprintElem()
    const carbonFootprintValueAfterChange =
      await carbonFootprintElemAfter.innerText()

    expect(carbonFootprintValueAfterChange).toBe(
      carbonFootprintValueBeforeChange
    )

    //  7. Vérifier que le bouton « je ne sais pas » est affiché
    await expect(ngcTest.page.getByTestId('skip-question-button')).toBeVisible()
  }
})

test(`Should be able to deselect a mosaic answer`, async ({ ngcTest }) => {
  //  1. Trouver une question `Selection Mosaic` (passer jusqu'à avoir une question `Selection Mosaic`)
  await ngcTest.goto()
  while (!(await ngcTest.isSelectionMosaic())) {
    // skip until we have a selection mosaic question
    await ngcTest.clickOnSkip()
  }

  //  2. Récupérer la valeur du bilan
  const carbonFootprintElemBefore = await ngcTest.getCarbonFootprintElem()
  const carbonFootprintValueBeforeChange =
    await carbonFootprintElemBefore.innerText()

  //  3. Selectionner une réponse (la première de la liste)
  let isAnswered = false
  const answerInput = ngcTest.page.getByTestId(/oui-label/).first()
  if (await answerInput.isVisible()) {
    await answerInput.click()
    isAnswered = true
  }
  //  4. Vérifier que le bouton suivant est affiché
  if (isAnswered) {
    await expect(ngcTest.page.getByTestId('next-question-button')).toBeVisible()
    //  5. Recliquer sur l'element (input) en question
    await answerInput.click()
    isAnswered = false
  }

  if (!isAnswered) {
    //  6. Vérifier que la valeur du bilan est identique au 2.
    const carbonFootprintElemAfter = await ngcTest.getCarbonFootprintElem()
    const carbonFootprintValueAfterChange =
      await carbonFootprintElemAfter.innerText()

    expect(carbonFootprintValueAfterChange).toBe(
      carbonFootprintValueBeforeChange
    )

    //  7. Vérifier que le bouton « je ne sais pas » est affiché
    await expect(ngcTest.page.getByTestId('skip-question-button')).toBeVisible()
  }
})
