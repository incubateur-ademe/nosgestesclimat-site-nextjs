import { carboneMetric } from '@/constants/model/metric'
import { orderedCategories } from '@/constants/model/orderedCategories'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import type { ComputedResults, Metric } from '@/publicodes-state/types'
import type { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { utils } from 'publicodes'
import type { ReactNode } from 'react'

export interface SubcategoryDisplayData {
  dottedName: DottedName
  title: string
  formattedValue: string
  unit: string | null
  barPercentage: number
  categoryPercentage: number
}

export interface CategoryDisplayData {
  dottedName: DottedName
  title: string
  icon?: ReactNode
  colorName: string
  formattedValue: string
  unit: string | null
  barPercentage: number
  bilanPercentage: number
  subcategories: SubcategoryDisplayData[]
}

interface CategoryMeta {
  icon?: ReactNode
  colorName: string
}

/**
 * Pure helper function that transforms raw computed results and rules
 * into display-ready data for the CategoriesAccordion component.
 * Compatible with server components (no hooks).
 */
export function getCategoriesDisplayData({
  computedResults,
  rules,
  metric = carboneMetric,
  categoriesMapper,
}: {
  computedResults: ComputedResults
  rules: Partial<NGCRules>
  metric?: Metric
  categoriesMapper: Record<string, CategoryMeta>
}): CategoryDisplayData[] {
  const categoriesData = computedResults[metric]?.categories ?? {}
  const subcategoriesData = computedResults[metric]?.subcategories
  const totalBilan = computedResults[metric]?.bilan ?? 0

  // Filter to categories with positive values, keep fixed order
  const categories = orderedCategories.filter(
    (cat) => categoriesData[cat] !== undefined && categoriesData[cat] > 0
  )

  const maxCategoryValue = Math.max(...Object.values(categoriesData))

  return categories.map((categoryDottedName) => {
    const rule = rules[categoryDottedName]
    const title = (rule?.titre as string) ?? utils.nameLeaf(categoryDottedName)

    const numericValue = categoriesData[categoryDottedName] ?? 0

    const { formattedValue, unit } = formatFootprint(numericValue, {
      metric,
      shouldUseAbbreviation: true,
    })

    const barPercentage = (numericValue / maxCategoryValue) * 75
    const bilanPercentage = Math.round((numericValue / totalBilan) * 100)

    // Build subcategories display data
    const subcategories = getSubcategoriesDisplayData({
      categoryDottedName,
      categoryValue: numericValue,
      subcategoriesData,
      rules,
      metric,
    })

    const meta = categoriesMapper[categoryDottedName] ?? { colorName: 'gray' }

    return {
      dottedName: categoryDottedName,
      title,
      icon: meta.icon,
      colorName: meta.colorName,
      formattedValue,
      unit,
      barPercentage,
      bilanPercentage,
      subcategories,
    }
  })
}

function getSubcategoriesDisplayData({
  categoryDottedName,
  categoryValue,
  subcategoriesData,
  rules,
  metric = carboneMetric,
}: {
  categoryDottedName: DottedName
  categoryValue: number
  subcategoriesData?: Record<DottedName, number>
  rules: Partial<NGCRules>
  metric?: Metric
}): SubcategoryDisplayData[] {
  if (!subcategoriesData) return []

  return Object.entries(subcategoriesData)
    .filter(([dottedName, value]) => {
      const belongsToCategory = dottedName.startsWith(categoryDottedName)
      const ruleExists = Boolean(rules[dottedName as DottedName])
      const hasValue = value > 0
      return belongsToCategory && ruleExists && hasValue
    })
    .sort(([, a], [, b]) => b - a)
    .map(([dottedName, value]) => {
      const rule = rules[dottedName as DottedName]
      const title = (rule?.titre as string) ?? utils.nameLeaf(dottedName)

      const { formattedValue, unit } = formatFootprint(value, { metric })

      const barPercentage = (value / categoryValue) * 100
      const categoryPercentage = Math.round((value / categoryValue) * 100)

      return {
        dottedName: dottedName as DottedName,
        title,
        formattedValue,
        unit,
        barPercentage,
        categoryPercentage,
      }
    })
    .filter(({ formattedValue }) => formattedValue !== '0')
}
