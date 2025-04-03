import ValueChangeDisplay from '@/components/misc/ValueChangeDisplay'
import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
import { useEngine, useFormState, useRule } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useMemo } from 'react'
import Subcategory from './subcategoriesChart/Subcategory'

export default function SubcategoriesChart() {
  const { currentCategory } = useFormState()

  const { title, numericValue: total } = useRule(
    currentCategory || ('' as DottedName)
  )

  const { checkIfValid, subcategories } = useEngine()

  const filteredSubcategories = useMemo(
    () =>
      (currentCategory &&
        subcategories?.filter(
          (subcategory) =>
            subcategory?.startsWith(currentCategory) &&
            checkIfValid(subcategory)
        )) ||
      [],
    [subcategories, currentCategory, checkIfValid]
  )

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        <h2
          className="relative mb-0 text-lg md:text-2xl"
          data-cypress-id="category-title">
          {title}
        </h2>
        <ValueChangeDisplay />
      </div>
      <div
        className={`mb-4 flex h-8 rounded-md md:h-12 md:rounded-xl ${getBackgroundColor(
          currentCategory
        )}`}>
        {filteredSubcategories.map((subcategory: DottedName, index: number) => (
          <Subcategory
            key={subcategory}
            position={
              index === 0
                ? 'first'
                : index === filteredSubcategories.length - 1
                  ? 'last'
                  : 'middle'
            }
            total={total}
            subcategory={subcategory}
          />
        ))}
      </div>
    </>
  )
}
