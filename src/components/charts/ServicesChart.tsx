import { useEngine } from '@/publicodes-state'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import RavijenChart from './RavijenChart'

export default function ServicesChart() {
  const { getSubcategories } = useEngine()

  const serviceCategories = getSubcategories('services sociétaux')

  const serviceSubcategories = serviceCategories?.reduce(
    (acc: DottedName[], category: DottedName) => {
      acc.push(...(getSubcategories(category) ?? []))
      return acc
    },
    [] as DottedName[]
  )

  return (
    <RavijenChart
      categories={serviceCategories ?? []}
      subcategories={serviceSubcategories}
      squashLimitPercentage={1.4}
      isInverted={true}
      shouldAlwaysDisplayValue={true}
    />
  )
}
