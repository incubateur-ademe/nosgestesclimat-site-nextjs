import { useEngine } from '@/publicodes-state'
import RavijenChart from './RavijenChart'

export default function ServicesChart() {
  const { getSubcategories } = useEngine()

  const serviceCategories = getSubcategories('services sociétaux')

  const serviceSubcategories = serviceCategories.reduce(
    (acc: { [key: string]: string[] }, category: string) => {
      acc[category] = getSubcategories(category)
      return acc
    },
    {}
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
