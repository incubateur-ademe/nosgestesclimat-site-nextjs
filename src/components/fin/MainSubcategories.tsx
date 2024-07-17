import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useSortedUiCategoriesByFootprint } from '@/hooks/useSortedUiCategoriesByFootprint'
import { useEngine } from '@/publicodes-state'
import MainSubcategory from './mainSubcategories/MainSubcategory'

type Props = {
  isLink?: boolean
}

const titles = {
  carbone: <Trans>Mes principaux postes d’émissions</Trans>,
  eau: <Trans>Mes principaux postes d'usage</Trans>,
}
export default function MainSubcategories({ isLink }: Props) {
  const { currentMetric } = useCurrentMetric()

  const { getNumericValue } = useEngine({ metric: currentMetric })
  const { sortedUiCategories } = useSortedUiCategoriesByFootprint({
    metric: currentMetric,
  })

  const uiCategoriesValues = sortedUiCategories.map((subcategory) => {
    return { [subcategory]: getNumericValue(subcategory) }
  })
  console.log(uiCategoriesValues)
  const firstThreeSubcategories = sortedUiCategories.slice(0, 3)

  return (
    <div>
      <Title
        tag="h2"
        className="text-lg md:text-2xl"
        title={titles[currentMetric]}
      />
      <div className="flex flex-col items-start gap-4">
        {firstThreeSubcategories.map((subcategory, index) => (
          <MainSubcategory
            key={subcategory}
            subcategory={subcategory}
            index={index}
            isLink={isLink}
          />
        ))}
      </div>
    </div>
  )
}
