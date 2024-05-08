import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Title from '@/design-system/layout/Title'
import { useSortedSubcategoriesByFootprint } from '@/hooks/useSortedSubcategoriesByFootprint'
import MainSubcategory from './mainSubcategories/MainSubcategory'

export default function MainSubcategories() {
  const { sortedSubcategories } = useSortedSubcategoriesByFootprint()

  const firstThreeSubcategories = sortedSubcategories.slice(0, 3)

  return (
    <div>
      <Title
        tag="h2"
        className="text-lg md:text-2xl"
        title={<Trans>Mes principaux postes d’émissions</Trans>}
      />
      <div className="flex flex-col items-start gap-4">
        {firstThreeSubcategories.map((subcategory, index) => (
          <MainSubcategory
            key={subcategory}
            subcategory={subcategory}
            index={index}
          />
        ))}
        <Button
          onClick={() => console.log('show all subcategories')}
          size="xs"
          color="link">
          <Trans>Voir toutes les catégories</Trans>
        </Button>
      </div>
    </div>
  )
}
