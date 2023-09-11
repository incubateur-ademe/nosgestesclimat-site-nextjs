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
      <h4 className="text-2xl uppercase">{title}</h4>
      <div className="mb-4 flex h-12" style={{ backgroundColor: color }}>
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
