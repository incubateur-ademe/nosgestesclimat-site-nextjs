import { CATEGORIES } from '../../constants/categories'

const categoriesOrderArray = CATEGORIES.map((category) => ({
  key: category,
  hasBeenDisplayed: false,
}))

export function checkIfCategoryOrderIsRespected(questionId) {
  const indexCurrentCategory = categoriesOrderArray.findIndex(
    (category) => category.key === questionId.split(' . ')[0]
  )
  cy.log(
    'indexCurrentCategory',
    indexCurrentCategory,
    categoriesOrderArray[indexCurrentCategory - 1]?.key,
    categoriesOrderArray[indexCurrentCategory - 1]?.hasBeenDisplayed
  )
  if (
    indexCurrentCategory !== 0 &&
    !categoriesOrderArray[indexCurrentCategory - 1]?.hasBeenDisplayed
  ) {
    throw new Error('The category order is not respected.')
  }

  if (!categoriesOrderArray[indexCurrentCategory]?.hasBeenDisplayed) {
    categoriesOrderArray[indexCurrentCategory].hasBeenDisplayed = true
  }
}
