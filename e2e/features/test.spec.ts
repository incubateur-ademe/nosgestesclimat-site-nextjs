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
  await ngcTest.testDeselectAnswer(
    () => ngcTest.isBooleanQuestion(),
    () => ngcTest.page.getByTestId(new RegExp('oui-label'))
  )
})

test(`Should be able to deselect a multiple choice answer`, async ({
  ngcTest,
}) => {
  await ngcTest.testDeselectAnswer(
    () => ngcTest.isChoicesQuestion(),
    () => ngcTest.page.getByTestId(/-label/).last()
  )
})

test(`Should be able to deselect a mosaic answer`, async ({ ngcTest }) => {
  await ngcTest.testDeselectAnswer(
    () => ngcTest.isSelectionMosaic(),
    () => ngcTest.page.getByTestId(/oui-label/).first()
  )
})
