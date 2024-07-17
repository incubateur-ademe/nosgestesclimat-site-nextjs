import WaterTotalNumber from './waterTotalChart/WaterTotalNumber'
import WaveContent from './waterTotalChart/WaveContent'

export default function WaterTotalChart() {
  return (
    <div className="relative mt-2 flex flex-1 flex-col justify-between lg:mt-0">
      <WaterTotalNumber />
      <WaveContent />
    </div>
  )
}
