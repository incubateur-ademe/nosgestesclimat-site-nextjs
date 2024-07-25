import MainSubcategories from '@/components/fin/MainSubcategories'
import BlogArticles from './eau/BlogArticles'
import ClimateAndWater from './eau/ClimateAndWater'
import DomesticWater from './eau/DomesticWater'
import WaterActions from './eau/WaterActions'

export default function Eau() {
  return (
    <div className="flex flex-1 flex-col gap-16">
      <ClimateAndWater />
      <MainSubcategories isLink={false} />
      <WaterActions />
      <DomesticWater />
      <BlogArticles />
    </div>
  )
}
