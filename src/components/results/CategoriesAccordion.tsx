import HorizontalBarChartItem from '@/components/charts/HorizontalBarChartItem'
import Trans from '@/components/translation/trans/TransClient'
import { carboneMetric } from '@/constants/model/metric'
import Card from '@/design-system/layout/Card'
import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
import { getCategoriesDisplayData } from '@/helpers/getCategoriesDisplayData'
import type { ComputedResults, Metric } from '@/publicodes-state/types'
import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import CarIcon from '../icons/CarIcon'
import FoodIcon from '../icons/FoodIcon'
import HousingIcon from '../icons/HousingIcon'
import MiscIcon from '../icons/MiscIcon'
import PublicServicesIcon from '../icons/PublicServicesIcon'
import SubcategoriesList from './categoriesAccordion/SubcategoriesList'
import AnimatedAccordionItem from './categoriesAccordion/_client/AnimatedAccordionItem'

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

export default function CategoriesAccordion({
  rules,
  computedResults,
  metric = carboneMetric,
}: Props) {
  const categories = getCategoriesDisplayData({
    computedResults,
    rules,
    metric,
    categoriesMapper: CATEGORIES_MAPPER,
  })

  return (
    <div className="flex flex-col">
      {categories.map((category, index) => (
        <AnimatedAccordionItem key={category.dottedName} index={index}>
          <AccordionItem
            title={
              <HorizontalBarChartItem
                percentageOfTotalValue={category.barPercentage}
                index={index}
                icon={category.icon}
                title={
                  <div className="flex items-center gap-2">
                    <strong>{category.title}</strong>
                    <span>
                      {category.formattedValue} <Trans>{category.unit}</Trans> -{' '}
                      {category.bilanPercentage}%
                    </span>
                  </div>
                }
                color={category.colorName}
              />
            }
            name={category.title ?? ''}
            ariaLabel={`${category.title ?? ''} - ${category.formattedValue} ${category.unit}`}
            content={
              <Card
                className={`mb-4 rounded-lg border border-slate-400 bg-${category.colorName}-50`}>
                {category.dottedName.startsWith('services') && (
                  <p>
                    <Trans i18nKey="results.categories.services.text">
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
                  colorName={category.colorName}
                />
              </Card>
            }
          />
        </AnimatedAccordionItem>
      ))}
    </div>
  )
}
