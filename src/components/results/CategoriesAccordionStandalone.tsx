import HorizontalBarChartItem from '@/components/charts/HorizontalBarChartItem'
import Trans from '@/components/translation/trans/TransClient'
import { carboneMetric } from '@/constants/model/metric'
import { orderedCategories } from '@/constants/model/orderedCategories'
import Card from '@/design-system/layout/Card'
import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
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

const ICONS_MAPPER: Record<string, React.ReactNode> = {
  logement: <HousingIcon />,
  alimentation: <FoodIcon />,
  transport: <CarIcon />,
  'services sociétaux': <PublicServicesIcon />,
  divers: <MiscIcon />,
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
        })

        // Bar percentage: relative to max category
        const percentageOfTotalValue = (numericValue / maxCategoryValue) * 100

        // Display percentage: relative to total footprint (bilan)
        const percentageOfBilan = Math.round((numericValue / totalBilan) * 100)

        return (
          <AnimatedAccordionItem key={categoryDottedName} index={index}>
            <AccordionItem
              title={
                <HorizontalBarChartItem
                  percentageOfTotalValue={percentageOfTotalValue}
                  index={index}
                  title={title}
                  icon={ICONS_MAPPER[categoryDottedName]}
                  barColor={getBackgroundColor(categoryDottedName)}
                  shouldDisplayValue={true}
                  displayValue={
                    <span className="font-normal text-gray-700">
                      {formattedValue} <Trans>{unit}</Trans> -{' '}
                      {percentageOfBilan}%
                    </span>
                  }
                />
              }
              name={title ?? ''}
              ariaLabel={`${title ?? ''} - ${formattedValue} ${unit}`}
              content={
                <Card
                  className="mb-4 border-x-0 bg-gray-100"
                  style={{
                    boxShadow: '0px 6px 6px -2px rgba(21, 3, 35, 0.05) inset',
                  }}>
                  <SubcategoriesListStandalone
                    category={categoryDottedName}
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
