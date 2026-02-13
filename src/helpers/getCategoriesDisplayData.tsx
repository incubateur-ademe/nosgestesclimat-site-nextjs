import CarIcon from '@/components/icons/CarIcon'
import FoodIcon from '@/components/icons/FoodIcon'
import HousingIcon from '@/components/icons/HousingIcon'
import MiscIcon from '@/components/icons/MiscIcon'
import PublicServicesIcon from '@/components/icons/PublicServicesIcon'
import { carboneMetric } from '@/constants/model/metric'
import { orderedCategories } from '@/constants/model/orderedCategories'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import type { Locale } from '@/i18nConfig'
import type { ComputedResults, Metric } from '@/publicodes-state/types'
import type {
  DottedName,
  NGCRule,
  NGCRules,
} from '@incubateur-ademe/nosgestesclimat'
import type { ReactNode } from 'react'

export interface SubcategoryDisplayData {
  dottedName: DottedName
  title: string
  formattedValue: string
  unit: string | null
  percentage: number
  displayPercentage: string
}

export interface CategoryDisplayData extends SubcategoryDisplayData {
  icon: ReactNode
  bgBarClassName: string
  bgLightClassName: string
  bgIconClassName: string
  subcategories: SubcategoryDisplayData[]
}

const CATEGORIES_MAPPER: Record<
  string,
  {
    icon: React.ReactNode
    bgBarClassName: string
    bgLightClassName: string
    bgIconClassName: string
  }
> = {
  logement: {
    icon: <HousingIcon />,
    bgBarClassName: 'bg-green-800',
    bgLightClassName: 'bg-green-50',
    bgIconClassName: 'bg-green-100',
  },
  alimentation: {
    icon: <FoodIcon />,
    bgBarClassName: 'bg-orange-800',
    bgLightClassName: 'bg-orange-50',
    bgIconClassName: 'bg-orange-100',
  },
  transport: {
    icon: <CarIcon />,
    bgBarClassName: 'bg-blue-800',
    bgLightClassName: 'bg-blue-50',
    bgIconClassName: 'bg-blue-100',
  },
  'services sociétaux': {
    icon: <PublicServicesIcon />,
    bgBarClassName: 'bg-purple-800',
    bgLightClassName: 'bg-purple-50',
    bgIconClassName: 'bg-purple-100',
  },
  divers: {
    icon: <MiscIcon />,
    bgBarClassName: 'bg-yellow-800',
    bgLightClassName: 'bg-yellow-50',
    bgIconClassName: 'bg-yellow-100',
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

    const subcategories = getSubcategoriesDisplayData({
      categoryDottedName,
      categoryValue: numericValue,
      subcategoriesData,
      rules,
      metric,
      locale,
    })

    const meta = CATEGORIES_MAPPER[categoryDottedName] ?? {
      icon: <MiscIcon />,
      bgBarClassName: 'bg-gray-800',
      bgLightClassName: 'bg-gray-50',
      bgIconClassName: 'bg-gray-100',
    }

    return {
      dottedName: categoryDottedName,
      title: getRuleTitle({
        ...(rules?.[categoryDottedName] as NGCRule & {
          dottedName: DottedName
        }),
        dottedName: categoryDottedName,
      }),
      icon: meta.icon,
      bgBarClassName: meta.bgBarClassName,
      bgLightClassName: meta.bgLightClassName,
      bgIconClassName: meta.bgIconClassName,
      subcategories,
      ...getPercentages({
        numericValue,
        maxNumericValue,
        displayDenominator: totalBilan,
        metric,
        locale,
      }),
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
      return {
        dottedName: dottedName as DottedName,
        title: getRuleTitle({
          ...(rules?.[dottedName as DottedName] as NGCRule & {
            dottedName: DottedName
          }),
          dottedName: dottedName as DottedName,
        }),
        ...getPercentages({
          numericValue: value,
          maxNumericValue: categoryValue,
          displayDenominator: categoryValue,
          metric,
          locale,
        }),
      }
    })
}
