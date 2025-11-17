'use client'

import MainSubcategories from '@/components/fin/MainSubcategories'
import { useIframe } from '@/hooks/useIframe'
import BlogArticles from './eau/BlogArticles'
import ClimateAndWater from './eau/ClimateAndWater'
import DomesticWater from './eau/DomesticWater'
import WaterActions from './eau/WaterActions'
import WaterDisclaimer from './eau/WaterDisclaimer'
import JagisMainBlock from './JagisMainBlock'

export default function Eau() {
  const { isFrenchRegion } = useIframe()
  return (
    <div className="flex flex-1 flex-col gap-16 bg-white">
      <WaterDisclaimer />

      <ClimateAndWater />

      <MainSubcategories isLink={false} />

      {isFrenchRegion && <JagisMainBlock />}

      <WaterActions />

      <DomesticWater />

      <BlogArticles />
    </div>
  )
}
