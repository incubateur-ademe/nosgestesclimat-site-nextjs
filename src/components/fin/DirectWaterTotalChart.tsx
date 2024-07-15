import DirectWaterTotalNumber from './directWaterTotalChart/DirectWaterTotalNumber'
import WaveContent from './directWaterTotalChart/WaveContent'

export default function DirectWaterTotalChart() {
  return (
    <div className="relative flex flex-1 flex-col">
      <DirectWaterTotalNumber />
      <WaveContent />
    </div>
  )
}
