import MainSubcategories from '@/components/fin/MainSubcategories'
import AgirMainBlock from './AgirMainBlock'
import AgirSecondaryBlock from './AgirSecondaryBlock'
import BlogArticles from './eau/BlogArticles'
import ClimateAndWater from './eau/ClimateAndWater'
import DomesticWater from './eau/DomesticWater'
import WaterActions from './eau/WaterActions'
import WaterDisclaimer from './eau/WaterDisclaimer'

export default function Eau() {
  return (
    <div className="flex flex-1 flex-col gap-16">
      <WaterDisclaimer />
      <ClimateAndWater />
      <MainSubcategories isLink={false} />
      <AgirMainBlock />
      <WaterActions />
      <DomesticWater />
      <AgirSecondaryBlock />
      <BlogArticles />
    </div>
  )
}
