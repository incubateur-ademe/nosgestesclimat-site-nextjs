'use client'

import MainSubcategories from '@/components/fin/MainSubcategories'
import { useIframe } from '@/hooks/useIframe'
import BlogArticles from './eau/BlogArticles'
import ClimateAndWater from './eau/ClimateAndWater'
import DomesticWater from './eau/DomesticWater'
import WaterActions from './eau/WaterActions'
import WaterDisclaimer from './eau/WaterDisclaimer'
import AgirMainBlock from './JagisMainBlock'
import AgirSecondaryBlock from './JagisSecondaryBlock'

export default function Eau() {
  const { isFrenchRegion } = useIframe()
  return (
    <div className="flex flex-1 flex-col gap-16">
      <WaterDisclaimer />
      <ClimateAndWater />
      <MainSubcategories isLink={false} />

      {isFrenchRegion && <AgirMainBlock />}

      <WaterActions />
      <DomesticWater />

      {isFrenchRegion && <AgirSecondaryBlock />}

      <BlogArticles />
    </div>
  )
}
