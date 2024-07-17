import WaterTotalNumber from './waterTotalChart/WaterTotalNumber'
import WaveContent from './waterTotalChart/WaveContent'

export default function WaterTotalChart() {
  return (
    <div className="relative flex flex-1 flex-col justify-between">
      <WaterTotalNumber />
      <WaveContent />
    </div>
  )
}
