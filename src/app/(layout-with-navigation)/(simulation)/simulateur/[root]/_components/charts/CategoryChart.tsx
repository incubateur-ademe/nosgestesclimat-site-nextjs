import { useEngine, useForm, useRule } from '@/publicodes-state'
import { useMemo } from 'react'

import Subcategory from './categoryChart/Subcategory'

export default function Charts() {
  const { subcategories, currentCategory } = useForm()

  const { value: total } = useRule(
    currentCategory === 'transport' ? 'transport . empreinte' : currentCategory
  )
  const { title, color } = useRule(currentCategory)
  const { checkIfValid } = useEngine()

  const filteredSubcategories = useMemo(
    () =>
      subcategories[currentCategory]?.filter((subcategory: string) =>
        checkIfValid(subcategory)
      ) || [],
    [subcategories, currentCategory, checkIfValid]
  )

  return (
    <>
      <h4 className="uppercase text-2xl">{title}</h4>
      <div
        className="flex h-12 rounded overflow-hidden"
        style={{ backgroundColor: color }}>
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
