import HorizontalBarChartItem from '@/components/charts/HorizontalBarChartItem'
import { carboneMetric } from '@/constants/model/metric'
import Card from '@/design-system/layout/Card'
import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
import { getCategoriesDisplayData } from '@/helpers/getCategoriesDisplayData'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { Locale } from '@/i18nConfig'
import type { ComputedResults, Metric } from '@/publicodes-state/types'
import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import SubcategoriesList from './categoriesAccordion/SubcategoriesList'
import AnimatedAccordionItem from './categoriesAccordion/_client/AnimatedAccordionItem'
import ServicesDescription from './categoriesAccordion/_client/ServicesDescription'

interface Props {
  rules: Partial<NGCRules>
  computedResults: ComputedResults
  metric?: Metric
  locale: Locale
}

// Makes the bars in the chart just the right width
const BEAUTIFUL_COEFFICIENT = 0.75

export default async function CategoriesAccordion({
  rules,
  computedResults,
  metric = carboneMetric,
  locale,
}: Props) {
  const { t } = await getServerTranslation({ locale })

  const categories = getCategoriesDisplayData({
    computedResults,
    rules,
    metric,
    locale,
  })

  return (
    <div className="flex flex-col gap-2">
      {categories.map((category, index) => (
        <AnimatedAccordionItem key={category.dottedName} index={index}>
          <AccordionItem
            title={
              <HorizontalBarChartItem
                percentageOfTotalValue={
                  category.percentage * BEAUTIFUL_COEFFICIENT
                }
                index={index}
                icon={category.icon}
                title={
                  <div className="flex items-center gap-2">
                    <strong>{category.title}</strong>
                    <span>
                      {category.formattedValue} {category.unit} -{' '}
                      {category.displayPercentage}
                    </span>
                  </div>
                }
                bgBarClassName={category.bgBarClassName}
                bgIconClassName={category.bgIconClassName}
              />
            }
            name={category.title}
            ariaLabel={`${category.title} - ${category.formattedValue} ${category.unit}`}
            content={
              <Card
                className={`rounded-lg border border-slate-400 ${category.bgLightClassName}`}>
                {category.dottedName.startsWith('services') && (
                  <ServicesDescription />
                )}
                <SubcategoriesList
                  subcategories={category.subcategories}
                  bgBarClassName={category.bgBarClassName}
                  t={t}
                />
              </Card>
            }
          />
        </AnimatedAccordionItem>
      ))}
    </div>
  )
}
