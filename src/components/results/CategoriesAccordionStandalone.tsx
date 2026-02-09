import HorizontalBarChartItem from '@/components/charts/HorizontalBarChartItem'
import Trans from '@/components/translation/trans/TransClient'
import { carboneMetric } from '@/constants/model/metric'
import { orderedCategories } from '@/constants/model/orderedCategories'
import Card from '@/design-system/layout/Card'
import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import type { ComputedResults, Metric } from '@/publicodes-state/types'
import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { utils } from 'publicodes'
import CarIcon from '../icons/CarIcon'
import FoodIcon from '../icons/FoodIcon'
import HousingIcon from '../icons/HousingIcon'
import MiscIcon from '../icons/MiscIcon'
import PublicServicesIcon from '../icons/PublicServicesIcon'
import SubcategoriesListStandalone from './categoriesAccordionStandalone/SubcategoriesListStandalone'
import AnimatedAccordionItem from './categoriesAccordionStandalone/_client/AnimatedAccordionItem'

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

interface Props {
  rules: Partial<NGCRules>
  computedResults: ComputedResults
  metric?: Metric
}

/**
 * Standalone version of CategoriesAccordion that doesn't use publicodes-state hooks.
 * All data comes from props (computedResults and rules).
 * Categories are displayed in fixed order, subcategories are sorted by footprint.
 */
export default function CategoriesAccordionStandalone({
  rules,
  computedResults,
  metric = carboneMetric,
}: Props) {
  const categoriesData = computedResults[metric]?.categories ?? {}

  // Use fixed category order, filter to only include categories with values
  const categories = orderedCategories.filter(
    (cat) => categoriesData[cat] !== undefined && categoriesData[cat] > 0
  )

  // Get max value for percentage calculation
  const maxCategoryValue = Math.max(...Object.values(categoriesData))

  // Get total footprint (bilan) for percentage calculation
  const totalBilan = computedResults[metric]?.bilan ?? 0

  return (
    <div className="flex flex-col">
      {categories.map((categoryDottedName, index) => {
        const rule = rules[categoryDottedName]
        const title =
          (rule?.titre as string) ?? utils.nameLeaf(categoryDottedName)

        const numericValue = categoriesData[categoryDottedName] ?? 0

        const { formattedValue, unit } = formatFootprint(numericValue, {
          metric,
          shouldUseAbbreviation: true,
        })

        // Bar percentage: relative to max category
        const percentageOfTotalValue = (numericValue / maxCategoryValue) * 75

        // Display percentage: relative to total footprint (bilan)
        const percentageOfBilan = Math.round((numericValue / totalBilan) * 100)

        return (
          <AnimatedAccordionItem key={categoryDottedName} index={index}>
            <AccordionItem
              title={
                <HorizontalBarChartItem
                  percentageOfTotalValue={percentageOfTotalValue}
                  index={index}
                  icon={CATEGORIES_MAPPER[categoryDottedName].icon}
                  title={
                    <div className="flex items-center gap-2">
                      <strong>{title}</strong>
                      <span>
                        {formattedValue} <Trans>{unit}</Trans> -{' '}
                        {percentageOfBilan}%
                      </span>
                    </div>
                  }
                  color={CATEGORIES_MAPPER[categoryDottedName].colorName}
                />
              }
              name={title ?? ''}
              ariaLabel={`${title ?? ''} - ${formattedValue} ${unit}`}
              content={
                <Card
                  className={`mb-4 rounded-lg border border-slate-400 bg-${CATEGORIES_MAPPER[categoryDottedName].colorName}-50`}>
                  <SubcategoriesListStandalone
                    category={categoryDottedName}
                    colorName={CATEGORIES_MAPPER[categoryDottedName].colorName}
                    rules={rules}
                    subcategoriesData={computedResults[metric]?.subcategories}
                    categoryValue={numericValue}
                    metric={metric}
                  />
                </Card>
              }
            />
          </AnimatedAccordionItem>
        )
      })}
    </div>
  )
}
