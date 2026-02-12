import HorizontalBarChartItem from '@/components/charts/HorizontalBarChartItem'
import Trans from '@/components/translation/trans/TransServer'
import { carboneMetric } from '@/constants/model/metric'
import Card from '@/design-system/layout/Card'
import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
import { getCategoriesDisplayData } from '@/helpers/getCategoriesDisplayData'
import type { Locale } from '@/i18nConfig'
import type { ComputedResults, Metric } from '@/publicodes-state/types'
import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import SubcategoriesList from './categoriesAccordion/SubcategoriesList'
import AnimatedAccordionItem from './categoriesAccordion/_client/AnimatedAccordionItem'

interface Props {
  rules: Partial<NGCRules>
  computedResults: ComputedResults
  metric?: Metric
  locale: Locale
}

export default function CategoriesAccordion({
  rules,
  computedResults,
  metric = carboneMetric,
  locale,
}: Props) {
  const categories = getCategoriesDisplayData({
    computedResults,
    rules,
    metric,
    locale,
  })

  return (
    <div className="flex flex-col">
      {categories.map((category, index) => (
        <AnimatedAccordionItem key={category.dottedName} index={index}>
          <AccordionItem
            title={
              <HorizontalBarChartItem
                percentageOfTotalValue={category.percentage}
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
                bgBarClassName={category.bgBarClassName as string}
                bgIconClassName={category.bgIconClassName as string}
              />
            }
            name={category.title ?? ''}
            ariaLabel={`${category.title ?? ''} - ${category.formattedValue} ${category.unit}`}
            content={
              <Card
                className={`mb-4 rounded-lg border border-slate-400 ${category.bgLightClassName}`}>
                {category.dottedName.startsWith('services') && (
                  <p>
                    <Trans
                      locale={locale}
                      i18nKey="results.categories.services.text">
                      Les services (santé, éducation, télécoms…) représentent
                      environ <strong>1,5 t de votre empreinte</strong>. Cette
                      part est <strong>la même pour tous</strong> et{' '}
                      <strong>diminue progressivement</strong> avec la
                      transition écologique.
                    </Trans>
                  </p>
                )}
                <SubcategoriesList
                  subcategories={category.subcategories}
                  bgBarClassName={category.bgBarClassName}
                />
              </Card>
            }
          />
        </AnimatedAccordionItem>
      ))}
    </div>
  )
}
