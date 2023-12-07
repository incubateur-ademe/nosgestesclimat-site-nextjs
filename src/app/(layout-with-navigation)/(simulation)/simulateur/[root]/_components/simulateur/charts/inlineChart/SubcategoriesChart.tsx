import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
import { useEngine, useForm, useRule } from '@/publicodes-state'
import { useMemo } from 'react'
import Subcategory from './subcategoriesChart/Subcategory'

export default function SubcategoriesChart() {
  const { subcategories, currentCategory } = useForm()

  const { title, numericValue: total } = useRule(currentCategory || '')

  const { checkIfValid } = useEngine()

  const filteredSubcategories = useMemo(
    () =>
      (currentCategory &&
        subcategories[currentCategory]?.filter((subcategory: string) =>
          checkIfValid(subcategory)
        )) ||
      [],
    [subcategories, currentCategory, checkIfValid]
  )

  return (
    <>
      <div className="flex items-center gap-4">
        <h4
          className="relative text-sm font-normal md:text-2xl"
          data-cypress-id="category-title">
          {title}
        </h4>
      </div>
      <div
        className={`mb-4 flex h-8 md:h-12 ${getBackgroundColor(
          currentCategory
        )}`}>
        {filteredSubcategories.map((subcategory: string, index: number) => (
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
