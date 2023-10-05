import ValueChangeDisplay from '@/components/misc/ValueChangeDisplay'
import { useEngine, useForm, useRule } from '@/publicodes-state'
import { useMemo } from 'react'
import Subcategory from './subcategoriesChart/Subcategory'

export default function SubcategoriesChart() {
  const { subcategories, currentCategory } = useForm()

  const { numericValue: total } = useRule(
    currentCategory === 'transport'
      ? 'transport . empreinte'
      : currentCategory || ''
  )
  const { title, color } = useRule(currentCategory || '')
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
          className="relative text-xl uppercase md:text-2xl"
          data-cypress-id="category-title">
          {title}
        </h4>
        <ValueChangeDisplay />
      </div>
      <div className="mb-4 flex h-8 md:h-12" style={{ backgroundColor: color }}>
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
