import MainSubcategories from '@/components/fin/MainSubcategories'
import { useRule } from '@/publicodes-state'
import OtherWays from './carbone/OtherWays'
import Subcategories from './carbone/Subcategories'

export default function Carbone() {
  const { numericValue: total } = useRule('bilan')

  const isSmallFootprint = total < 4000

  return (
    <div className="flex flex-1 flex-col gap-16">
      <MainSubcategories isLink={!isSmallFootprint} />

      {isSmallFootprint ? <OtherWays isSmallFootprint /> : <Subcategories />}
    </div>
  )
}
