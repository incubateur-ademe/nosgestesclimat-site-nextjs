import WaterTotalNumber from './waterTotalChart/WaterTotalNumber'
import WaveContent from './waterTotalChart/WaveContent'

export default function WaterTotalChart() {
  return (
    <div className="relative mt-2 flex w-full flex-1 flex-col justify-between lg:mt-8">
      <WaterTotalNumber />
      <WaveContent />
    </div>
  )
}
