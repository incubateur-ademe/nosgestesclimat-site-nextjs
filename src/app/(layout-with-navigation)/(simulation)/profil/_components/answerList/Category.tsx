'use client'

import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import {
  getBackgroundColor,
  getTextColor,
} from '@/helpers/getCategoryColorClass'
import { useForm, useRule } from '@/publicodes-state'
import { useState } from 'react'
import Subcategory from './category/Subcategory'

type Props = {
  category: string
}

export default function Category({ category }: Props) {
  const { title, numericValue, icons } = useRule(category)
  const { subcategories } = useForm()

  const [isOpen, setIsOpen] = useState(false)
  const formattedCarbonFootprint = formatCarbonFootprint(numericValue)

  return (
    <div className="relative mb-4 w-full">
      <button
        disabled={!subcategories[category].length}
        className="block w-full"
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}>
        <h3
          className={`mb-0 flex w-full items-center justify-between gap-4 rounded-lg p-4 text-white ${getBackgroundColor(
            category
          )}`}>
          {icons} {title}{' '}
          <span
            className={`block rounded-lg bg-white px-4 py-2 text-lg ${getTextColor(
              category
            )}`}>
            {formattedCarbonFootprint.formattedValue}{' '}
            {formattedCarbonFootprint.unit}
          </span>
        </h3>
      </button>

      {isOpen
        ? subcategories[category].map((subcategory) => (
            <Subcategory key={subcategory} subcategory={subcategory} />
          ))
        : null}
    </div>
  )
}
