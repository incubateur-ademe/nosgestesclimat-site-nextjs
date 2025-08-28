import MainSubcategories from '@/components/fin/MainSubcategories'
import { useIframe } from '@/hooks/useIframe'
import { useRule } from '@/publicodes-state'
import AgirMainBlock from './JagisMainBlock'
import OtherWays from './carbone/OtherWays'
import Subcategories from './carbone/Subcategories'

export default function Carbone() {
  const { numericValue: total } = useRule('bilan')

  const { isFrenchRegion } = useIframe()

  const isSmallFootprint = total < 4000

  return (
    <div className="flex flex-1 flex-col gap-16">
      <MainSubcategories isLink={!isSmallFootprint} />

      {isFrenchRegion && <AgirMainBlock />}

      {isSmallFootprint ? <OtherWays isSmallFootprint /> : <Subcategories />}
    </div>
  )
}
