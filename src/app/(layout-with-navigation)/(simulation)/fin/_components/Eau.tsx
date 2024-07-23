import MainSubcategories from '@/components/fin/MainSubcategories'
import ClimateAndWater from './eau/ClimateAndWater'
import DomesticWater from './eau/DomesticWater'
import WaterActions from './eau/WaterActions'

export default function Eau() {
  return (
    <div className="flex flex-1 flex-col gap-16">
      <MainSubcategories isLink={false} />
      <WaterActions />
      <ClimateAndWater />
      <DomesticWater />
    </div>
  )
}
