'use client'

import { ReactNode, useState } from 'react'

import budget from '../_data/budget.yaml'
import RessourcesAllocationTable from './RessourcesAllocationTable'

export type BudgetType = {
  [year: string]: {
    [product: string]: {
      description: ReactNode
    }
  }
}

export default function SelectYear() {
  const years = Object.keys(budget as unknown as BudgetType)
  const [selectedYear, setSelectedYear] = useState<string>(
    years[years.length - 1]
  )

  const products = Object.keys(
    (budget as unknown as BudgetType)[selectedYear]
  ).filter((elt) => elt !== 'description')
  const categories = [
    ...new Set(
      products
        .map((q) =>
          Object.keys(
            (budget as unknown as BudgetType)[selectedYear]?.[q] ?? {}
          )
        )
        .reduce((acc, curr) => [...acc, ...curr], [])
    ),
  ]

  return (
    <>
      <div className="mb-4 inline-flex items-center">
        <b>Année :</b>
        <select
          className="mb-0 ml-4 w-[10rem]"
          name="année"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value)
          }}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <p>
        {
          (budget[selectedYear as any] as unknown as { description: string })
            ?.description
        }
      </p>
      <RessourcesAllocationTable
        selectedYear={selectedYear}
        budget={
          budget as unknown as Record<
            string,
            Record<string, Record<string, number>>
          >
        }
        products={products}
        categories={categories}
      />
    </>
  )
}
