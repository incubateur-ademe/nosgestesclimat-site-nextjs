import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { useForm, useRule } from '@/publicodes-state'
import { useState } from 'react'
import Subcategory from './category/Subcategory'

type Props = {
  category: string
}

export default function Category({ category }: Props) {
  const { title, value, icons, color } = useRule(category)
  const { subcategories } = useForm()

  const [isOpen, setIsOpen] = useState(false)
  const formattedCarbonFootprint = formatCarbonFootprint(value)

  return (
    <div className="relative mb-4 w-full">
      <button
        disabled={!subcategories[category].length}
        className="block w-full"
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}>
        <h2
          className="mb-0 flex w-full items-center justify-between gap-4 rounded-lg p-4 text-white"
          style={{ backgroundColor: color }}>
          {icons} {title}{' '}
          <span
            className="block rounded-lg bg-white px-4 py-2 text-lg"
            style={{ color }}>
            {formattedCarbonFootprint.formattedValue}{' '}
            {formattedCarbonFootprint.unit}
          </span>
        </h2>
      </button>

      {isOpen
        ? subcategories[category].map((subcategory) => (
            <Subcategory key={subcategory} subcategory={subcategory} />
          ))
        : null}
    </div>
  )
}
