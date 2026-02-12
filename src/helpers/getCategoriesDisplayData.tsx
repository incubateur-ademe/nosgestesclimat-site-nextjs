import CarIcon from '@/components/icons/CarIcon'
import FoodIcon from '@/components/icons/FoodIcon'
import HousingIcon from '@/components/icons/HousingIcon'
import MiscIcon from '@/components/icons/MiscIcon'
import PublicServicesIcon from '@/components/icons/PublicServicesIcon'
import { carboneMetric } from '@/constants/model/metric'
import { orderedCategories } from '@/constants/model/orderedCategories'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { getRuleTitleFromRules } from '@/helpers/publicodes/getRuleTitle'
import type { Locale } from '@/i18nConfig'
import type { ComputedResults, Metric } from '@/publicodes-state/types'
import type { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import type { ReactNode } from 'react'

export interface SubcategoryDisplayData {
  dottedName: DottedName
  title: string
  formattedValue: string
  unit: string | null
  percentage: number
  displayPercentage: string
}

export interface CategoryDisplayData
  extends Omit<SubcategoryDisplayData, 'categoryPercentage'> {
  icon?: ReactNode
  colorName: string
  subcategories: SubcategoryDisplayData[]
}

const CATEGORIES_MAPPER: Record<
  string,
  { icon: React.ReactNode; colorName: string }
> = {
  logement: {
    icon: <HousingIcon />,
    colorName: 'green',
  },
  alimentation: {
    icon: <FoodIcon />,
    colorName: 'orange',
  },
  transport: {
    icon: <CarIcon />,
    colorName: 'blue',
  },
  'services sociétaux': {
    icon: <PublicServicesIcon />,
    colorName: 'purple',
  },
  divers: {
    icon: <MiscIcon />,
    colorName: 'yellow',
  },
}

function getPercentages({
  numericValue,
  maxNumericValue,
  displayDenominator,
  metric,
  locale,
}: {
  numericValue: number
  maxNumericValue: number
  displayDenominator: number
  metric: Metric
  locale: Locale
}) {
  const { formattedValue, unit } = formatFootprint(numericValue, {
    metric,
    shouldUseAbbreviation: true,
  })

  return {
    formattedValue,
    unit,
    percentage: (numericValue / maxNumericValue) * 100,
    displayPercentage: new Intl.NumberFormat(locale, {
      style: 'percent',
      roundingMode: 'floor',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(numericValue / displayDenominator),
  }
}

export function getCategoriesDisplayData({
  computedResults,
  rules,
  metric = carboneMetric,
  locale,
}: {
  computedResults: ComputedResults
  rules: Partial<NGCRules>
  metric?: Metric
  locale: Locale
}): CategoryDisplayData[] {
  const categoriesData = computedResults[metric]?.categories ?? {}
  const subcategoriesData = computedResults[metric]?.subcategories
  const totalBilan = computedResults[metric]?.bilan ?? 0

  // Filter to categories with positive values, keep fixed order
  const categories = orderedCategories.filter(
    (cat) => categoriesData[cat] !== undefined && categoriesData[cat] > 0
  )

  const maxNumericValue = Math.max(...Object.values(categoriesData))

  return categories.map((categoryDottedName) => {
    const numericValue = categoriesData[categoryDottedName]

    const { percentage, displayPercentage, formattedValue, unit } =
      getPercentages({
        numericValue,
        maxNumericValue,
        displayDenominator: totalBilan,
        metric,
        locale,
      })

    const subcategories = getSubcategoriesDisplayData({
      categoryDottedName,
      categoryValue: numericValue,
      subcategoriesData,
      rules,
      metric,
      locale,
    })

    const meta = CATEGORIES_MAPPER[categoryDottedName] ?? { colorName: 'gray' }

    return {
      dottedName: categoryDottedName,
      title: getRuleTitleFromRules(rules, categoryDottedName),
      icon: meta.icon,
      colorName: meta.colorName,
      formattedValue,
      unit,
      percentage: percentage * 0.75,
      displayPercentage,
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
  locale,
}: {
  categoryDottedName: DottedName
  categoryValue: number
  subcategoriesData?: Record<DottedName, number>
  rules: Partial<NGCRules>
  metric?: Metric
  locale: Locale
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
      const { percentage, displayPercentage, formattedValue, unit } =
        getPercentages({
          numericValue: value,
          maxNumericValue: categoryValue,
          displayDenominator: categoryValue,
          metric,
          locale,
        })

      return {
        dottedName: dottedName as DottedName,
        title: getRuleTitleFromRules(rules, dottedName as DottedName),
        formattedValue,
        unit,
        percentage,
        displayPercentage,
      }
    })
}
