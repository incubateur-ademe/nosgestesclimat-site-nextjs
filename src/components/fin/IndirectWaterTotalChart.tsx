import IndirectWaterMainSubcategories from './indirectWaterTotalChart/IndirectWaterMainSubcategories'
import IndirectWaterTotalNumber from './indirectWaterTotalChart/IndirectWaterTotalNumber'

export default function IndirectWaterTotalChart() {
  return (
    <div className="relative">
      <IndirectWaterTotalNumber />
      <IndirectWaterMainSubcategories />
    </div>
  )
}
