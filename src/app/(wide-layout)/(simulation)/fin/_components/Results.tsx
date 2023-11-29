'use client'

import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import { useEngine, useSimulation } from '@/publicodes-state'
import { useMemo } from 'react'
import CategoriesAccordion from './results/CategoriesAccordion'
import CategoriesChart from './results/CategoriesChart'
import TotalCard from './results/TotalCard'

export default function Results() {
  const { categories } = useSimulation()
  const { getNumericValue } = useEngine()

  const sortedCategories = useMemo(() => {
    return categories.sort((categoryA, categoryB) => {
      const valueA = getNumericValue(categoryA) ?? 0
      const valueB = getNumericValue(categoryB) ?? 0

      return valueB - valueA
    })
  }, [categories, getNumericValue])

  return (
    <>
      <h2 className="text-lg">
        <Trans>Votre bilan</Trans>
      </h2>

      <div className="flex flex-col items-stretch justify-center md:flex-row md:gap-4">
        <TotalCard />

        <CategoriesChart sortedCategories={sortedCategories} />
      </div>

      <CategoriesAccordion sortedCategories={sortedCategories} />

      <Separator className="mb-6 mt-8" />
    </>
  )
}
