import { useSortedUiCategoriesByFootprint } from '@/hooks/useSortedUiCategoriesByFootprint'
import { useEngine, useRule } from '@/publicodes-state'
import Image from 'next/image'
import OtherSubcategories from './indirectWaterMainSubcategories/OtherSubcategories'
import Subcategory from './indirectWaterMainSubcategories/Subcategory'
import SubcategoryTitle from './indirectWaterMainSubcategories/SubcategoryTitle'

export default function IndirectWaterMainSubcategories() {
  const { numericValue: total } = useRule('bilan', 'eau')

  const { getNumericValue } = useEngine({ metric: 'eau' })

  const { sortedUiCategories } = useSortedUiCategoriesByFootprint({
    metric: 'eau',
  })

  const filteredSubcategories = sortedUiCategories.filter((subcategory) => {
    const numericValue = getNumericValue(subcategory)
    const percentage = (numericValue / total) * 100
    return percentage >= 8
  })

  const totalOfFilteredSubcategories = filteredSubcategories.reduce(
    (acc, subcategory) => acc + getNumericValue(subcategory),
    0
  )

  return (
    <div className="relative mt-16">
      <div className="relative h-80 w-48 lg:h-[500px] lg:w-[300px]">
        <div className="drop-content h-full w-full  bg-gray-100">
          {filteredSubcategories.map((subcategory, index) => (
            <Subcategory
              key={subcategory}
              index={index}
              subcategory={subcategory}
              total={total}
              totalOfFilteredSubcategories={totalOfFilteredSubcategories}
            />
          ))}
          <OtherSubcategories
            total={total}
            totalOfFilteredSubcategories={totalOfFilteredSubcategories}
          />
        </div>
        <Image
          src="/images/misc/droplet-border.svg"
          alt=""
          layout="fill"
          objectFit="contain"
          className="pointer-events-none"
        />
      </div>
      <div className="absolute right-4 top-0 h-full w-2/3">
        {filteredSubcategories.map((subcategory, index) => (
          <SubcategoryTitle
            key={subcategory}
            index={index}
            subcategory={subcategory}
            total={total}
            totalOfFilteredSubcategories={totalOfFilteredSubcategories}
          />
        ))}
      </div>
    </div>
  )
}
