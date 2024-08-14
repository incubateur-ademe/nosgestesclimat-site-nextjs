import { useEngine } from '@/publicodes-state'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import RavijenChart from './RavijenChart'

export default function ServicesChart() {
  const { getSubcategories } = useEngine()

  const serviceCategories = getSubcategories('services sociétaux')

  const serviceSubcategories = serviceCategories.reduce(
    (acc, category) => {
      acc[category] = getSubcategories(category)
      return acc
    },
    {} as Record<DottedName, DottedName[]>
  )

  return (
    <RavijenChart
      categories={serviceCategories}
      subcategories={serviceSubcategories}
      squashLimitPercentage={1.4}
      isInverted={true}
      shouldAlwaysDisplayValue={true}
    />
  )
}
