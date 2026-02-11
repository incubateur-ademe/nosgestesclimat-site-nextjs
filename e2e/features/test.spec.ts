import personas from '@incubateur-ademe/nosgestesclimat/public/personas-fr.json' with { type: 'json' }
import { type Locator } from '@playwright/test'
import { expect, test } from '../fixtures'
import type { NGCTest } from '../fixtures/ngc-test'

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

/**
 * Helper function to test deselection behavior for any question type
 */
async function testDeselectAnswer(
  ngcTest: NGCTest,
  isQuestionType: () => Promise<boolean>,
  getAnswerInput: () => Locator
) {
  //  1. Trouver la question du type spécifique
  await ngcTest.goto()
  while (!(await isQuestionType())) {
    await ngcTest.clickOnSkip()
  }

  //  2. Récupérer la valeur du bilan
  const carbonFootprintElemBefore = await ngcTest.getCarbonFootprintElem()
  const carbonFootprintValueBeforeChange =
    await carbonFootprintElemBefore.innerText()

  //  3. Selectionner une réponse
  let isAnswered = false
  const answerInput = getAnswerInput()
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
}

test(`Should be able to deselect a boolean answer`, async ({ ngcTest }) => {
  await testDeselectAnswer(
    ngcTest,
    () => ngcTest.isBooleanQuestion(),
    () => ngcTest.page.getByTestId(new RegExp('oui-label'))
  )
})

test(`Should be able to deselect a multiple choice answer`, async ({
  ngcTest,
}) => {
  await testDeselectAnswer(
    ngcTest,
    () => ngcTest.isChoicesQuestion(),
    () => ngcTest.page.getByTestId(/-label/).last()
  )
})

test(`Should be able to deselect a mosaic answer`, async ({ ngcTest }) => {
  await testDeselectAnswer(
    ngcTest,
    () => ngcTest.isSelectionMosaic(),
    () => ngcTest.page.getByTestId(/oui-label/).first()
  )
})
